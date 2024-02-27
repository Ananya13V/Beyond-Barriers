import { auth } from './firebase.js';

function Logout() {
    auth.signOut().then(() => {
        alert('User logged out successfully!');
        window.location.href = 'index.html';
    }).catch((error) => {
        alert('Error during logout:', error);
    });
}

window.Logout = Logout;