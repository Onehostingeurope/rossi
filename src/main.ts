import { supabase } from './supabase'
import { SiteSetting, SiteSettingsMap, Property } from './types'

/* ============================================================
   SUPABASE SITE SETTINGS
   ============================================================ */

let siteSettings: SiteSettingsMap = {};

async function loadSiteSettings() {
  try {
    const { data, error } = await supabase.from('site_settings').select('*') as { data: SiteSetting[] | null, error: any };
    if (error) throw error;
    if (!data) return;
    
    data.forEach(item => {
      siteSettings[item.key] = item.value;
    });

    // Apply text settings
    const updates: Record<string, string | undefined> = {
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

    // Apply stats values
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

    // Handle About Image & Video dynamically
    const aboutImgNode = document.querySelector('.about-img') as HTMLImageElement;
    const aboutWrap = document.getElementById('about-image');
    
    if (aboutImgNode && siteSettings.about_img) {
      aboutImgNode.src = siteSettings.about_img;
    }

    if (aboutWrap && siteSettings.about_vid) {
      // Create a native video element
      const vid = document.createElement('video');
      vid.src = siteSettings.about_vid;
      vid.loop = true;
      vid.muted = false;
      vid.playsInline = true;
      // Styling it to sit perfectly on top of the image
      vid.className = 'about-img';
      vid.style.position = 'absolute';
      vid.style.top = '0';
      vid.style.left = '0';
      vid.style.opacity = '0'; // Hidden initially
      vid.style.transition = 'opacity 0.4s ease';
      vid.style.pointerEvents = 'none'; // let mouse events pass to the wrap
      vid.style.zIndex = '1';

      aboutWrap.appendChild(vid);

      // Setup Subtitles/Bubble from quote
      const bubble = document.getElementById('about-speech-bubble');
      const bubbleContent = bubble?.querySelector('.bubble-content');
      const quoteEl = document.querySelector('.about-quote');
      if (bubbleContent && quoteEl) {
        bubbleContent.textContent = quoteEl.textContent?.replace(/"/g, '') || "";
      }

      // Play on hover
      aboutWrap.addEventListener('mouseenter', () => {
        vid.style.opacity = '1';
        vid.play().catch(() => {});
        bubble?.classList.add('active');
        // Stop any accidental AI speech synthesis
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      });

      // Pause on leave
      aboutWrap.addEventListener('mouseleave', () => {
        vid.style.opacity = '0';
        vid.pause();
        bubble?.classList.remove('active');
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      });
    }

  } catch (err: any) {
    console.error('Error loading site settings:', err.message);
  }
}

/* ---- YouTube Background Video ---- */
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

let ytPlayer: any;

function initYouTube(videoId: string = '4JvamYpPjSQ') {
  if (window.YT && window.YT.Player) {
    createPlayer(videoId);
  } else {
    window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
  }
}

function createPlayer(videoId: string) {
  if (ytPlayer) return; // Prevent double initialization

  ytPlayer = new window.YT.Player('yt-player', {
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
      onReady: (e: any) => {
        e.target.mute();
        e.target.setPlaybackQuality('hd1080'); // Force HD
        e.target.playVideo();
        // Force fade out fallback immediately
        const fallback = document.getElementById('hero-fallback');
        if (fallback) fallback.classList.add('video-ready');
      },
      onStateChange: (e: any) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
          const fallback = document.getElementById('hero-fallback');
          if (fallback) fallback.classList.add('video-ready');
        }
        if (e.data === window.YT.PlayerState.ENDED) {
          e.target.seekTo(0);
          e.target.playVideo();
        }
      },
    },
  });
}


/* ============================================================
   SUPABASE FEATURED PROPERTIES
   ============================================================ */

async function fetchFeaturedProperties() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false })
      .limit(3) as { data: Property[] | null, error: any };

    if (error) throw error;
    if (!data || data.length === 0) return;

    // Featured Big Card
    const main = data[0];
    const featuredEl = document.getElementById('prop-featured');
    if (featuredEl && main) {
      const typeEl = featuredEl.querySelector('.prop-type');
      const nameEl = featuredEl.querySelector('.prop-name');
      const detailEl = featuredEl.querySelector('.prop-detail');
      if (typeEl) typeEl.textContent = `${main.type} — ${main.quartier}`;
      if (nameEl) nameEl.textContent = main.title;
      if (detailEl) detailEl.textContent = `${main.rooms} pièces · ${main.surface} m² · ${main.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-featured-btn') as HTMLAnchorElement;
      if (btn) btn.href = main.url || '#';
    }

    // Side Cards
    const side1 = data[1];
    const villaEl = document.getElementById('prop-villa');
    if (villaEl && side1) {
      const typeEl = villaEl.querySelector('.prop-card-type');
      const nameEl = villaEl.querySelector('.prop-card-name');
      const detailEl = villaEl.querySelector('.prop-card-detail');
      if (typeEl) typeEl.textContent = `${side1.type} — ${side1.quartier}`;
      if (nameEl) nameEl.textContent = side1.title;
      if (detailEl) detailEl.textContent = `${side1.surface} m² · ${side1.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-villa-btn') as HTMLAnchorElement;
      if (btn) btn.href = side1.url || '#';
    }

    const side2 = data[2];
    const side2El = document.getElementById('prop-appt');
    if (side2El && side2) {
      const typeEl = side2El.querySelector('.prop-card-type');
      const nameEl = side2El.querySelector('.prop-card-name');
      const detailEl = side2El.querySelector('.prop-card-detail');
      if (typeEl) typeEl.textContent = `${side2.type} — ${side2.quartier}`;
      if (nameEl) nameEl.textContent = side2.title;
      if (detailEl) detailEl.textContent = `${side2.surface} m² · ${side2.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-appt-btn') as HTMLAnchorElement;
      if (btn) btn.href = side2.url || '#';
    }

  } catch (err: any) {
    console.error('Error fetching featured properties:', err.message);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteSettings();
  initYouTube(siteSettings.hero_video_id || '4JvamYpPjSQ');
  fetchFeaturedProperties();

  // Re-instate Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});

/* ---- Service cards stagger ---- */
document.querySelectorAll('.service-card').forEach((el, i) => {
  const card = el as HTMLElement;
  card.style.transitionDelay = `${i * 0.07}s`;
});

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor) {
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    
    // Smooth follower using requestAnimationFrame for better performance
    if (cursorFollower) {
      cursorFollower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  });

  document.querySelectorAll('a, button, .service-card, .prop-card, .neighborhood-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower?.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorFollower?.classList.remove('active'));
  });
}
