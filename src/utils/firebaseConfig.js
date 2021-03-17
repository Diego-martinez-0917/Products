import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD76aqEJDH47SvaaW50m8YOkrtvrXywaAI",
  authDomain: "app-test-e4886.firebaseapp.com",
  projectId: "app-test-e4886",
  storageBucket: "app-test-e4886.appspot.com",
  messagingSenderId: "134718650528",
  appId: "1:134718650528:web:c92583e82658ab957971c5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
