import { supabase } from './supabase'
import { Property } from './types'

let allProperties: Property[] = [];
let filteredProperties: Property[] = [];

// --- FETCH DATA ---
async function fetchProperties() {
  const loadingEl = document.getElementById('loading');
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false }) as { data: Property[] | null, error: any };

    if (error) throw error;
    allProperties = data || [];
    filteredProperties = [...allProperties];
    
    if (loadingEl) loadingEl.style.display = 'none';
    applyFiltersAndSort();
  } catch (err: any) {
    console.error('Error fetching properties:', err.message);
    if (loadingEl) loadingEl.innerHTML = `<p class="error">Erreur de chargement: ${err.message}</p>`;
  }
}

// --- RENDER ENGINE ---
const grid = document.getElementById('listings-grid');
const count = document.getElementById('results-count');
const noResults = document.getElementById('no-results');

function renderGrid(props: Property[]) {
  if (!grid) return;
  grid.innerHTML = '';
  
  if (props.length === 0) {
    if (noResults) noResults.style.display = 'block';
    if (count) count.textContent = '0 biens trouvés';
  } else {
    if (noResults) noResults.style.display = 'none';
    if (count) count.textContent = `${props.length} biens trouvés`;
  }

  props.forEach((prop, i) => {
    const card = buildCard(prop, i);
    grid.appendChild(card);
  });
}

function buildCard(prop: Property, index: number): HTMLElement {
  const card = document.createElement('div');
  card.className = 'prop-card scroll-reveal';
  card.style.transitionDelay = `${(index % 3) * 0.1}s`;
  
  card.innerHTML = `
    <a href="${prop.url}" class="prop-card-link" target="_blank" rel="noopener">
      <div class="prop-card-img-wrap">
        <div class="prop-card-gradient ${prop.gradient}"></div>
        ${prop.prestige ? '<span class="prop-card-tag">Prestige</span>' : ''}
      </div>
      <div class="prop-card-body">
        <div class="prop-card-header">
          <span class="prop-card-type">${prop.type}</span>
          <span class="prop-card-price">${prop.price.toLocaleString()} €</span>
        </div>
        <h3 class="prop-card-title">${prop.title}</h3>
        <p class="prop-card-location">${prop.city}${prop.quartier ? ` · ${prop.quartier}` : ''}</p>
        <div class="prop-card-meta">
          <span>${prop.surface} m²</span>
          <span>${prop.rooms} pièces</span>
          <span>${prop.bedrooms} ch.</span>
        </div>
      </div>
    </a>
  `;
  return card;
}

// --- FILTER & SORT LOGIC ---
const typePills = document.querySelectorAll('#filter-type .pill');
const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;

let currentTypeFilter = 'all';

function applyFiltersAndSort() {
  const sort = sortSelect?.value || 'recent';

  // Filter
  filteredProperties = allProperties.filter(p => {
    if (currentTypeFilter === 'all') return true;
    return p.type.toLowerCase().includes(currentTypeFilter.toLowerCase());
  });

  // Sort
  if (sort === 'price-asc') {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProperties.sort((a, b) => b.price - a.price);
  } else if (sort === 'surface-desc') {
    filteredProperties.sort((a, b) => b.surface - a.surface);
  } else {
    // recent
    filteredProperties.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  renderGrid(filteredProperties);
}

// Event Listeners
typePills.forEach(pill => {
  pill.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    typePills.forEach(p => p.classList.remove('pill-active'));
    target.classList.add('pill-active');
    currentTypeFilter = target.getAttribute('data-value') || 'all';
    applyFiltersAndSort();
  });
});

sortSelect?.addEventListener('change', applyFiltersAndSort);

// Initialize
document.addEventListener('DOMContentLoaded', fetchProperties);
