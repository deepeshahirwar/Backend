import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: "mernblog-4aede.firebaseapp.com",
  projectId: "mernblog-4aede",
  storageBucket: "mernblog-4aede.firebasestorage.app",
  messagingSenderId: "1079506168526",
  appId: "1:1079506168526:web:6889ee7fc26366300c7e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const auth = getAuth(app)
const provider = new GoogleAuthProvider() 

export {auth, provider}