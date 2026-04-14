import { supabase } from './supabase'
import { Property, SiteSetting } from './types'

/* =============================================
   ROSSI ADMIN — LOGIC
   ============================================= */

let session: any = null;

// --- DOM ELEMENTS ---
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.admin-tab');

// Settings Elements
const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
const settingsStatus = document.getElementById('settings-status');

// Properties Elements
const propertiesList = document.getElementById('properties-list');
const addPropertyBtn = document.getElementById('add-property-btn');
const propertyModal = document.getElementById('property-modal');
const propertyForm = document.getElementById('property-form') as HTMLFormElement;
const cancelModal = document.getElementById('cancel-modal');

// --- AUTH CHECK ---
async function checkUser() {
  const { data } = await supabase.auth.getSession();
  session = data.session;
  if (session && loginOverlay) {
    loginOverlay.classList.add('hidden');
    loadAll();
  } else if (loginOverlay) {
    loginOverlay.classList.remove('hidden');
  }
}

// --- LOGIN ---
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (loginError) loginError.textContent = '';
  const email = (document.getElementById('login-email') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    if (loginError) loginError.textContent = 'Identifiants invalides.';
  } else {
    session = data.session;
    loginOverlay?.classList.add('hidden');
    loadAll();
  }
});

// --- LOGOUT ---
logoutBtn?.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});

// --- NAVIGATION ---
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = (btn as HTMLElement).dataset.tab;
    if (!targetTab) return;
    
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(targetTab)?.classList.add('active');
  });
});

// --- DATA LOADING ---
function loadAll() {
  loadSettings();
  loadProperties();
}

// --- SETTINGS LOGIC ---
async function loadSettings() {
  const { data, error } = await supabase.from('site_settings').select('*') as { data: SiteSetting[] | null, error: any };
  if (error) return console.error(error);
  if (!data) return;
  
  data.forEach(item => {
    const elId = getElementIdForKey(item.key);
    if (!elId) return;
    const el = document.getElementById(elId) as HTMLInputElement | HTMLTextAreaElement;
    if (el) el.value = item.value;
  });
}

function getElementIdForKey(key: string): string | null {
  const map: Record<string, string> = {
    'hero_video_id': 'set-video-id',
    'hero_title_1': 'set-hero-title-1',
    'hero_title_2': 'set-hero-title-2',
    'hero_title_3': 'set-hero-title-3',
    'hero_subtitle': 'set-hero-subtitle',
    'about_img': 'set-about-img',
    'about_vid': 'set-about-vid',
    'stat_1_val': 'set-stat1-val',
    'stat_1_label': 'set-stat1-label',
    'stat_2_val': 'set-stat2-val',
    'stat_2_label': 'set-stat2-label',
  };
  return map[key] || null;
}

settingsForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (settingsStatus) settingsStatus.textContent = 'Enregistrement...';
  
  const updates = [
    { key: 'hero_video_id', value: (document.getElementById('set-video-id') as HTMLInputElement).value },
    { key: 'hero_title_1', value: (document.getElementById('set-hero-title-1') as HTMLInputElement).value },
    { key: 'hero_title_2', value: (document.getElementById('set-hero-title-2') as HTMLInputElement).value },
    { key: 'hero_title_3', value: (document.getElementById('set-hero-title-3') as HTMLInputElement).value },
    { key: 'hero_subtitle', value: (document.getElementById('set-hero-subtitle') as HTMLTextAreaElement).value },
    { key: 'about_img', value: (document.getElementById('set-about-img') as HTMLInputElement).value },
    { key: 'about_vid', value: (document.getElementById('set-about-vid') as HTMLInputElement).value },
    { key: 'stat_1_val', value: (document.getElementById('set-stat1-val') as HTMLInputElement).value },
    { key: 'stat_1_label', value: (document.getElementById('set-stat1-label') as HTMLInputElement).value },
    { key: 'stat_2_val', value: (document.getElementById('set-stat2-val') as HTMLInputElement).value },
    { key: 'stat_2_label', value: (document.getElementById('set-stat2-label') as HTMLInputElement).value },
  ];

  let hasError = false;
  for (const item of updates) {
    const { error } = await supabase.from('site_settings').upsert(item, { onConflict: 'key' });
    if (error) {
      hasError = true;
      console.error(error);
      if (settingsStatus) settingsStatus.textContent = `Erreur: ${error.message}`;
      break;
    }
  }
  
  if (!hasError && settingsStatus) settingsStatus.textContent = 'Réglages mis à jour !';
  setTimeout(() => { if (settingsStatus) settingsStatus.textContent = ''; }, 4000);
});

// --- MEDIA UPLOAD LOGIC ---
const btnUploadVid = document.getElementById('btn-upload-vid');
const inputUploadVid = document.getElementById('upload-about-vid') as HTMLInputElement | null;
const progressVid = document.getElementById('upload-progress-vid');
const urlVidInput = document.getElementById('set-about-vid') as HTMLInputElement | null;

