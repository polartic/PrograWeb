// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRLQtIDODCf12J-1glZKBOhHsrSRjnmnY",
    authDomain: "progra-web-74d66.firebaseapp.com",
    projectId: "progra-web-74d66",
    storageBucket: "progra-web-74d66.firebasestorage.app",
    messagingSenderId: "285067663648",
    appId: "1:285067663648:web:40e00edfe6e4d313e99f45",
    measurementId: "G-T659NY5LJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);