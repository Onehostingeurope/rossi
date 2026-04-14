'use strict';

/* ============================================================
   ROSSI CROISETTE — ALL PROPERTIES DATA
   Fetched from Supabase (formerly scraped from agencerossicroisette.com/vente/)
   ============================================================ */

/* ============================================================
   SUPABASE DATA FETCHING
   ============================================================ */

let PROPERTIES = [];

async function fetchProperties() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    PROPERTIES = data || [];
    
    // Initial render
    if (typeof applyFiltersAndSort === 'function') {
      applyFiltersAndSort();
    } else {
      renderGrid(PROPERTIES);
    }
  } catch (err) {
    console.error('Error fetching properties from Supabase:', err.message);
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = 'Erreur lors du chargement des biens.';
  }
}

/* ============================================================
   RENDERING ENGINE
   ============================================================ */

function formatPrice(price) {
  if (price >= 1000000) {
    const m = price / 1000000;
    return m % 1 === 0 ? m + ' M €' : m.toFixed(2).replace('.', ',') + ' M €';
  }
  return price.toLocaleString('fr-FR') + ' €';
}

function formatSurface(s) {
  return s % 1 === 0 ? s + ' m²' : s.toFixed(2).replace('.', ',') + ' m²';
}

function getPricePerSqm(prop) {
  return Math.round(prop.price / prop.surface).toLocaleString('fr-FR') + ' €/m²';
}

function getTypeLabel(type) {
  const map = { Appartement: 'Appt.', Villa: 'Villa', Maison: 'Maison', 'Rez de jardin': 'Rez de jardin' };
  return map[type] || type;
}

function buildCard(prop, index) {
  const card = document.createElement('div');
  card.className = 'listing-card reveal';
  card.dataset.type = prop.type;
  card.dataset.price = prop.price;
  card.dataset.surface = prop.surface;
  card.dataset.id = prop.id;

  const delay = (index % 3) * 0.08;
  card.style.transitionDelay = delay + 's';

  const roomsLabel = prop.rooms === 1 ? '1 pièce' : `${prop.rooms} pièces`;
  const bedLabel = prop.bedrooms > 0 ? (prop.bedrooms === 1 ? '1 chambre' : `${prop.bedrooms} chambres`) : '';

  card.innerHTML = `
    <div class="card-img-wrap">
      <div class="card-img-placeholder ${prop.gradient}">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 40V20L24 8L40 20V40H30V28H18V40H8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
          <circle cx="38" cy="10" r="5" stroke="currentColor" stroke-width="1.2"/>
          <path d="M38 7V10L40 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="card-type-badge">${getTypeLabel(prop.type)}</div>
      ${prop.prestige ? '<div class="card-prestige-badge">Prestige</div>' : ''}
    </div>
    <div class="card-body">
      <p class="card-location">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="display:inline;vertical-align:middle;margin-right:4px;color:var(--gold)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        ${prop.quartier}, ${prop.city}
      </p>
      <h3 class="card-title">${prop.title}</h3>
      <div class="card-specs">
        <span class="card-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/></svg>
          ${roomsLabel}${bedLabel ? ' · ' + bedLabel : ''}
        </span>
        <span class="card-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4zM4 12h16M12 4v16"/></svg>
          ${formatSurface(prop.surface)}
        </span>
      </div>
      <div class="card-footer">
        <div>
          <span class="card-price">${formatPrice(prop.price)}</span>
          <span class="card-price-sub">${getPricePerSqm(prop)}</span>
        </div>
        <a href="${prop.url}" target="_blank" rel="noopener" class="card-cta" id="prop-cta-${prop.id}">
          Voir
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M8 3l5 5-5 5"/></svg>
        </a>
      </div>
    </div>
  `;
  return card;
}

/* ============================================================
   FILTER + SORT ENGINE
   ============================================================ */

let activeTypeFilter = 'all';
let activePriceFilter = 0;
let activeSort = 'recent';

function applyFiltersAndSort() {
  let list = [...PROPERTIES];

  // Filter by type
  if (activeTypeFilter !== 'all') {
    list = list.filter(p => p.type === activeTypeFilter);
  }

  // Filter by price
  if (activePriceFilter > 0) {
    list = list.filter(p => p.price <= activePriceFilter);
  }

  // Sort
  switch (activeSort) {
    case 'price-asc':   list.sort((a, b) => a.price - b.price); break;
    case 'price-desc':  list.sort((a, b) => b.price - a.price); break;
    case 'surface-desc':list.sort((a, b) => b.surface - a.surface); break;
    case 'recent':      list.sort((a, b) => b.id - a.id); break;
  }

  renderGrid(list);
}

function renderGrid(list) {
  const grid = document.getElementById('listings-grid');
  const noResults = document.getElementById('no-results');
  const countEl = document.getElementById('results-count');

  grid.innerHTML = '';

  if (list.length === 0) {
    noResults.style.display = 'block';
    countEl.textContent = 'Aucun bien trouvé';
    return;
  }

  noResults.style.display = 'none';
  countEl.innerHTML = `<span>${list.length}</span> bien${list.length > 1 ? 's' : ''} trouvé${list.length > 1 ? 's' : ''}`;

  list.forEach((prop, i) => {
    const card = buildCard(prop, i);
    grid.appendChild(card);
  });

  // Animate newly rendered cards
  requestAnimationFrame(() => {
    const cards = grid.querySelectorAll('.listing-card');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    cards.forEach(c => obs.observe(c));
  });
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Fetch initial data
  fetchProperties();

  // Type filter pills
  document.getElementById('filter-type').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    document.querySelectorAll('#filter-type .pill').forEach(p => p.classList.remove('pill-active'));
    btn.classList.add('pill-active');
    activeTypeFilter = btn.dataset.value;
    applyFiltersAndSort();
  });

  // Price filter pills
  document.getElementById('filter-price').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    document.querySelectorAll('#filter-price .pill').forEach(p => p.classList.remove('pill-active'));
    btn.classList.add('pill-active');
    activePriceFilter = parseInt(btn.dataset.value, 10);
    applyFiltersAndSort();
  });

  // Sort select
  document.getElementById('sort-select').addEventListener('change', e => {
    activeSort = e.target.value;
    applyFiltersAndSort();
  });
});
