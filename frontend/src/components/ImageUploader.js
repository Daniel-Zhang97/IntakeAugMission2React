import React, { useState } from "react";
import axios from "axios";
import carsData from "./cars.json"; // Import your JSON data

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarCar, setSimilarCar] = useState(null);

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

      console.log("API Response:", response.data);

      const topPrediction = response.data.response.predictions[0];

      // Find the first similar car based on the top prediction
      const similarCar = carsData.carsList.find(
        (car) => car.model.toLowerCase() === topPrediction.tagName.toLowerCase()
      );

      console.log("Found Similar Car:", similarCar);

      // Update the similarCar state with the found similar car
      setSimilarCar(similarCar);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>

      {similarCar && (
        <div>
          <h2>Similar Car</h2>
          <div>
            <h3>
              {similarCar.brand} {similarCar.model}
            </h3>
            <p>Year: {similarCar.year}</p>
            <p>Color: {similarCar.color}</p>
            <img
              src={similarCar.imageURL}
              alt={`${similarCar.brand} ${similarCar.model}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
