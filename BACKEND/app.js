const express = require('express');
const path = require('path');
const multer = require('multer');
const predictionRoutes = require('./routes/predictionRoutes');
const cors = require('cors');
const upload=require('./middlewares/multerConfig.js')

// Initialize Express app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

// Prediction route
app.use('/api/predict', upload.single('image'), predictionRoutes); // Image is sent via form-data with key 'image'

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
