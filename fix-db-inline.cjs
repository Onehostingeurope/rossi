const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://pamcbwpgjuiujekugnbd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWNid3BnanVpdWpla3VnbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzQ4NTAsImV4cCI6MjA5MTc1MDg1MH0.0uURTAIXrzo003L5RlMEXV6Lvg0tdIc1Y3x0GNtXJIE'
);

(async () => {
  await supabase.auth.signInWithPassword({ email: 'admin@admin.com', password: '88888888$?' });
  const { data: props, error } = await supabase.from('properties').select('id, url');
  if (error) return console.log(error);

  for (const p of props) {
    if (!p.url) continue;
    console.log(`Deep extracting ID ${p.id} via ${p.url}`);
    
    try {
      const dRes = await fetch(p.url);
      if (!dRes.ok) continue;
      const dHtml = await dRes.text();
      const $d = cheerio.load(dHtml);

      // Extract Features Robustly
      const features = [];
      const sectionFeat = $d(`h2:contains("Caractéristique"), h3:contains("Caractéristique")`).parent().parent();
      
      if (sectionFeat.length > 0) {
        // Find list items within the Caractéristiques section
        sectionFeat.find('li').each((i, el) => {
          let text = $d(el).text().replace(/\s+/g, ' ').trim();
          // Often it's a flex box where we can just grab text
          if (text) features.push(text);
        });
      }

      if (features.length === 0) {
         // Fallback generic search if section header is missing
         $d('ul li').slice(0, 40).each((i, el) => {
           const text = $d(el).text().replace(/\s+/g, ' ').trim();
           if(text.includes('m²') || text.includes('chambre') || text.includes('pièce') || text.includes('salle') || (text.includes('construit') && text.length < 50)) {
             if(!features.includes(text)) features.push(text);
           }
         });
      }

      // Extract tables helper
      const extractTable = (titleCheck) => {
        const arr = [];
        const section = $d(`h2:contains("${titleCheck}"), h3:contains("${titleCheck}")`).parent().parent();
        section.find('.flex.justify-between').each((i, el) => {
          const label = $d(el).find('span').first().text().replace(/\s+/g, ' ').trim();
          const value = $d(el).find('span').last().text().replace(/\s+/g, ' ').trim();
          if (label && value && label !== value) arr.push({ label, value });
        });
        return arr;
      };

      const composition = extractTable('Composition');
      const copro = extractTable('Info copro');
      const financial = extractTable('Financier');

      // Extract DPE / GES
      let dpe_image = null;
      let ges_image = null;
      $d('img[src*="dpe.php"]').each((i, el) => {
        const src = $d(el).attr('src');
        if(src) {
           const fullUrl = 'https://www.agencerossicroisette.com' + src;
           if(src.includes('GES')) ges_image = fullUrl;
           else dpe_image = fullUrl;
        }
      });

      await supabase.from('properties').update({
        features, composition, copro, financial, dpe_image, ges_image
      }).eq('id', p.id);
      
      console.log(` -> Success! [${features.length} Feats] [${composition.length} Comp]`);
    } catch(err) {
      console.log(` -> Error ID ${p.id}: ${err.message}`);
    }
  }
  console.log("DEEP EXTRACTION COMPLETE");
})();
