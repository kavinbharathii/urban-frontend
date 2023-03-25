import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// realtime
import { getDatabase , ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVc3pP4-XoZeXAX_L1FTlBqgJAPAaXzH4",
  authDomain: "new-urban-5cf38.firebaseapp.com",
  databaseURL: "https://new-urban-5cf38-default-rtdb.firebaseio.com",
  projectId: "new-urban-5cf38",
  storageBucket: "new-urban-5cf38.appspot.com",
  messagingSenderId: "431110991205",
  appId: "1:431110991205:web:960a86c9edc27995eb858c",
  measurementId: "G-TYHNYEVRFR"
};

// firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)

// Realtime database
export const db_rt = getDatabase(app);
export const dbref_rt = ref(getDatabase());