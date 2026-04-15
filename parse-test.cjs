const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('temp_170.html', 'utf8');
const $d = cheerio.load(html);

console.log('--- HEADINGS ---');
$d('h2, h3').each((i, el) => console.log($d(el).text().trim()));

console.log('\n--- DPE IMAGES ---');
$d('img').each((i, el) => {
  const src = $d(el).attr('src') || $d(el).attr('data-src');
  if (src && (src.includes('dpe') || src.includes('ges'))) console.log(src);
});

console.log('\n--- LIST ITEMS (Features) ---');
$d('ul li').slice(0, 15).each((i, el) => {
  const text = $d(el).text().replace(/\s+/g, ' ').trim();
  if(text.length > 0 && text.length < 50) console.log(text);
});

console.log('\n--- DIV CLASSES (Structure) ---');
const classes = new Set();
$d('div').each((i, el) => {
  const c = $d(el).attr('class');
  if (c && c.includes('detail')) classes.add(c.trim());
});
console.log(Array.from(classes).slice(0,10));
