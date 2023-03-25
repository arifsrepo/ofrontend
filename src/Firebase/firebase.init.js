import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseinit = () => {
    initializeApp(firebaseConfig);
}

export default firebaseinit;