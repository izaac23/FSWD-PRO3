document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload.

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the matching user
    const user = users.find(user => user.username === username);

    if (!user) {
        errorMessage.textContent = "User not found. Please sign up.";
        return;
    }

    console.log("User found:", user);

    if (user.blocked) {
        errorMessage.textContent = "This account is blocked due to multiple failed login attempts.";
        return;
    }

    // Check the password
    if (user.password !== password) {
        user.failedAttempts = (user.failedAttempts || 0) + 1;

        if (user.failedAttempts === 2) {
            errorMessage.textContent = "Incorrect password. Last attempt before the account is blocked.";
        } else if (user.failedAttempts >= 3) {
            user.blocked = true;
            errorMessage.textContent = "This account is blocked after 3 failed login attempts.";
        } else {
            const attemptsLeft = 3 - user.failedAttempts;
            errorMessage.textContent = `Incorrect password. Attempts remaining: ${attemptsLeft}`;
        }

        // Update the user in localStorage
        const updatedUsers = users.map(u => (u.username === username ? user : u));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return;
    }

    // Reset failed attempts after successful login
    user.failedAttempts = 0;

    // Update the user in localStorage
    const updatedUsers = users.map(u => (u.username === username ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Successful login
    errorMessage.textContent = ""; // Clear any error message
    console.log("Login successful for user:", user);

    // Redirect after successful login
    window.location.href = '/HTML/homePage.html'; // Replace with your post-login page.
});
