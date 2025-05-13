const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

async function generateCard(data) {
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'kartu.ejs'), data);
  const filePath = path.join(__dirname, 'uploads', `${Date.now()}-kartu.pdf`);

const executablePath = await chromium.executablePath();

if (!executablePath) {
  throw new Error("Chromium executable path not found.");
}

const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath,
  headless: chromium.headless,
});

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: filePath, width: '1012px', height: '638px' });

  await browser.close();
  return filePath;
}

module.exports = { generateCard };
