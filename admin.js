/* =============================================
   ROSSI ADMIN — LOGIC
   ============================================= */

'use strict';

let session = null;

// --- DOM ELEMENTS ---
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.admin-tab');

// Settings Elements
const settingsForm = document.getElementById('settings-form');
const settingsStatus = document.getElementById('settings-status');

// Properties Elements
const propertiesList = document.getElementById('properties-list');
const addPropertyBtn = document.getElementById('add-property-btn');
const propertyModal = document.getElementById('property-modal');
const propertyForm = document.getElementById('property-form');
const cancelModal = document.getElementById('cancel-modal');

// --- AUTH CHECK ---
async function checkUser() {
  const { data } = await supabase.auth.getSession();
  session = data.session;
  if (session) {
    loginOverlay.classList.add('hidden');
    loadAll();
  } else {
    loginOverlay.classList.remove('hidden');
  }
}

// --- LOGIN ---
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    loginError.textContent = 'Identifiants invalides.';
  } else {
    session = data.session;
    loginOverlay.classList.add('hidden');
    loadAll();
  }
});

// --- LOGOUT ---
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});

// --- NAVIGATION ---
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(targetTab).classList.add('active');
  });
});

// --- DATA LOADING ---
async function loadAll() {
  loadSettings();
  loadProperties();
}

// --- SETTINGS LOGIC ---
async function loadSettings() {
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) return console.error(error);
  
  data.forEach(item => {
    switch(item.key) {
      case 'hero_video_id': document.getElementById('set-video-id').value = item.value; break;
      case 'hero_title_1': document.getElementById('set-hero-title-1').value = item.value; break;
      case 'hero_title_2': document.getElementById('set-hero-title-2').value = item.value; break;
      case 'hero_title_3': document.getElementById('set-hero-title-3').value = item.value; break;
      case 'hero_subtitle': document.getElementById('set-hero-subtitle').value = item.value; break;
      case 'stat_1_val': document.getElementById('set-stat1-val').value = item.value; break;
      case 'stat_1_label': document.getElementById('set-stat1-label').value = item.value; break;
      case 'stat_2_val': document.getElementById('set-stat2-val').value = item.value; break;
      case 'stat_2_label': document.getElementById('set-stat2-label').value = item.value; break;
    }
  });
}

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  settingsStatus.textContent = 'Enregistrement...';
  
  const updates = [
    { key: 'hero_video_id', value: document.getElementById('set-video-id').value },
    { key: 'hero_title_1', value: document.getElementById('set-hero-title-1').value },
    { key: 'hero_title_2', value: document.getElementById('set-hero-title-2').value },
    { key: 'hero_title_3', value: document.getElementById('set-hero-title-3').value },
    { key: 'hero_subtitle', value: document.getElementById('set-hero-subtitle').value },
    { key: 'stat_1_val', value: document.getElementById('set-stat1-val').value },
    { key: 'stat_1_label', value: document.getElementById('set-stat1-label').value },
    { key: 'stat_2_val', value: document.getElementById('set-stat2-val').value },
    { key: 'stat_2_label', value: document.getElementById('set-stat2-label').value },
  ];

  for (const item of updates) {
    await supabase.from('site_settings').upsert(item, { onConflict: 'key' });
  }
  
  settingsStatus.textContent = 'Réglages mis à jour !';
  setTimeout(() => settingsStatus.textContent = '', 3000);
});

// --- PROPERTIES LOGIC ---
async function loadProperties() {
  const { data, error } = await supabase.from('properties').select('*').order('id', { ascending: false });
  if (error) return console.error(error);
  
  propertiesList.innerHTML = '';
  data.forEach(prop => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prop.id}</td>
      <td>${prop.type}</td>
      <td>${prop.title}</td>
      <td>${prop.price.toLocaleString()} €</td>
      <td>${prop.city}</td>
      <td>
        <button class="btn-icon edit-btn" data-id="${prop.id}">✎</button>
        <button class="btn-icon delete delete-btn" data-id="${prop.id}">✕</button>
      </td>
    `;
    propertiesList.appendChild(tr);
  });
  
  // Attach events
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => editProperty(btn.dataset.id));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProperty(btn.dataset.id));
  });
}

// Modal handling
addPropertyBtn.addEventListener('click', () => {
  document.getElementById('modal-title').textContent = 'Nouveau bien';
  propertyForm.reset();
  document.getElementById('prop-id').value = '';
  propertyModal.classList.add('open');
});

cancelModal.addEventListener('click', () => propertyModal.classList.remove('open'));

async function editProperty(id) {
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
  if (error) return;
  
  document.getElementById('modal-title').textContent = 'Modifier le bien';
  document.getElementById('prop-id').value = data.id;
  document.getElementById('prop-type').value = data.type;
  document.getElementById('prop-title').value = data.title;
  document.getElementById('prop-price').value = data.price;
  document.getElementById('prop-city').value = data.city;
  document.getElementById('prop-quartier').value = data.quartier;
  document.getElementById('prop-surface').value = data.surface;
  document.getElementById('prop-rooms').value = data.rooms;
  document.getElementById('prop-bedrooms').value = data.bedrooms;
  document.getElementById('prop-url').value = data.url;
  document.getElementById('prop-desc').value = data.description;
  document.getElementById('prop-highlights').value = data.highlights.join(', ');
  document.getElementById('prop-prestige').value = data.prestige.toString();
  document.getElementById('prop-gradient').value = data.gradient;
  
  propertyModal.classList.add('open');
}

propertyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('prop-id').value;
  
  const payload = {
    type: document.getElementById('prop-type').value,
    title: document.getElementById('prop-title').value,
    price: parseInt(document.getElementById('prop-price').value, 10),
    city: document.getElementById('prop-city').value,
    quartier: document.getElementById('prop-quartier').value,
    surface: parseFloat(document.getElementById('prop-surface').value),
    rooms: parseInt(document.getElementById('prop-rooms').value, 10),
    bedrooms: parseInt(document.getElementById('prop-bedrooms').value, 10),
    url: document.getElementById('prop-url').value,
    description: document.getElementById('prop-desc').value,
    highlights: document.getElementById('prop-highlights').value.split(',').map(h => h.trim()).filter(h => h !== ''),
    prestige: document.getElementById('prop-prestige').value === 'true',
    gradient: document.getElementById('prop-gradient').value
  };
  
  let result;
  if (id) {
    result = await supabase.from('properties').update(payload).eq('id', id);
  } else {
    result = await supabase.from('properties').insert([payload]);
  }
  
  if (result.error) {
    alert('Erreur lors de l\'enregistrement: ' + result.error.message);
  } else {
    propertyModal.classList.remove('open');
    loadProperties();
  }
});

async function deleteProperty(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) alert(error.message);
    else loadProperties();
  }
}

// Initial check
checkUser();
