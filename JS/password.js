document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the page from reloading.

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message");

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with the entered email
    const user = users.find(user => user.email === email);

    if (!user) {
        message.textContent = "Email not found. Please check and try again.";
        return;
    }

    // Simulate sending a reset link (can be replaced with server functionality)
    message.style.color = "green";
    message.textContent = "A reset link has been sent to your email. Please check your inbox.";
    
    // Mock password reset (for demonstration purposes)
    setTimeout(() => {
        const newPassword = prompt("Enter your new password:");
        if (newPassword) {
            user.password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = '../HTML/login.html'; // Redirect to login page.
        }
    }, 2000);
});
