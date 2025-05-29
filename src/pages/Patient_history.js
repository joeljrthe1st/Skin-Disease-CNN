
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext"; // Use the Auth context
import { fetchPredictionHistory } from "../firebase/firebaseutilities"; // Import the function to fetch history

function PatientDetails() {
  const { currentUser } = useAuth(); // Get the current user from the context (matching the structure from Account.js)
  const [history, setHistory] = useState([]); // State to store prediction history
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(""); // Error state in case of any issues fetching data

  useEffect(() => {
    const getHistory = async () => {
      try {
        if (!currentUser) {
          console.log("User is not logged in");
          setError("You must be logged in to view history.");
          setLoading(false);
          return;
        }

        console.log("Fetching history for user:", currentUser.uid);

        const predictions = await fetchPredictionHistory(currentUser.uid); // Fetch history for the logged-in user
        console.log("Fetched predictions:", predictions);

        if (predictions && predictions.length > 0) {
          setHistory(predictions);
        } else {
          console.log("No predictions found.");
          setError("No predictions found.");
        }
      } catch (err) {
        setError("Failed to load prediction history.");
        console.error("Error fetching prediction history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.uid) {
      console.log("User is logged in. Starting history fetch...");
      getHistory(); // Fetch history when the user is logged in
    } else {
      console.log("No user logged in.");
      setLoading(false); // No need to load if no user is logged in
    }
  }, [currentUser]); // Re-run the effect whenever the user changes

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>📜 Patient Details</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>📜 Patient Details</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>📜 Patient Details</h1>
        <p>Saved Patient details</p>

        {history.length === 0 ? (
          <p>No predictions found.</p>
        ) : (
          <ul>
            {history.map((prediction, index) => (
              <li key={index} className="prediction-item">
                <div className="prediction">
                <p><strong>Patient Details</strong></p>
                


                {prediction.patientInfo ? (
                  <ul>
                    {Object.entries(prediction.patientInfo).map(([cls, score], i) => (
                      <li key={i}>
                        {cls}: {score}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No saved patient details for this result </p>
                )}

                  <p>{prediction.predictedClass}</p>
                 

                  <span>{new Date(prediction.timestamp.seconds * 1000).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PatientDetails;
