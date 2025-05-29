import React from "react";

function About() {
  return (
    <div className="app-container">
      <div className="card">
        <h1>📜 About the Skin Disease Detector</h1>

        <p>
          The <strong>Skin Disease Detector</strong> is a cross-platform AI-powered application designed to assist in the early identification of common skin conditions using image-based deep learning models.
          It is available both as a web application and a mobile app, making it accessible to users wherever they are.
        </p>

        <p>
          Users can upload a photo of a skin lesion or abnormality through their device’s camera or gallery. The app then analyzes the image using a deep learning model trained on thousands of dermatological images and returns a prediction of the most likely skin condition.
        </p>

        <h2>📱 Mobile + Web Access</h2>
        <p>
          The detector is fully responsive and optimized for mobile use. In addition, a dedicated mobile app version is available, providing native features such as camera integration, offline support (optional), and smoother performance on mobile devices.
        </p>

        <h2>🔍 Key Features</h2>
        <ul>
          <li>Real-time image-based disease prediction</li>
          <li>Compatible with both web browsers and mobile devices</li>
          <li>Simple and intuitive UI for quick use in clinical or personal settings</li>
          <li>Optional patient information storage for follow-up or offline review</li>
        </ul>

        <h2>🧠 Powered by Deep Learning</h2>
        <p>
          The backend is powered by a convolutional neural network (CNN) architecture, such as ResNet or EfficientNet, trained on diverse datasets covering multiple skin diseases.
        </p>

        <h2>⚠️ Disclaimer</h2>
<p>
  This tool is intended for informational and educational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical concerns.
</p>
<p>
  Please note that this application is still under active development. We're continually working on improving prediction accuracy, expanding disease coverage, enhancing user experience, and optimizing performance on both web and mobile platforms. Feedback and suggestions are welcome!
</p>
      </div>
    </div>
  );
}

export default About;
