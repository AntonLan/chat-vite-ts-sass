import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8XjafkPb54SPvmrKDkIkQgg4VhQTFSEg",
    authDomain: "chat-23fe7.firebaseapp.com",
    projectId: "chat-23fe7",
    storageBucket: "chat-23fe7.appspot.com",
    messagingSenderId: "704383907667",
    appId: "1:704383907667:web:0ce5a5a7da395c49ba13a6"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore()