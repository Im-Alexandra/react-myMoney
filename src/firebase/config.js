import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCznvZTp5i1OWNBXJuZ7M-_PFbBRPjVX10",
  authDomain: "mymoney-66e16.firebaseapp.com",
  projectId: "mymoney-66e16",
  storageBucket: "mymoney-66e16.appspot.com",
  messagingSenderId: "618954215854",
  appId: "1:618954215854:web:2050b26fe9bf5dfa32f83f",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
