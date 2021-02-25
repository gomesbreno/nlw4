import { useEffect } from "react";
import firebase from "firebase";

import { ChallengesProvider } from "../contexts/ChalengesContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  if (firebase.apps.length === 0) {
    const firebaseConfig = {
      apiKey: "AIzaSyB5cKB5Vik_nOBTlC_Sxr271rbqp-SQMwI",
      authDomain: "moveit-83795.firebaseapp.com",
      projectId: "moveit-83795",
      storageBucket: "moveit-83795.appspot.com",
      messagingSenderId: "866604224933",
      appId: "1:866604224933:web:359525ace34abbd724d84c",
      measurementId: "G-Z9HYELZRGC",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
