
import React, { useState } from "react";
import "../App.css"; // Make sure CSS is accessible
import { FaUserPlus, FaUserMinus, FaUpload } from "react-icons/fa";
import { savePredictionForUser } from "../firebase/firebaseutilities";
import { useAuth } from "../contexts/authContext";

const patientRecords = [];

function SkinDiseaseDetector() {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [result, setResult] = useState(null);
  const [patientInfo, setPatientInfo] = useState({ name: "", age: "", gender: "" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);



  const { currentUser } = useAuth(); // This gives you the logged-in user


  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get only the first file
    setImages([file]); // Store as single image array
    setPreview([URL.createObjectURL(file)]);
  };
  

  const handlePatientInfoChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    if (images.length === 0) return alert("Please select an image first!");
  
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", images[0]);

       try {
      const response = await fetch("https://1bd0-34-53-60-101.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
        // headers: {
        //   'ngrok-skip-browser-warning': 'any',                  
        // }

      });
  
      const data = await response.json();
      console.log(data);
      
      setResult(data);
  
      // 🔥 Save prediction to Firestore if user is logged in
      if (currentUser) {
        await savePredictionForUser(currentUser.uid, {
          // predictedClass: data.predicted_class,
          // confidenceScores: data.confidence_scores,
          predictedClass: data.predicted_label,
          confidenceScores: data.all_confidences,
          imageName: images[0]?.name || null,
          patientInfo: showPatientForm ? patientInfo : null,
        });
      }
  
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="card">
          <h1>🧬 Detect</h1>

          {/* Toggle Button for Patient Info */}
          <button
  onClick={() => setShowPatientForm(!showPatientForm)}
  className="upload-btn toggle-btn"
>
  {showPatientForm ? (
    <>
      <FaUserMinus /> Hide Patient Info
    </>
  ) : (
    <>
      <FaUserPlus /> Add Patient Info
    </>
  )}
</button>

          {/* Patient Form (Conditional) */}
          {showPatientForm && (
            <div className="patient-info">
              <h2>Patient Information</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={patientInfo.name}
                onChange={handlePatientInfoChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={patientInfo.age}
                onChange={handlePatientInfoChange}
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={patientInfo.gender}
                onChange={handlePatientInfoChange}
              />
            </div>
          )}
<label htmlFor="image-upload" className="icon-upload-only" title="Choose Image">
  <FaUpload size={24} />
</label>
<input
  id="image-upload"
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="file-input-hidden"
/>
          <button onClick={handleSubmit} className="upload-btn" disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : `Analyze Image${images.length > 1 ? "s" : ""}`}
          </button>

          <div className="preview-container">
            {preview.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} />
            ))}
          </div>


{result && (
  <div className="result-container">
    <h3>Prediction Results:</h3>
    <p><strong>Predicted Class:</strong> {result.predicted_label}</p>
    {result.all_confidences && (
      <>
        <h4>Confidence Scores:</h4>
        <ul>
          {Object.entries(result.all_confidences).map(([cls, score], i) => (
            <li key={i}>
              {cls}: {(score * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
)}


          {isAnalyzing && <div className="loading-spinner">🔄 Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default SkinDiseaseDetector;
