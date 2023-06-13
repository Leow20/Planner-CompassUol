import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXdTru2iAfW6Lb9OiSdFc7kFC35Q_sU04",
  authDomain: "planner-d8fce.firebaseapp.com",
  projectId: "planner-d8fce",
  storageBucket: "planner-d8fce.appspot.com",
  messagingSenderId: "416633973294",
  appId: "1:416633973294:web:304ab7e3cec97046930dbf",
  measurementId: "G-1XC8JHCFH8",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
