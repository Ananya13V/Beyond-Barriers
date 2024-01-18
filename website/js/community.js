import { auth } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function () {
        // Redirect to login.html
        window.location.href = 'login.html';
    });
});

const updateUI = (user) => {
  const interactionSection = document.getElementById('interaction-section');
  const loginPrompt = document.getElementById('login-prompt');

  if (user) {
    interactionSection.style.display = 'flex';
  } else {
    loginPrompt.style.display = 'flex';
  }
};

auth.onAuthStateChanged((user) => {
  updateUI(user);
});
