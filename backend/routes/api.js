const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/upload", async (req, res) => {
  try {
    const image = req.file.buffer; // Access the image buffer
    const apiUrl =
      "https://carsdetectionmission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/1067534d-d945-445d-85f0-7b51f426a851/detect/iterations/Iteration1/image";
    const predictionKey = "7a33a72e7db246c496900082f1406132";

    const response = await axios.post(apiUrl, image, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Prediction-Key": predictionKey,
      },
    });

    res.json({ response: response.data });
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
