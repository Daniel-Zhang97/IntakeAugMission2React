import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        console.log("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      // Update the predictions state with the top 3 predictions
      setPredictions(response.data.response.predictions.slice(0, 3));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>

      <h2>Top 3 Predictions</h2>
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>
            Class: {prediction.tagName}, Confidence:{" "}
            {prediction.probability.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUploader;
