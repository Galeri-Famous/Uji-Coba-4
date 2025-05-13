const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

async function generateCard(data) {
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'kartu.ejs'), data);

  const filePath = path.join(__dirname, 'uploads', `${Date.now()}-kartu.pdf`);

  return new Promise((resolve, reject) => {
    pdf.create(html, {
      width: '1012px',
      height: '638px'
    }).toFile(filePath, (err, res) => {
      if (err) return reject(err);
      resolve(filePath);
    });
  });
}

module.exports = { generateCard };
