const cheerio = require('cheerio');

async function test() {
  const res = await fetch('https://www.agencerossicroisette.com/nos-biens/xdpf5d6pbmbdyrrr571h664ensk9cikrctgupcrog313giif6uqw5hp87jw31smg9buef4f7smttpgtddyhnd7bk1ajuer7w4jyogip7gxdybyz67gmghtxq7qbzu959toc1ndxk383pi7kisc5gap6iujxre1j43jkeojtyw6qbrzhr1hecabcoekrpxcazb4zgy9ogcn9xxdbbmefjrknm7uad1bk9ddcjg3itecojkz8ckfjmue5edahyjbz3ygt6qin3/1');
  const html = await res.text();
  const $ = cheerio.load(html);

  const items = [];
  $('.property-card, .bien, article, .listing-item').each((i, el) => {
    // Attempting various common classes for property listings
    items.push($(el).text().replace(/\s+/g, ' ').trim().substring(0, 50));
  });

  console.log("Found properties length:", items.length);
  if (items.length === 0) {
    // fallback, print div classes for analysis
    const classes = [];
    $('div').each((i, el) => {
      const cls = $(el).attr('class');
      if (cls && !classes.includes(cls)) classes.push(cls);
    });
    console.log("Available classes to hunt:", classes.join(', '));
  } else {
    console.log("Sample:", items.slice(0, 3));
  }
}
test();
