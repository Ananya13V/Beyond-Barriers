// navbar.js

function updateNavbar(auth) {
    auth.onAuthStateChanged((user) => {
        const loginElement = document.querySelector('.nav-link-login');
        const profileElement = document.querySelector('.nav-link-profile');

        if (user) {
            // User is logged in
            if (loginElement) loginElement.style.display = 'none';
            if (profileElement) profileElement.style.display = 'block';
        } else {
            // User is not logged in
            if (loginElement) loginElement.style.display = 'block';
            if (profileElement) profileElement.style.display = 'none';
        }
    });
}

export { updateNavbar };
