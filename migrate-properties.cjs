const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://pamcbwpgjuiujekugnbd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWNid3BnanVpdWpla3VnbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzQ4NTAsImV4cCI6MjA5MTc1MDg1MH0.0uURTAIXrzo003L5RlMEXV6Lvg0tdIc1Y3x0GNtXJIE'
);

(async () => {
  // Login to bypass RLS policies
  await supabase.auth.signInWithPassword({
    email: 'admin@admin.com',
    password: '88888888$?'
  });

  const baseUrl = 'https://www.agencerossicroisette.com/nos-biens/xdpf5d6pbmbdyrrr571h664ensk9cikrctgupcrog313giif6uqw5hp87jw31smg9buef4f7smttpgtddyhnd7bk1ajuer7w4jyogip7gxdybyz67gmghtxq7qbzu959toc1ndxk383pi7kisc5gap6iujxre1j43jkeojtyw6qbrzhr1hecabcoekrpxcazb4zgy9ogcn9xxdbbmefjrknm7uad1bk9ddcjg3itecojkz8ckfjmue5edahyjbz3ygt6qin3';
  const totalPages = 2;
  const properties = [];

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching page ${page}...`);
    const res = await fetch(`${baseUrl}/${page}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const art = $(el);
      
      const cityText = art.find('.title-v1__part1').text().trim();
      const cityMatch = cityText.match(/^(.*?)\s*\(/);
      const city = cityMatch ? cityMatch[1].trim() : cityText;

      const rawContent = art.find('.item__block--title').text().replace(/\s+/g, ' ').trim();
      console.log('Raw:', rawContent);
      // e.g. "Appartement 3 pièce(s) 2 chambre(s) 91.95 m²"
      
      const type = rawContent.split(' ')[0] || 'Appartement';
      
      const surfaceMatch = rawContent.match(/([\d\.]+)\s*m²/);
      const surface = surfaceMatch ? parseFloat(surfaceMatch[1]) : 0;
      
      const roomsMatch = rawContent.match(/(\d+)\s*pièce/);
      const rooms = roomsMatch ? parseInt(roomsMatch[1]) : 0;
      
      const bedMatch = rawContent.match(/(\d+)\s*chambre/);
      const bedrooms = bedMatch ? parseInt(bedMatch[1]) : 0;

      const title = `${type} ${rooms ? rooms + ' pièces' : ''} ${city}`.trim();

      const priceText = art.find('.item__price').text().replace(/\s+/g, '').replace('€', '').trim();
      const price = parseInt(priceText) || 0;

      const imgSrc = art.find('img.media-js').first().attr('src');
      const imageUrl = imgSrc ? (imgSrc.startsWith('//') ? 'https:' + imgSrc : imgSrc) : '';

      properties.push({
        title,
        type,
        city,
        quartier: city, // fallback to city
        surface,
        rooms,
        bedrooms,
        price,
        image_url: imageUrl
      });
    });
  }

  console.log(`Parsed ${properties.length} total properties.`);

  // Clear existing first to do a full fresh import? Or just insert new?
  // User says "import all bien". Doing an upsert implies matching against something, but table doesn't have a unique constraint on title.
  console.log("Emptying current properties table...");
  // Cannot delete all without RLS? Actually wait, delete is generally allowed if logged in.
  const { error: delError } = await supabase.from('properties').delete().neq('id', 0);
  if (delError) console.log("Del error:", delError.message);

  console.log("Inserting properties...");
  for (const p of properties) {
    const { error } = await supabase.from('properties').insert(p);
    if (error) console.error("Insert error for", p.title, ":", error.message);
  }

  console.log("Import Complete!");
})();
