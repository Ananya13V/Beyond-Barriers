import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDVlmoEksVMg3zpu1t7Ar1M6XIYDfe60LM",
    authDomain: "beyond-barriers-269b7.firebaseapp.com",
    projectId: "beyond-barriers-269b7",
    storageBucket: "beyond-barriers-269b7.appspot.com",
    messagingSenderId: "926977430580",
    appId: "1:926977430580:web:9da03c01283e1213d66661"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };