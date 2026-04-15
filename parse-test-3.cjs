const cheerio = require('cheerio');
async function testURL(url) {
  const r = await fetch(url);
  const $d = cheerio.load(await r.text());
  
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

  const comp = extractTable('Composition');
  console.log('Composition for', url, '->', comp.length, 'rows');

  const feats = [];
  $d('ul li').slice(0, 30).each((i, el) => {
    const text = $d(el).text().replace(/\s+/g, ' ').trim();
    if (text.includes('m²') || text.includes('chambre') || text.includes('pièce')) feats.push(text);
  });
  console.log('Features ->', feats);
}
testURL('https://www.agencerossicroisette.com/vente/1-cannes/appartement/152-a-vendre-cannes-art-deco-4p-3-chambres-renove');
testURL('https://www.agencerossicroisette.com/vente/1-cannes/appartement/115-cannes-arriere-croisette-3-pces-garage-cave');
