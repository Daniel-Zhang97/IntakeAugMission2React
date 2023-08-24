import React, { useState } from "react";
import axios from "axios";
import carsData from "./cars.json";

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

      const aiPredictions = response.data.response.predictions;
      const targetTags = aiPredictions.map((prediction) =>
        prediction.tagName.toLowerCase()
      );

      // console.log('top prediction:', response.data.response.predictions[0])
      let similarCars = [];
      // Find the first similar car based on the top prediction
      for (let i = 0; i < Math.min(3, targetTags.length); i++) {
        const filteredCars = carsData.carsList.filter(
          (car) => car.model.toLowerCase() === targetTags[i]
        );

        if (filteredCars.length > 0 && similarCars.length < 3) {
          for (const car of filteredCars) {
            similarCars.push(car);
          }
        }
      }

      console.log("Found Similar Car:", similarCars);

      // Update the similarCar state with the found similar car
      setSimilarCar(similarCars);
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
          <h2>Similar Cars</h2>
          {similarCar.map((car, index) => (
            <div key={index}>
              <h3>
                {car.brand} {car.model}
              </h3>
              <p>Year: {car.year}</p>
              <p>Color: {car.color}</p>
              <img src={car.imageURL} alt={`${car.brand} ${car.model}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