if (btnUploadVid && inputUploadVid && progressVid && urlVidInput) {
  btnUploadVid.addEventListener('click', () => {
    inputUploadVid.click();
  });

  inputUploadVid.addEventListener('change', async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      progressVid.textContent = 'Upload en cours, veuillez patienter...';
      const fileExt = file.name.split('.').pop();
      const fileName = `video-${Date.now()}.${fileExt}`;
      const filePath = `about/${fileName}`;

      const { error } = await supabase.storage
        .from('media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: publicData } = supabase.storage.from('media').getPublicUrl(filePath);

      if (publicData?.publicUrl) {
        urlVidInput.value = publicData.publicUrl;
        progressVid.textContent = 'Upload réussi ! Cliquez sur "Enregistrer les réglages" ci-dessous.';
      }
    } catch (error: any) {
      console.error(error);
      progressVid.textContent = `Erreur: ${error.message}`;
    }
  });
}

// --- PROPERTIES LOGIC ---
async function loadProperties() {
  const { data, error } = await supabase.from('properties').select('*').order('id', { ascending: false }) as { data: Property[] | null, error: any };
  if (error) return console.error(error);
  if (!propertiesList || !data) return;
  
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
    btn.addEventListener('click', () => editProperty((btn as HTMLElement).dataset.id!));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProperty((btn as HTMLElement).dataset.id!));
  });
}

// Modal handling
addPropertyBtn?.addEventListener('click', () => {
  const titleEl = document.getElementById('modal-title');
  if (titleEl) titleEl.textContent = 'Nouveau bien';
  propertyForm.reset();
  (document.getElementById('prop-id') as HTMLInputElement).value = '';
  propertyModal?.classList.add('open');
});

cancelModal?.addEventListener('click', () => propertyModal?.classList.remove('open'));

async function editProperty(id: string) {
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single() as { data: Property | null, error: any };
  if (error || !data) return;
  
  const titleEl = document.getElementById('modal-title');
  if (titleEl) titleEl.textContent = 'Modifier le bien';
  
  (document.getElementById('prop-id') as HTMLInputElement).value = data.id?.toString() || '';
  (document.getElementById('prop-type') as HTMLInputElement).value = data.type;
  (document.getElementById('prop-title') as HTMLInputElement).value = data.title;
  (document.getElementById('prop-price') as HTMLInputElement).value = data.price.toString();
  (document.getElementById('prop-city') as HTMLInputElement).value = data.city;
  (document.getElementById('prop-quartier') as HTMLInputElement).value = data.quartier;
  (document.getElementById('prop-surface') as HTMLInputElement).value = data.surface.toString();
  (document.getElementById('prop-rooms') as HTMLInputElement).value = data.rooms.toString();
  (document.getElementById('prop-bedrooms') as HTMLInputElement).value = data.bedrooms.toString();
  (document.getElementById('prop-url') as HTMLInputElement).value = data.url;
  (document.getElementById('prop-desc') as HTMLTextAreaElement).value = data.description;
  (document.getElementById('prop-highlights') as HTMLInputElement).value = data.highlights.join(', ');
  (document.getElementById('prop-prestige') as HTMLSelectElement).value = data.prestige.toString();
  (document.getElementById('prop-gradient') as HTMLInputElement).value = data.gradient;
  
  propertyModal?.classList.add('open');
}

propertyForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const idValue = (document.getElementById('prop-id') as HTMLInputElement).value;
  
  const payload: Property = {
    type: (document.getElementById('prop-type') as HTMLInputElement).value,
    title: (document.getElementById('prop-title') as HTMLInputElement).value,
    price: parseInt((document.getElementById('prop-price') as HTMLInputElement).value, 10),
    city: (document.getElementById('prop-city') as HTMLInputElement).value,
    quartier: (document.getElementById('prop-quartier') as HTMLInputElement).value,
    surface: parseFloat((document.getElementById('prop-surface') as HTMLInputElement).value),
    rooms: parseInt((document.getElementById('prop-rooms') as HTMLInputElement).value, 10),
    bedrooms: parseInt((document.getElementById('prop-bedrooms') as HTMLInputElement).value, 10),
    url: (document.getElementById('prop-url') as HTMLInputElement).value,
    description: (document.getElementById('prop-desc') as HTMLTextAreaElement).value,
    highlights: (document.getElementById('prop-highlights') as HTMLInputElement).value.split(',').map(h => h.trim()).filter(h => h !== ''),
    prestige: (document.getElementById('prop-prestige') as HTMLSelectElement).value === 'true',
    gradient: (document.getElementById('prop-gradient') as HTMLInputElement).value
  };
  
  let result;
  if (idValue) {
    result = await supabase.from('properties').update(payload).eq('id', idValue);
  } else {
    result = await supabase.from('properties').insert([payload]);
  }
  
  if (result.error) {
    alert('Erreur lors de l\'enregistrement: ' + result.error.message);
  } else {
    propertyModal?.classList.remove('open');
    loadProperties();
  }
});

async function deleteProperty(id: string) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) alert(error.message);
    else loadProperties();
  }
}

// Initial check
checkUser();
