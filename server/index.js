import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

// Configure multer for video upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not a video file!'), false);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Upload endpoint
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }
  res.json({ 
    message: 'Video uploaded successfully',
    file: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`
    }
  });
});

// Get videos endpoint
app.get('/videos', (req, res) => {
  const uploadDir = join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    return res.json({ videos: [] });
  }

  const files = fs.readdirSync(uploadDir)
    .filter(file => file.match(/\.(mp4|webm|ogg)$/))
    .map(file => ({
      id: file.split('-')[0],
      filename: file,
      url: `/uploads/${file}`,
      title: file.split('-').slice(1).join('-').replace(/\.[^/.]+$/, ""),
      author: "Local User",
      views: Math.floor(Math.random() * 1000) + " views"
    }));

  res.json({ videos: files });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});