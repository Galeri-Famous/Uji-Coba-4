const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { generateCard } = require('./generateCard');

const app = express();
const port = process.env.PORT || 3000;

// Setup view engine dan static folder
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Setup Multer untuk upload foto
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Halaman Form
app.get('/', (req, res) => {
  res.render('index');
});

// Preview kartu langsung ke browser (tanpa PDF)
app.post('/preview', upload.single('foto'), (req, res) => {
  const data = req.body;
  data.foto = req.file.filename;
  data.tanggal = moment().format('D MMMM YYYY');
  res.render('kartu', data);
});

// Generate kartu sebagai PDF lalu unduh + hapus file
app.post('/generate', upload.single('foto'), async (req, res) => {
  const data = req.body;
  data.foto = req.file.filename;
  data.tanggal = moment().format('D MMMM YYYY');

  try {
    const pdfPath = await generateCard(data);
    res.download(pdfPath, () => {
      fs.unlinkSync(pdfPath); // hapus file setelah dikirim
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal membuat kartu PDF");
  }
});

// Jalankan server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server jalan di http://0.0.0.0:${port}`);
});