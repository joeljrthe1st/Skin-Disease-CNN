import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext"; // Use the Auth context
import { fetchPredictionHistory,deletePredictionHistory } from "../firebase/firebaseutilities"; // Import the function to fetch history
import { doc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  FaHome,
  FaUserInjured,
  FaHistory,
  FaUserCircle,
  FaUser,
  FaInfo,
  FaTrash,
  FaRemoveFormat,
} from "react-icons/fa";

function History() {
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
          <h1>📜 Prediction History</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>📜 Prediction History</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>📜 Prediction History</h1>

        <button onClick={async () => {
  if (currentUser) {
    await deletePredictionHistory(currentUser.uid);
    setHistory([]); // Update UI after deletion
  }
}} style={{ marginBottom: '1rem' }}>
  🗑️ Clear All History
</button>
<FaRemoveFormat/>

        {history.length === 0 ? (
          <p>No predictions found.</p>
        ) : (
          <ul>
            {history.map((prediction, index) => (
              <li key={index} className="prediction-item">
                <div className="prediction">
                  {/* <p><strong>Prediction ID:</strong> {prediction.id}</p> */}
                  <p><strong>Predicted Class:</strong> {prediction.predictedClass}</p>
                  <p>Confidence Scores:</p>
                  {prediction.confidenceScores ? (
  <ul>
    {Object.entries(prediction.confidenceScores).map(([cls, score], i) => (
      <li key={i}>
        {cls}: {(score * 100).toFixed(1)}%
      </li>
    ))}
  </ul>
) : (
  <p>No confidence scores available.</p>
)}

                  <p>{new Date(prediction.timestamp.seconds * 1000).toLocaleString()}</p>
                  

<FaTrash onClick={async () => {
  try {
    await deleteDoc(doc(db, "users", currentUser.uid, "predictions", prediction.id));
    setHistory(history.filter(item => item.id !== prediction.id)); // Remove from state
  } catch (error) {
    console.error("Failed to delete prediction:", error);
  }
}} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}/>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
