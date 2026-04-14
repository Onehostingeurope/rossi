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
const grid = document.getElementById('properties-grid');
const count = document.getElementById('results-count');

function renderGrid(props: Property[]) {
  if (!grid) return;
  grid.innerHTML = '';
  if (count) count.textContent = `${props.length} biens trouvés`;

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
const typeFilter = document.getElementById('filter-type') as HTMLSelectElement;
const priceSort = document.getElementById('sort-price') as HTMLSelectElement;

function applyFiltersAndSort() {
  const type = typeFilter?.value || 'all';
  const sort = priceSort?.value || 'default';

  // Filter
  filteredProperties = allProperties.filter(p => {
    if (type === 'all') return true;
    return p.type.toLowerCase().includes(type.toLowerCase());
  });

  // Sort
  if (sort === 'asc') {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filteredProperties.sort((a, b) => b.price - a.price);
  } else {
    filteredProperties.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  renderGrid(filteredProperties);
}

// Event Listeners
typeFilter?.addEventListener('change', applyFiltersAndSort);
priceSort?.addEventListener('change', applyFiltersAndSort);

// Initialize
document.addEventListener('DOMContentLoaded', fetchProperties);
