const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/upload", async (req, res) => {
  try {
    const image = req.file.buffer; // Access the image buffer
    const apiUrl =
      "https://customcarvisionmrhq-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/0710a460-649f-495d-bb56-6a0aa84657a8/classify/iterations/Iteration6/image";
    const predictionKey = "8cc122f8a0284cc8b8dbc330cd63e03e";

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
