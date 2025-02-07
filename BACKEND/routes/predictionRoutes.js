const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const router = express.Router();

// Prediction function
const predict = (req, res) => {
  console.log("Request received for prediction...");
  const imagePath = req.file.path.replace(/\\/g, '/'); // Ensure consistent path formatting
  const modelPath = path.resolve('models/combinedata_model.h5'); // Use absolute path

  console.log("Image Path:", imagePath);
  console.log("Model Path:", modelPath);

  // Spawn a new Python process
  const pythonProcess = spawn('python', [
    path.join(__dirname, '../scripts/predict.py'), // Path to your Python script
    imagePath,  // Image path passed as argument
    modelPath   // Model path passed as argument
  ]);

  let pythonOutput = ''; // To collect Python stdout

  // Listen for data output from Python script
  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString(); // Collect stdout data
  });

  // Listen for error output from Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  // Listen for the process to exit
  pythonProcess.on('close', (code) => {
    console.log(`Python script finished with exit code: ${code}`);

    if (code === 0) {
      const outputLines = pythonOutput
        .split("\n")
        .map(line => line.trim())  // Trim each line
        .filter(line => line !== ''); // Remove empty lines

      console.log("Filtered output:", outputLines);

      if (outputLines.length >= 2) {
        const predictedClass = outputLines[outputLines.length - 2]; // Prediction class
        const confidence = outputLines[outputLines.length - 1]; // Confidence

        return res.json({
          prediction: predictedClass === '1' ? 'Abnormal' : 'Normal', // Map class to label
          confidence: `${confidence}%`,  // Append percentage
        });
      } else {
        return res.status(500).json({ error: "Error in Python script output" });
      }
    } else {
      return res.status(500).json({ error: "Error executing Python script" });
    }
  });

  pythonProcess.on('error', (err) => {
    console.error("Error starting Python process:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  });
};

// Define routes
router.post('/', predict);

module.exports = router;
