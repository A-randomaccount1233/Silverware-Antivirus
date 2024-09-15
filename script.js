// Handle "Scan Now" button click (assuming a demo for Chrome)
document.getElementById('scanNowBtn')?.addEventListener('click', function() {
    alert('This is a demo. The real scan feature is available in our Android app.');
});

// Handle form submission on the main page
document.getElementById('contactUsForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Generate a unique ID for this submission
    const submissionId = Date.now();

    // Store submission in local storage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push({ id: submissionId, name, email, message, response: "" });
    localStorage.setItem('submissions', JSON.stringify(submissions));

    alert('Thank you for your message. We will get back to you soon.');

    // Optionally, clear the form fields
    document.getElementById('contactUsForm').reset();
});

// Admin credentials
const adminUsername = 'A_randomaccount1233';
const adminPassword = 'pacmanfever';

// Handle login form submission for admin
document.getElementById('adminLoginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        window.location.href = 'admin-dashboard.html'; // Redirect to dashboard
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password.';
    }
});

// Handle logout button for admin dashboard
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to home page
});

// Load submissions in admin dashboard
window.addEventListener('DOMContentLoaded', function() {
    const submissionsContainer = document.getElementById('submissionsContainer');
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    // Render submissions
    submissions.forEach(submission => {
        const submissionElement = document.createElement('div');
        submissionElement.className = 'submission';
        submissionElement.innerHTML = `
            <h3>${submission.name} (${submission.email})</h3>
            <p>${submission.message}</p>
            <textarea class="admin-response" placeholder="Write a response...">${submission.response}</textarea>
            <button class="respond-btn" data-id="${submission.id}">Send Response</button>
        `;
        submissionsContainer.appendChild(submissionElement);
    });

    // Handle response button click
    submissionsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('respond-btn')) {
            const id = event.target.getAttribute('data-id');
            const responseTextarea = event.target.previousElementSibling;
            const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
            const submission = submissions.find(sub => sub.id == id);
            if (submission) {
                submission.response = responseTextarea.value;
                localStorage.setItem('submissions', JSON.stringify(submissions));
                alert('Response sent!');
            }
        }
    });
});

// Handle support page for users
document.getElementById('supportPage')?.addEventListener('DOMContentLoaded', function() {
    const userEmail = 'user@example.com'; // This should be dynamically determined based on the logged-in user
    const submissionsContainer = document.getElementById('userSubmissionsContainer');
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    // Filter and render user-specific submissions
    submissions.filter(submission => submission.email === userEmail).forEach(submission => {
        const submissionElement = document.createElement('div');
        submissionElement.className = 'submission';
        submissionElement.innerHTML = `
            <h3>${submission.name} (${submission.email})</h3>
            <p>${submission.message}</p>
            <p><strong>Response:</strong> ${submission.response}</p>
        `;
        submissionsContainer.appendChild(submissionElement);
    });
});
