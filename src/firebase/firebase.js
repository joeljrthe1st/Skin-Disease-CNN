import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1M5tnAUT93OTaKS4V_2q3PKB0UjFHrvY",
  authDomain: "skin-disease-cnn-cc0fd.firebaseapp.com",
  projectId: "skin-disease-cnn-cc0fd",
  storageBucket: "skin-disease-cnn-cc0fd.firebasestorage.app",
  messagingSenderId: "339675372024",
  appId: "1:339675372024:web:6dae74aa45174ea2291e0d",
  measurementId: "G-NF30DR10QD"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth,db,storage,firebaseConfig };
