'use strict';

/* ============================================================
   ROSSI CROISETTE — ALL PROPERTIES DATA (34 biens)
   Scraped from agencerossicroisette.com/vente/
   ============================================================ */

const PROPERTIES = [
  // ---- PAGE 1 (most recent first) ----
  {
    id: 170,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 91.95,
    city: 'Le Cannet',
    quartier: 'Le Cannet',
    price: 413000,
    title: 'Grand 3 pièces — Parking & Cave',
    description: 'Spacieux appartement de 91.95 m², idéalement situé proche des commerces, à 10 minutes du centre de Cannes. Grande entrée, dressings, cuisine équipée fermée, vaste séjour salon.',
    highlights: ['Parking', 'Cave', 'Proche Cannes'],
    url: 'https://www.agencerossicroisette.com/vente/9-le-cannet/appartement/170-le-cannet-grand-3-pieces-parking-et-cave',
    gradient: 'grad-1',
    prestige: false,
  },
  {
    id: 169,
    type: 'Appartement',
    rooms: 1,
    bedrooms: 0,
    surface: 20,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 195000,
    title: 'Studio — Cave, Parking & Terrasse',
    description: 'Studio de 20 m² dans une charmante copropriété proche des commerces. Cuisine équipée, belle terrasse de 12 m², salle de douche. Parking et cave inclus.',
    highlights: ['Terrasse 12m²', 'Parking', 'Cave'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/169-cannes-basse-californie-studio-cave-parking-terrasse',
    gradient: 'grad-2',
    prestige: false,
  },
  {
    id: 163,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 47,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 1260000,
    title: '3 pièces Croisette — Balcon, Vue Mer, Rénové',
    description: 'Sur la célèbre Croisette, entièrement rénové avec des prestations modernes. 3ᵉ étage, belle luminosité, terrasse de 7 m² avec vue mer partielle.',
    highlights: ['Vue mer', 'Terrasse 7m²', 'Rénové', 'Croisette'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/163-a-vendre-cannes-croisette-3-pieces-2-chambres-balcon-renove',
    gradient: 'grad-3',
    prestige: true,
  },
  {
    id: 156,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 36.16,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 760000,
    title: '2 pièces Croisette 1ère ligne — Vue Panoramique Mer',
    description: 'Croisette première ligne, magnifique 2 pièces de 36 m². Hall d\'entrée avec dressing, cuisine séparée équipée, séjour donnant sur terrasse de 7 m², vue panoramique sur la baie.',
    highlights: ['Vue mer panoramique', 'Terrasse 7m²', '1ère ligne', 'Parking'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/156-cannes-croisette-vue-panoramique-mer',
    gradient: 'grad-4',
    prestige: true,
  },
  {
    id: 154,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 75,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 1590000,
    title: '3 pièces Croisette — Rénové, Parking, Terrasse',
    description: 'Magnifique 3 pièces de 75 m² sur la célébre Croisette. Proche des plages, restaurants, Palais des Festivals. Rénové, parking extérieur inclus.',
    highlights: ['Croisette', 'Terrasse', 'Parking', 'Rénové'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/154-a-vendre-cannes-croisette-3-pieces-2-chambres-renove-parking-exterieur-terrasse',
    gradient: 'grad-5',
    prestige: true,
  },
  {
    id: 153,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 57,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 450000,
    title: '3 pièces — Balcon, Terrasse & Cave',
    description: 'Secteur Basse Californie, à quelques minutes du centre-ville, des commerces, de la plage et de la Croisette. 3 pièces partiellement rénové avec balcon et terrasse.',
    highlights: ['Balcon', 'Terrasse', 'Cave', 'Basse Californie'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/153-a-vendre-cannes-3-pieces-2-chambres-renove-balcon-terrasse-cave',
    gradient: 'grad-6',
    prestige: false,
  },
  {
    id: 152,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 157.9,
    city: 'Cannes',
    quartier: 'Centre-Ville',
    price: 1375000,
    title: '4 pièces Art-Déco — 157 m², Rénové',
    description: 'À quelques minutes à pied des plages et du centre-ville, magnifique 4 pièces Art-Déco de 157.9 m². Double séjour, salle à manger, cuisine équipée.',
    highlights: ['157 m²', 'Art-Déco', 'Rénové', 'Grand Volume'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/152-a-vendre-cannes-art-deco-4p-3-chambres-renove',
    gradient: 'grad-1',
    prestige: true,
  },
  {
    id: 151,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 74.37,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 780000,
    title: '3 pièces — Terrasse Vue Mer, Garage & Cave',
    description: 'Dans un écrin de verdure, proche des plages, dans une très belle résidence avec gardien. Appartement entièrement rénové, grand séjour, terrasse avec vue mer.',
    highlights: ['Vue mer', 'Terrasse', 'Garage', 'Cave', 'Gardien'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/151-vente-cannes-basse-californie-3pces-terrasse-vue-mer-garage-cave',
    gradient: 'grad-2',
    prestige: false,
  },
  {
    id: 150,
    type: 'Maison',
    rooms: 7,
    bedrooms: 4,
    surface: 315,
    city: 'Cannes',
    quartier: 'La Californie',
    price: 6970000,
    title: 'Villa-Appartement 315 m² — Vue Mer, Parc 2 ha',
    description: 'Villa-appartement lumineuse de 7 pièces dans le secteur de la Californie. Implantée dans un parc paysager de 2 hectares, rénovée par un architecte de renom. Vue panoramique.',
    highlights: ['315 m²', 'Vue mer panoramique', 'Parc 2 ha', 'Architecte'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/maison/150-a-vendre-cannes-villa-appartement-vue-mer-315-m2',
    gradient: 'grad-3',
    prestige: true,
  },
  {
    id: 149,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 110,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 2580000,
    title: '4 pièces Croisette — Dernier Étage, Vue Mer',
    description: 'Un appartement rénové d\'exception sur la Croisette. 4 pièces de 110 m² perché au dernier étage, vue imprenable sur la mer. Vaste séjour baigné de lumière avec terrasse.',
    highlights: ['Dernier étage', 'Vue mer', 'Croisette', '110 m²', 'Terrasse'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/149-a-vendre-cannes-croisette-4-p-dernier-etage-vue-mer-panoramique',
    gradient: 'grad-4',
    prestige: true,
  },
  {
    id: 148,
    type: 'Appartement',
    rooms: 5,
    bedrooms: 4,
    surface: 118,
    city: 'Cannes',
    quartier: 'Roi Albert',
    price: 2480000,
    title: '5 pièces Roi Albert — Vue Mer Panoramique',
    description: 'Magnifique propriété offrant une vue panoramique sur la Méditerranée. Entièrement rénové avec des matériaux de haute qualité. 5 pièces spacieuses dans une résidence de prestige.',
    highlights: ['Vue mer panoramique', '118 m²', 'Matériaux luxe', 'Rénové'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/148-a-vendre-cannes-roi-albert-5-pieces-vue-mer',
    gradient: 'grad-5',
    prestige: true,
  },
  {
    id: 147,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 92,
    city: 'Cannes',
    quartier: 'La Californie',
    price: 2580000,
    title: '4 pièces Californie — 6ème Étage, Vue Mer Panoramique',
    description: 'Dans une belle résidence de standing, 4 pièces de 92 m² au 6ème étage avec vue mer panoramique. 3 chambres en suite, cuisine ouverte, belle terrasse.',
    highlights: ['6ème étage', 'Vue mer', '3 suites', 'Californie', 'Terrasse'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/147-a-vendre-superbe-4-pieces-vue-mer-panoramique-secteur-californie',
    gradient: 'grad-6',
    prestige: true,
  },
  {
    id: 146,
    type: 'Appartement',
    rooms: 5,
    bedrooms: 6,
    surface: 219.58,
    city: 'Cannes',
    quartier: 'Vieux Port',
    price: 3300000,
    title: 'Penthouse Vieux Port — 107 m² + 105 m² Terrasse',
    description: 'L\'exclusivité ultime de la French Riviera. Penthouse au Vieux Port de Cannes, rénové avec goût. 107 m² + 105 m² de terrasse, vue mer extraordinaire sur la Méditerranée.',
    highlights: ['Penthouse', 'Terrasse 105m²', 'Vue mer', 'Vieux Port', 'Exclusivité'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/146-a-vendre-cannes-penthouse-107-m2-vue-panoramique-mer',
    gradient: 'grad-1',
    prestige: true,
  },
  {
    id: 145,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 70,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 2380000,
    title: '3 pièces Croisette Traversant — Vue Mer Panoramique',
    description: 'Superbe 3 pièces de 70 m² traversant rénové dans une résidence de standing sur la Croisette. Pièce à vivre avec cuisine ouverte, 2 belles chambres en suite.',
    highlights: ['Vue mer panoramique', 'Traversant', 'Croisette', 'Rénové', '2 suites'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/145-a-vendre-cannes-croissette-3-p-traversant-vue-mer-panoramique',
    gradient: 'grad-2',
    prestige: true,
  },
  {
    id: 144,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 100,
    city: 'Cannes',
    quartier: 'Palm Beach',
    price: 1980000,
    title: '4 pièces Palm Beach — Vue Mer, Piscine',
    description: 'Magnifique 4 pièces au 3ème étage dans une résidence avec piscine, refait à neuf au style moderne. Secteur prisé du Palm Beach avec vue mer, traversant.',
    highlights: ['Vue mer', 'Piscine', 'Palm Beach', 'Rénové', '100 m²'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/144-a-vendre-cannes-secteur-palm-beach-vue-mer-4-pieces',
    gradient: 'grad-3',
    prestige: true,
  },
  {
    id: 143,
    type: 'Villa',
    rooms: 9,
    bedrooms: 6,
    surface: 300,
    city: 'Cannes',
    quartier: 'La Californie',
    price: 6970000,
    title: 'Villa Californie — 300 m², Piscine, Vue Îles de Lérins',
    description: 'Villa d\'exception de 300 m² dans le prestigieux quartier de la Californie. Panorama à couper le souffle sur les Îles de Lérins et la mer. Piscine, terrain.',
    highlights: ['300 m²', 'Piscine', 'Vue mer & Îles', 'Terrain', 'La Californie'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/villa/143-a-vendre-villa-californie-6-chambres-terrain-piscine-vue-panoramique-mer-et-iles-de-lerins',
    gradient: 'grad-4',
    prestige: true,
  },
  {
    id: 142,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 100,
    city: 'Cannes',
    quartier: 'Palm Beach',
    price: 1980000,
    title: '4 pièces Palm Beach — 100 m², Parking & Cave',
    description: 'Magnifique 4 pièces de 100 m² dans le prestigieux quartier du Palm Beach, à deux pas des plages. Entièrement refait à neuf, vaste séjour avec cuisine ouverte.',
    highlights: ['100 m²', 'Palm Beach', 'Parking', 'Cave', 'Vue mer'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/142-a-vendre-cannes-secteur-palm-beach-vue-mer-4-pieces-parking-cave',
    gradient: 'grad-5',
    prestige: false,
  },
  {
    id: 141,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 53.38,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 1590000,
    title: '2 pièces Croisette — 6ème Étage, Face Mer & Palais',
    description: 'Au 6e étage d\'une résidence d\'exception sur le boulevard de la Croisette. Rénové avec des matériaux de luxe. Vue sur la mer Méditerranée et le Palais des Festivals.',
    highlights: ['6ème étage', 'Face mer & Palais', 'Luxe', 'Croisette'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/141-croisette-2p-6eme-face-mer-et-palais',
    gradient: 'grad-6',
    prestige: true,
  },
  {
    id: 140,
    type: 'Villa',
    rooms: 10,
    bedrooms: 7,
    surface: 321,
    city: 'Mougins',
    quartier: 'Mougins',
    price: 1380000,
    title: 'Villa de Caractère 321 m² — Terrain 1 100 m²',
    description: 'Dans un environnement calme et verdoyant, propriété atypique de 370 m² sur terrain plat et arboré de 1 100 m². Cadre de vie rare à deux pas de Mougins.',
    highlights: ['321 m²', 'Terrain 1100m²', 'Calme', 'Mougins', 'Caractère'],
    url: 'https://www.agencerossicroisette.com/vente/10-mougins/villa/140-mougins-villa-de-caractere-370-m-au-coeur-d-un-ecrin-de-verdure',
    gradient: 'grad-1',
    prestige: false,
  },
  {
    id: 139,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 85.59,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 869200,
    title: '3 pièces Basse Californie — Piscine, Terrasse 25 m²',
    description: 'Dans le quartier prisé de la Basse Californie, superbe 3 pièces de 86 m² niché au calme d\'une impasse piétonne. Résidence récente avec piscine, terrasse de 25 m².',
    highlights: ['Piscine', 'Terrasse 25m²', 'Calme', 'Récent'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/139-basse-californie-3p-86-m-piscine-terrasse-de-25-m',
    gradient: 'grad-2',
    prestige: false,
  },

  // ---- PAGE 2 ----
  {
    id: 138,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 53.57,
    city: 'Cannes',
    quartier: 'Palm Beach',
    price: 443000,
    title: '2 pièces Croisette — 2 min Plage & Port Canto',
    description: 'À seulement 2 minutes de la plage Bijou et du Port Canto. Rez-de-jardin sur la Croisette Palm Beach avec emplacement privilégié.',
    highlights: ['Rez-de-jardin', '2 min plage', 'Port Canto', 'Croisette'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/138-2p-53m-croisette-palm-beach-2-mn-plage-et-port-canto',
    gradient: 'grad-3',
    prestige: false,
  },
  {
    id: 137,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 2,
    surface: 60.03,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 593600,
    title: '2 pièces Basse Californie — Terrasse, Cave, Meublé',
    description: 'Au cœur de la Basse Californie, à deux pas de la Croisette. Entièrement rénové avec goût et vendu meublé. 2ème étage, copropriété de 18 lots.',
    highlights: ['Meublé', 'Terrasse', 'Cave', 'Rénové', 'Basse Californie'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/137-a-vendre-3-pieces-basse-californie-terrasse-cave-renove',
    gradient: 'grad-4',
    prestige: false,
  },
  {
    id: 133,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 34.7,
    city: 'Cannes',
    quartier: 'Basse Californie',
    price: 297000,
    title: '2 pièces Basse Californie — Rénové, Terrasse',
    description: 'Idéalement situé dans la Basse Californie, à quelques pas de la Croisette et de l\'Hôtel Martinez. 2 pièces climatisé de 35 m² avec terrasse.',
    highlights: ['Terrasse', 'Climatisation', 'Rénové', 'Proche Martinez'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/133-a-vendre-cannes-basse-californie-2p-renove-terrasse',
    gradient: 'grad-5',
    prestige: false,
  },
  {
    id: 132,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 1,
    surface: 93,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 2500000,
    title: '3 pièces Le Miramar — Croisette, Vue Mer & Terrasse',
    description: 'Au cœur de la Croisette, au sein du Miramar. Appartement de 93 m² face à la mer. 1er étage, vue panoramique sur la Méditerranée, grande terrasse.',
    highlights: ['Le Miramar', 'Vue mer', 'Terrasse', 'Croisette', '93 m²'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/132-a-vendre-cannes-croisette-miramar-3-pieces-terrasse',
    gradient: 'grad-6',
    prestige: true,
  },
  {
    id: 131,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 32.74,
    city: 'Cannes',
    quartier: 'Cannes',
    price: 315000,
    title: '2 pièces Vue Mer — Rénové, Meublé, Cave & Parking',
    description: 'Au 1er étage d\'une copropriété sécurisée de 80 lots, appartement entièrement rénové et vendu meublé. Vue mer, cave, parking, tennis et pétanque.',
    highlights: ['Vue mer', 'Meublé', 'Cave', 'Parking', 'Tennis'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/131-a-vendre-2-pieces-vue-mer-renove-cave-parking-tennis-petanque',
    gradient: 'grad-1',
    prestige: false,
  },
  {
    id: 130,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 54.56,
    city: 'Mandelieu-la-Napoule',
    quartier: 'Mandelieu',
    price: 283000,
    title: '2 pièces Mandelieu — Jardin 500 m² & Parking',
    description: 'Proche des accès autoroutiers et commodités, appartement atypique avec extérieur de 500 m². Entrée sur séjour avec cuisine ouverte.',
    highlights: ['Jardin 500m²', 'Parking', 'Mandelieu', 'Atypique'],
    url: 'https://www.agencerossicroisette.com/vente/150-mandelieu-la-napoule/appartement/130-a-vendre-2-p-mandelieu-jardin-500m2-parking',
    gradient: 'grad-2',
    prestige: false,
  },
  {
    id: 129,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 127,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 3600000,
    title: '3 pièces Croisette — 127 m², Rénové Luxueux',
    description: 'Au cœur de la Croisette, entièrement rénové. Cadre de vie luxueux et raffiné. Beaux volumes, élégante entrée menant à un double séjour.',
    highlights: ['127 m²', 'Croisette', 'Luxueux', 'Double séjour'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/129-cannes-croisette-appartement-3-pieces-a-vendre',
    gradient: 'grad-3',
    prestige: true,
  },
  {
    id: 128,
    type: 'Appartement',
    rooms: 4,
    bedrooms: 3,
    surface: 121.36,
    city: 'Cannes',
    quartier: 'La Croisette',
    price: 4095000,
    title: 'Le Relais de la Reine — 4 pièces Croisette Prestige',
    description: 'Dans une célébre résidence de standing, magnifique 4 pièces à vendre entièrement rénové en étage élevé. Traversant de 121.36 m², exposé plein SUD, double séjour lumineux.',
    highlights: ['Plein SUD', 'Étage élevé', 'Traversant', '121 m²', 'Prestige'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/128-a-vendre-cannes-croisette-le-relais-de-la-reine-4-pieces-121m2-prestige',
    gradient: 'grad-4',
    prestige: true,
  },
  {
    id: 126,
    type: 'Appartement',
    rooms: 2,
    bedrooms: 1,
    surface: 41,
    city: 'Cannes',
    quartier: 'Montfleury',
    price: 349000,
    title: '2 pièces Rez-de-Jardin — Terrasse & Parking',
    description: 'Secteur Montfleury, dans une copropriété de standing. Beau 2 pièces en rez-de-jardin avec séjour, cuisine ouverte donnant sur terrasse et jardin privatif.',
    highlights: ['Rez-de-jardin', 'Terrasse', 'Jardin', 'Parking', 'Standing'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/126-a-vendre-cannes-2-pieces-rez-de-jardin-parking',
    gradient: 'grad-5',
    prestige: false,
  },
  {
    id: 123,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 40,
    city: 'Cannes',
    quartier: 'Centre-Ville',
    price: 440000,
    title: '3 pièces Centre Cannes — Vue Port & Palais',
    description: 'Au 4ᵉ étage, vue dégagée sur le port et le Palais des Festivals. Excellent ensoleillement. Séjour lumineux au cœur de Cannes.',
    highlights: ['Vue port & Palais', '4ème étage', 'Ensoleillé', 'Centre Cannes'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/123-a-vendre-appartement-3-pieces-au-coeur-de-cannes',
    gradient: 'grad-6',
    prestige: false,
  },
  {
    id: 122,
    type: 'Rez de jardin',
    rooms: 3,
    bedrooms: 2,
    surface: 70.79,
    city: 'Villeneuve-Loubet',
    quartier: 'Villeneuve-Loubet',
    price: 1200000,
    title: 'Rez-de-Jardin Pieds dans l\'Eau — 3 pièces Standing',
    description: 'Superbe T3 en rez-de-jardin dans une résidence récente de grand standing, les pieds dans l\'eau. Emplacement exceptionnel alliant confort, élégance et sérénité.',
    highlights: ['Pieds dans l\'eau', 'Grand standing', 'Récent', 'Vue mer'],
    url: 'https://www.agencerossicroisette.com/vente/199-villeneuve-loubet/rez-de-jardin/122-acces-plage-direct-bien-a-vendre-en-residence-recente',
    gradient: 'grad-1',
    prestige: true,
  },
  {
    id: 118,
    type: 'Appartement',
    rooms: 1,
    bedrooms: 0,
    surface: 21.39,
    city: 'Cannes',
    quartier: 'Palm Beach',
    price: 260000,
    title: 'Studio Palm Beach — Rénové, Terrasse, Cave',
    description: 'Secteur Palm Beach, à deux pas des plages. Superbe studio entièrement rénové alliant confort et modernité. Cave incluse.',
    highlights: ['Palm Beach', 'Terrasse', 'Cave', 'Rénové', 'Proche plages'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/118-cannes-palm-beach-studio-terrasse-cave-ouest-renove',
    gradient: 'grad-2',
    prestige: false,
  },
  {
    id: 116,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 68.5,
    city: 'Cannes',
    quartier: 'Centre-Ville',
    price: 615000,
    title: '3 pièces Meublé — Résidence Standing, Gardien',
    description: 'Plein centre de Cannes, proche Croisette et plages. 3 pièces rénové et meublé dans une résidence de standing avec gardien. Grande terrasse.',
    highlights: ['Meublé', 'Gardien', 'Grande terrasse', 'Standing'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/116-cannes-banane-3-pieces',
    gradient: 'grad-3',
    prestige: false,
  },
  {
    id: 115,
    type: 'Appartement',
    rooms: 3,
    bedrooms: 2,
    surface: 61.16,
    city: 'Cannes',
    quartier: 'Arrière-Croisette',
    price: 520000,
    title: '3 pièces Arrière-Croisette — Garage & Cave',
    description: 'Proche centre-ville, des plages et commerces, au calme absolu dans une très belle résidence avec gardien. 3 pièces traversant avec terrasse de 11 m².',
    highlights: ['Terrasse 11m²', 'Garage', 'Cave', 'Gardien', 'Calme'],
    url: 'https://www.agencerossicroisette.com/vente/1-cannes/appartement/115-cannes-arriere-croisette-3-pces-garage-cave',
    gradient: 'grad-4',
    prestige: false,
  },
];

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
  applyFiltersAndSort();

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
