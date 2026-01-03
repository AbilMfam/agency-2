const fs = require('fs');
const content = fs.readFileSync('Portfolio_new.jsx', 'utf8');
const fixedContent = content.replace('...services.map((service) => (]', '...services.map((service) => ({');
fs.writeFileSync('Portfolio.jsx', fixedContent, 'utf8');
console.log('Fixed syntax error in Portfolio.jsx');
