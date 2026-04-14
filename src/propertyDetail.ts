import { supabase } from './supabase'
import { Property } from './types'

async function initPropertyPage() {
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get('id');
  if (!idStr) {
    window.location.href = 'properties.html';
    return;
  }

  const id = parseInt(idStr, 10);
  const loading = document.getElementById('loading');
  const main = document.getElementById('property-main');

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single() as { data: Property | null, error: any };

    if (error || !data) throw error || new Error('Property not found');

    renderProperty(data);

    if (loading) loading.style.display = 'none';
    if (main) {
      main.style.display = 'block';
      setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('visible'));
      }, 100);
    }
  } catch (err) {
    console.error(err);
    if (loading) loading.innerHTML = `<p class="error" style="color:white;text-align:center;">Erreur: Impossible de charger ce bien.<br><br><a href="properties.html" style="color:var(--gold);">Retour</a></p>`;
  }
}

function renderProperty(prop: Property) {
  document.title = `${prop.title} | ROSSI Croisette`;

  // Gallery
  const gallery = document.getElementById('hero-gallery');
  const thumbnailsWrap = document.getElementById('prop-thumbnails');
  
  if (gallery && thumbnailsWrap) {
    let images = prop.images || [];
    if (images.length === 0 && prop.image_url) {
      images = [prop.image_url];
    } else if (images.length === 0) {
      images = ['']; // fallback
    }

    const mainImgNode = document.createElement('img');
    mainImgNode.className = 'prop-gallery-main-img';
    mainImgNode.src = images[0] || '';
    gallery.appendChild(mainImgNode);

    if (images.length > 1) {
      images.forEach((imgSrc, idx) => {
        if (!imgSrc) return;
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.className = `prop-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.addEventListener('click', () => {
          mainImgNode.style.opacity = '0';
          setTimeout(() => {
            mainImgNode.src = imgSrc;
            mainImgNode.style.opacity = '1';
          }, 300);
          document.querySelectorAll('.prop-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
        thumbnailsWrap.appendChild(thumb);
      });
    }
  }

  // Text details (both mobile and desktop nodes if they exist)
  const setContent = (id: string, content: string) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = content;
  };

  const loc = `${prop.city}${prop.quartier && prop.quartier !== prop.city ? ` · ${prop.quartier}` : ''}`;
  const price = `${prop.price.toLocaleString()} €`;

  setContent('prop-location', loc);
  setContent('prop-title', prop.title);
  setContent('prop-price', price);

  setContent('prop-location-mobile', loc);
  setContent('prop-title-mobile', prop.title);
  setContent('prop-price-mobile', price);

  setContent('spec-type', prop.type);
  setContent('spec-surface', `${prop.surface} m²`);
  setContent('spec-rooms', `${prop.rooms}`);
  setContent('spec-bedrooms', `${prop.bedrooms}`);

  setContent('prop-description', prop.description || 'Description non disponible.');
}

document.addEventListener('DOMContentLoaded', initPropertyPage);
