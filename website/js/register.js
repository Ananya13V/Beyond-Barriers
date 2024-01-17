import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

window.onload = function () {
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

    function Register() {
        // Retrieve form input values when the form is submitted
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const phoneNum = document.getElementById('phone_no').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_pw').value;

        if (validatePhoneNum(phoneNum) == false) {
            alert('Incorrect phone number format');
        }
        if (validateEmail(email) == false) {
            alert('Incorrect email has been entered');
        }
        if (validatePassword(password) == false) {
            alert('Incorrect password format');
        }
        if (validateConfirmPassword(password, confirmPassword) == false) {
            alert('The passwords are not matching');
        }

        // Create a user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store user data in the database
                const databaseRef = ref(database);
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNum: phoneNum,
                    email: email,
                    lastLoggedIn : Date.now()
                };

                set(ref(database, 'users/' + user.uid), userData)
                    .then(() => {
                        alert('User Created');
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    function validatePhoneNum(phoneNum) {
        const expression = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return expression.test(phoneNum);
    }

    function validateEmail(email) {
        const expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return expression.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validateConfirmPassword(password, confirmPassword) {
        return password == confirmPassword;
    }

    window.Register = Register;
    document.querySelector('.form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting in the default way// Call your Register function to handle the form submission
    });
};
