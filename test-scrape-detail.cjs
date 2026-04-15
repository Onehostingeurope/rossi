const cheerio = require('cheerio');

async function test() {
  const res = await fetch('https://www.agencerossicroisette.com/nos-biens/xdpf5d6pbmbdyrrr571h664ensk9cikrctgupcrog313giif6uqw5hp87jw31smg9buef4f7smttpgtddyhnd7bk1ajuer7w4jyogip7gxdybyz67gmghtxq7qbzu959toc1ndxk383pi7kisc5gap6iujxre1j43jkeojtyw6qbrzhr1hecabcoekrpxcazb4zgy9ogcn9xxdbbmefjrknm7uad1bk9ddcjg3itecojkz8ckfjmue5edahyjbz3ygt6qin3/1');
  const html = await res.text();
  const $ = cheerio.load(html);

  const articles = $('article');
  
  if (articles.length > 0) {
    const first = $(articles[0]);
    const fs = require('fs');
    fs.writeFileSync('test-scrape-output-utf8.txt', first.html(), 'utf8');
    console.log("Wrote to test-scrape-output-utf8.txt");
  }
}
test();
