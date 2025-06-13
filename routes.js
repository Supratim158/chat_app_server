const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure ./uploads folder exists relative to the main project directory
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

// POST route to upload image
router.route("/addimage").post(upload.single("img"), (req, res) => {
    try {
        res.json({ path: req.file.filename });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router;
