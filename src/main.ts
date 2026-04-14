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

    initYouTube(siteSettings.hero_video_id || '4JvamYpPjSQ');

  } catch (err: any) {
    console.error('Error loading site settings:', err.message);
    initYouTube('4JvamYpPjSQ');
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

function initYouTube(videoId: string) {
  if (window.YT && window.YT.Player) {
    createPlayer(videoId);
  } else {
    window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
  }
}

function createPlayer(videoId: string) {
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
        e.target.playVideo();
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
      if (btn) btn.href = main.url;
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
      if (btn) btn.href = side1.url;
    }

    const side2 = data[2];
    const apptEl = document.getElementById('prop-appt');
    if (apptEl && side2) {
      const typeEl = apptEl.querySelector('.prop-card-type');
      const nameEl = apptEl.querySelector('.prop-card-name');
      const detailEl = apptEl.querySelector('.prop-card-detail');
      if (typeEl) typeEl.textContent = `${side2.type} — ${side2.quartier}`;
      if (nameEl) nameEl.textContent = side2.title;
      if (detailEl) detailEl.textContent = `${side2.surface} m² · ${side2.highlights?.[0] || 'Détails'}`;
      const btn = document.getElementById('prop-appt-btn') as HTMLAnchorElement;
      if (btn) btn.href = side2.url;
    }

  } catch (err: any) {
    console.error('Error fetching featured properties:', err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  fetchFeaturedProperties();
});

/* ---- Service cards stagger ---- */
document.querySelectorAll('.service-card').forEach((el, i) => {
  const card = el as HTMLElement;
  card.style.transitionDelay = `${i * 0.07}s`;
});
