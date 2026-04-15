const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://pamcbwpgjuiujekugnbd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWNid3BnanVpdWpla3VnbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzQ4NTAsImV4cCI6MjA5MTc1MDg1MH0.0uURTAIXrzo003L5RlMEXV6Lvg0tdIc1Y3x0GNtXJIE'
);

(async () => {
  await supabase.auth.signInWithPassword({
    email: 'admin@admin.com',
    password: '88888888$?'
  });

  const baseUrl = 'https://www.agencerossicroisette.com/nos-biens/xdpf5d6pbmbdyrrr571h664ensk9cikrctgupcrog313giif6uqw5hp87jw31smg9buef4f7smttpgtddyhnd7bk1ajuer7w4jyogip7gxdybyz67gmghtxq7qbzu959toc1ndxk383pi7kisc5gap6iujxre1j43jkeojtyw6qbrzhr1hecabcoekrpxcazb4zgy9ogcn9xxdbbmefjrknm7uad1bk9ddcjg3itecojkz8ckfjmue5edahyjbz3ygt6qin3';
  const totalPages = 2;
  const properties = [];

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching catalog page ${page}...`);
    const res = await fetch(`${baseUrl}/${page}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const articles = $('article').toArray();
    for (const el of articles) {
      const art = $(el);
      
      const cityText = art.find('.title-v1__part1').text().trim();
      const cityMatch = cityText.match(/^(.*?)\s*\(/);
      const city = cityMatch ? cityMatch[1].trim() : cityText;

      const rawContent = art.find('.item__block--title').text().replace(/\s+/g, ' ').trim();
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

      // Extract internal page link
      const internalHref = art.find('.links-group__link').first().attr('href') || art.find('a').first().attr('href');
      const internalUrl = internalHref ? (internalHref.startsWith('http') ? internalHref : `https://www.agencerossicroisette.com${internalHref}`) : '';

      // Extract grid image first to guarantee at least one real image is saved!
      const gridRawUrl = art.find('picture source').attr('srcset') || art.find('img').attr('src') || '';
      const gridImg = gridRawUrl ? (gridRawUrl.startsWith('//') ? 'https:' + gridRawUrl : gridRawUrl) : '';

      const pData = {
        title, type, city, quartier: city, surface, rooms, bedrooms, price, url: internalUrl,
        image_url: gridImg, description: '', images: []
      };

      if (gridImg && !gridImg.includes('data:image')) pData.images.push(gridImg);

      if (internalUrl) {
         console.log(` -> Drilling into ${internalUrl}`);
         const dRes = await fetch(internalUrl);
         if (dRes.ok) {
           const dHtml = await dRes.text();
           const $d = cheerio.load(dHtml);
           
           // Extract images - catching data-src, src, and srcset!
           $d('.swiper-wrapper .swiper-slide img, .swiper-wrapper .swiper-slide picture source').each((idx, imgEl) => {
             const srcset = $d(imgEl).attr('data-src') || $d(imgEl).attr('srcset') || $d(imgEl).attr('src');
             if (srcset && !srcset.includes('data:image') && !srcset.includes('no_bien')) {
               const cleanUrl = srcset.startsWith('//') ? 'https:' + srcset : srcset;
               if (!pData.images.includes(cleanUrl)) pData.images.push(cleanUrl);
             }
           });

           // Re-assign primary image in case grid was empty but gallery found one
           if (!pData.image_url && pData.images.length > 0) pData.image_url = pData.images[0];

           // Extract description
           let desc = '';
           const descNodes = $d('.detail-bien__description-content p, .detail-bien__description p');
           if (descNodes.length > 0) {
              descNodes.each((i, n) => desc += $d(n).text().trim() + '\n\n');
           } else {
              desc = $d('[itemprop="description"]').text().trim();
           }
           pData.description = desc.trim();
         }
      }

      properties.push(pData);
    }
  }

  console.log(`Parsed ${properties.length} total properties.`);

  console.log("Emptying current properties table...");
  const { error: delError } = await supabase.from('properties').delete().neq('id', 0);
  if (delError) console.log("Del error:", delError.message);

  console.log("Inserting massive properties array...");
  for (const p of properties) {
    const { error } = await supabase.from('properties').insert(p);
    if (error) console.error("Insert error for", p.title, ":", error.message);
  }

  console.log("Import Complete!");
})();
