// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SkinDiseaseDetector from "./pages/Skin";
// import PatientDetails from "./pages/Patient_history";
// import History from "./pages/History";
// import Header from "./components/Header";
// import About from "./pages/About";
// import Login from "./components/Auth/Login";


// function App() {
//   return (
//     <Router>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<SkinDiseaseDetector/>} />
//         <Route path="/patient-details" element={<PatientDetails/>} />
//         <Route path="/history" element={<History />} />
//         <Route path="/about" element={<About/>} />
//         <Route path="/login" element={<Login/>} />
      
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SkinDiseaseDetector from "./pages/Skin";
import PatientDetails from "./pages/Patient_history";
import History from "./pages/History";
import About from "./pages/About";

import Header from "./components/Header";
import Login from "./components/Auth/Login";

import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./contexts/authContext/Private";
import Account from "./pages/Account";
import Register from "./components/Auth/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              
                <SkinDiseaseDetector />
             
            }
          />
          <Route
            path="/patient-details"
            element={
              <PrivateRoute>
                <PatientDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
