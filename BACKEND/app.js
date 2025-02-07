const express = require('express');
const path = require('path');
const multer = require('multer');
const predictionRoutes = require('./routes/predictionRoutes');
const cors = require('cors');


// Initialize Express app
const app = express();
app.use(cors());

// Set up file upload using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Destination folder for images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename as current timestamp
    },
});

const upload = multer({ storage: storage });

// Middlewares
app.use(express.json());

// Prediction route
app.use('/api/predict', upload.single('image'), predictionRoutes); // Image is sent via form-data with key 'image'

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
