const cheerio = require('cheerio');
const fs = require('fs');

async function test() {
  const url = 'https://www.agencerossicroisette.com/vente/9-le-cannet/appartement/170-le-cannet-grand-3-pieces-parking-et-cave';
  const res = await fetch(url);
  const html = await res.text();
  fs.writeFileSync('test-scrape-internal-html.txt', html, 'utf8');
  console.log("Wrote full HTML to test-scrape-internal-html.txt");
}
test();
