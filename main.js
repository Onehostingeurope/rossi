/* =============================================
   ROSSI CROISETTE IMMOBILIER — MAIN JS
   ============================================= */

'use strict';

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ---- Navbar Scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- Mobile Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- YouTube Background Video ---- */
let ytPlayer;

// Called automatically by the YouTube IFrame API once it is loaded
window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    videoId: 'e0QDFQnvzBI',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: 'e0QDFQnvzBI', // required for seamless loop
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      cc_load_policy: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
    events: {
      onReady: function (e) {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: function (e) {
        // Fade out the fallback image as soon as video is playing
        if (e.data === YT.PlayerState.PLAYING) {
          const fallback = document.getElementById('hero-fallback');
          if (fallback) fallback.classList.add('video-ready');
        }
        // Safety net: restart if video somehow ends
        if (e.data === YT.PlayerState.ENDED) {
          e.target.seekTo(0);
          e.target.playVideo();
        }
      },
    },
  });
};

/* ---- Scroll Reveal ---- */
const revealElements = document.querySelectorAll(
  '.service-card, .prop-featured, .prop-card, .neighborhood-item, .section-header, .about-image-wrap, .about-content, .contact-content, .contact-form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ---- Stats Counter Animation ---- */
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  statNums.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const heroStats = document.getElementById('hero-stats');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    setTimeout(animateStats, 600);
  }
}, { threshold: 0.3 });
if (heroStats) statsObserver.observe(heroStats);

/* ---- Contact Form ---- */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';
    btn.querySelector('span').textContent = 'Envoi en cours...';

    setTimeout(() => {
      form.querySelectorAll('input, select, textarea').forEach(field => field.value = '');
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.querySelector('span').textContent = 'Envoyer le message';
      formSuccess.style.display = 'block';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1500);
  });
}

/* ---- Smooth Anchor Override ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Marquee Hover Pause ---- */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}
/* ============================================================
   SUPABASE SITE SETTINGS
   ============================================================ */

let siteSettings = {};

async function loadSiteSettings() {
  try {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) throw error;
    
    data.forEach(item => {
      siteSettings[item.key] = item.value;
    });

    // Apply text settings
    const updates = {
      'hero-title-1': siteSettings.hero_title_1,
      'hero-title-2': siteSettings.hero_title_2,
      'hero-title-3': siteSettings.hero_title_3,
      'hero-subtitle': siteSettings.hero_subtitle,
      'stat-1-label': siteSettings.stat_1_label,
      'stat-2-label': siteSettings.stat_2_label,
      'stat-3-label': siteSettings.stat_3_label,
    };

    for (const [id, val] of Object.entries(updates)) {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    }

    // Apply stats values (updating data-target for the animation)
    const stats = [
      { id: 'stat-1-val', key: 'stat_1_val' },
      { id: 'stat-2-val', key: 'stat_2_val' },
      { id: 'stat-3-val', key: 'stat_3_val' },
    ];

    stats.forEach(s => {
      const el = document.getElementById(s.id);
      if (el && siteSettings[s.key]) {
        el.setAttribute('data-target', siteSettings[s.key]);
      }
    });

    // Initialize YouTube after settings are loaded (or if they fail)
    initYouTube(siteSettings.hero_video_id || 'e0QDFQnvzBI');

  } catch (err) {
    console.error('Error loading site settings:', err.message);
    initYouTube('e0QDFQnvzBI'); // Fallback
  }
}

/* ---- YouTube Background Video ---- */
let ytPlayer;

function initYouTube(videoId) {
  // If API already loaded, just create player
  if (window.YT && window.YT.Player) {
    createPlayer(videoId);
  } else {
    // API will call onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
  }
}

function createPlayer(videoId) {
  ytPlayer = new YT.Player('yt-player', {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      cc_load_policy: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
    events: {
      onReady: (e) => {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          const fallback = document.getElementById('hero-fallback');
          if (fallback) fallback.classList.add('video-ready');
        }
        if (e.data === YT.PlayerState.ENDED) {
          e.target.seekTo(0);
          e.target.playVideo();
        }
      },
    },
  });
}

// Re-map the existing onYouTubeIframeAPIReady to something that doesn't conflict
// if the tag script loads faster than loadSiteSettings
window.onYouTubeIframeAPIReady = () => {
  if (siteSettings.hero_video_id) {
    createPlayer(siteSettings.hero_video_id);
  }
};

/* ============================================================
   SUPABASE FEATURED PROPERTIES
   ============================================================ */

async function fetchFeaturedProperties() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false })
      .limit(3);

    if (error) throw error;
    if (!data || data.length === 0) return;

    // Featured Big Card
    const main = data[0];
    const featuredEl = document.getElementById('prop-featured');
    if (featuredEl && main) {
      featuredEl.querySelector('.prop-type').textContent = `${main.type} — ${main.quartier}`;
      featuredEl.querySelector('.prop-name').textContent = main.title;
      featuredEl.querySelector('.prop-detail').textContent = `${main.rooms} pièces · ${main.surface} m² · ${main.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-featured-btn');
      if (btn) btn.href = main.url;
    }

    // Side Cards
    const side1 = data[1];
    const villaEl = document.getElementById('prop-villa');
    if (villaEl && side1) {
      villaEl.querySelector('.prop-card-type').textContent = `${side1.type} — ${side1.quartier}`;
      villaEl.querySelector('.prop-card-name').textContent = side1.title;
      villaEl.querySelector('.prop-card-detail').textContent = `${side1.surface} m² · ${side1.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-villa-btn');
      if (btn) btn.href = side1.url;
    }

    const side2 = data[2];
    const apptEl = document.getElementById('prop-appt');
    if (apptEl && side2) {
      apptEl.querySelector('.prop-card-type').textContent = `${side2.type} — ${side2.quartier}`;
      apptEl.querySelector('.prop-card-name').textContent = side2.title;
      apptEl.querySelector('.prop-card-detail').textContent = `${side2.surface} m² · ${side2.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-appt-btn');
      if (btn) btn.href = side2.url;
    }

  } catch (err) {
    console.error('Error fetching featured properties:', err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  fetchFeaturedProperties();
});

/* ---- Service cards stagger ---- */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
