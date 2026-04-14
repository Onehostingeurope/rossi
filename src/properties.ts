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
    
    // Auto-heal duplicate entries from overlapping migration scripts by keeping only the latest version of each URL
    allProperties = (data || []).filter((prop, index, self) => 
      prop.url && index === self.findIndex(t => t.url === prop.url)
    );
    
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
    // Trigger CSS fade-in animation
    setTimeout(() => card.classList.add('visible'), 50 + (i * 50));
  });
}

function buildCard(prop: Property, index: number): HTMLElement {
  const card = document.createElement('div');
  card.className = 'listing-card scroll-reveal';
  card.style.transitionDelay = `${(index % 3) * 0.1}s`;
  
  card.innerHTML = `
    <a href="property.html?id=${prop.id}" class="card-link" style="text-decoration:none; display:flex; flex-direction:column; height:100%;">
      <div class="card-img-wrap">
        ${prop.image_url ? `<img src="${prop.image_url}" alt="${prop.title}" loading="lazy">` : `<div class="card-img-placeholder ${prop.gradient}"></div>`}
        ${prop.prestige ? '<span class="card-prestige-badge">Prestige</span>' : ''}
        <span class="card-type-badge">${prop.type}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${prop.title}</h3>
        <p class="card-location">${prop.city}${prop.quartier && prop.quartier !== prop.city ? ` · ${prop.quartier}` : ''}</p>
        <div class="card-specs">
          <span class="card-spec">${prop.surface} m²</span>
          <span class="card-spec">${prop.rooms} pièces</span>
          <span class="card-spec">${prop.bedrooms} ch.</span>
        </div>
        <div class="card-footer">
          <span class="card-price">${prop.price.toLocaleString()} €</span>
          <span class="card-cta">Découvrir <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
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
