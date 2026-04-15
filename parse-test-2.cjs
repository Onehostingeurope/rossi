const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('temp_170.html', 'utf8');
const $d = cheerio.load(html);

console.log('--- FEATURES ---');
const features = [];
$d('.item-features li').each((i, el) => {
  features.push($d(el).text().replace(/\s+/g, ' ').trim());
});
console.log(features.slice(0, 5));

console.log('--- COMPOSITION ---');
const comp = [];
const compSection = $d('h2:contains("Composition")').parent().parent();
compSection.find('.flex.justify-between').each((i, el) => {
  const label = $d(el).find('span').first().text().replace(/\s+/g, ' ').trim();
  const value = $d(el).find('span').last().text().replace(/\s+/g, ' ').trim();
  if (label && value) comp.push({ label, value });
});
console.log(comp.slice(0,5));

console.log('--- INFO COPRO ---');
const copro = [];
const coproSection = $d('h2:contains("Info copro")').parent().parent();
coproSection.find('.flex.justify-between').each((i, el) => {
  const label = $d(el).find('span').first().text().replace(/\s+/g, ' ').trim();
  const value = $d(el).find('span').last().text().replace(/\s+/g, ' ').trim();
  if (label && value) copro.push({ label, value });
});
console.log(copro.slice(0,5));

console.log('--- FINANCIER ---');
const financier = [];
const finSection = $d('h2:contains("Financier")').parent().parent();
finSection.find('.flex.justify-between').each((i, el) => {
  const label = $d(el).find('span').first().text().replace(/\s+/g, ' ').trim();
  const value = $d(el).find('span').last().text().replace(/\s+/g, ' ').trim();
  if (label && value) financier.push({ label, value });
});
console.log(financier);

console.log('--- DPE & GES ---');
$d('img[src*="dpe.php"]').each((i, el) => {
  console.log($d(el).attr('src'));
});
