// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqt50Gyy1dyT_embOSFssJ3m2MyB44zjQ",
  authDomain: "barkbuddyz-83fb5.firebaseapp.com",
  projectId: "barkbuddyz-83fb5",
  storageBucket: "barkbuddyz-83fb5.appspot.com",
  messagingSenderId: "451336686579",
  appId: "1:451336686579:web:80dcfe71c61f1efe9be086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;