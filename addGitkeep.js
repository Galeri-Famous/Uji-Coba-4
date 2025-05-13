const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
const gitkeepPath = path.join(uploadsDir, '.gitkeep');

// Buat folder uploads jika belum ada
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Folder "uploads/" dibuat.');
} else {
  console.log('ℹ️ Folder "uploads/" sudah ada.');
}

// Tambahkan file .gitkeep
fs.writeFileSync(gitkeepPath, '');
console.log('✅ File ".gitkeep" ditambahkan di folder uploads/');
