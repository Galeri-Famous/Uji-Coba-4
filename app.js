const express = require('express');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const { generateCard } = require('./generateCard');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate', upload.single('foto'), async (req, res) => {
  const data = req.body;
  data.foto = req.file.filename;
  data.tanggal = moment().format('D MMMM YYYY');

  const pdfPath = await generateCard(data);
  res.download(pdfPath);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server jalan di http://0.0.0.0:${port}`);
});
