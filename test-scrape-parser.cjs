const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('test-scrape-internal-html.txt', 'utf8');
const $ = cheerio.load(html);

const images = [];
// Scrape all slider imagery from the Swiper wrapper
$('.swiper-wrapper .swiper-slide picture source').each((i, el) => {
  const srcset = $(el).attr('srcset');
  if (srcset) {
    images.push(srcset.startsWith('//') ? 'https:' + srcset : srcset);
  }
});

let description = '';
const descParagraphs = $('.detail-bien__description-content p, .detail-bien__description p');
if (descParagraphs.length > 0) {
  descParagraphs.each((i, el) => {
    description += $(el).text() + '\n\n';
  });
} else {
    // try itemprop
    description = $('[itemprop="description"]').text();
}

console.log('Images Found:', images.length);
if (images.length) console.log('Image 1:', images[0]);
console.log('Description Length:', description.length);
console.log('Description snippet:', description.substring(0, 200).trim());
