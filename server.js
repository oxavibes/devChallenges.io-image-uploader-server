const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = 5000;
const UPLOAD_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

app.use(express.json());
app.use(express.static(UPLOAD_DIR));
app.use(cors());

//Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(UPLOAD_DIR));
app.use(cors());

app.post("/api/v1/images", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: `file ${req.file.filename} has saved on the server`,
    url: `http://localhost:${PORT}/${req.file.originalname}`,
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
