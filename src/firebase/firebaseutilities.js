import { db } from "./firebase";
import { doc, setDoc, collection, addDoc, serverTimestamp,query,getDocs, orderBy,deleteDoc} from "firebase/firestore";

// Save a prediction under the current user's "predictions" subcollection
export const savePredictionForUser = async (userId, predictionData) => {
  if (!userId || !predictionData) return;

  try {
    const predictionRef = collection(db, "users", userId, "predictions");

    await addDoc(predictionRef, {
      ...predictionData,
      timestamp: serverTimestamp(),
    });

    console.log("Prediction saved to Firestore");
  } catch (error) {
    console.error("Error saving prediction:", error);
  }
};



export const fetchPredictionHistory = async (uid) => {
    try {
      const predictionsRef = collection(db, "users", uid, "predictions"); // Reference to predictions collection of the user
      const q = query(predictionsRef, orderBy("timestamp", "desc")); // Order by timestamp
  
      const snapshot = await getDocs(q);
      const predictions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return predictions;
    } catch (error) {
      console.error("Error fetching prediction history:", error);
      return [];
    }
  };



  export const deletePredictionHistory = async (userId) => {
    if (!userId) return;
  
    try {
      const predictionsRef = collection(db, "users", userId, "predictions");
      const snapshot = await getDocs(predictionsRef);
  
      const deletePromises = snapshot.docs.map((predictionDoc) =>
        deleteDoc(doc(db, "users", userId, "predictions", predictionDoc.id))
      );
  
      await Promise.all(deletePromises);
      console.log("All predictions deleted successfully");
    } catch (error) {
      console.error("Error deleting prediction history:", error);
    }
  };