document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      document.getElementById('signupError').innerText = 'Passwords do not match!';
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      if (response.ok) {
        window.location.href = 'invite.html';
      } else {
        const errorData = await response.json();
        document.getElementById('signupError').innerText = errorData.message || 'Signup failed!';
      }
    } catch (error) {
      document.getElementById('signupError').innerText = 'An error occurred. Please try again.';
    }
  });
});