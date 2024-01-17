// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

function validateEmail(email) {
    const expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expression.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function Login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validateEmail(email) == false || validatePassword(password) == false) {
        alert("Email or Password is incorrect");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            var databaseRef = ref(database);
            var userData = {
                lastLogin: Date.now()
            };

            update(ref(database, 'users/' + user.uid), userData)
                .then(() => {
                    alert('User Logged In!');
                })
                .catch((error) => {
                    alert(error.message);
                });
        })
        .catch((error) => {
            alert(error.message);
        });
}

function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const databaseRef = ref(database);
            const userData = {
                lastLogin: Date.now(),
            };

            update(ref(database, 'users/' + user.uid), userData)
                .then(() => {
                    alert('User Logged In with Google!');
                })
                .catch((error) => {
                    alert(error.message);
                });
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Explicitly attach Login function to the window object
window.Login = Login;
document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting in the default way
    // Login(); // Call your Register function to handle the form submission
});

document.getElementById('google-login-btn').addEventListener('click', function (e) {
    e.preventDefault();
    signInWithGoogle();
});
