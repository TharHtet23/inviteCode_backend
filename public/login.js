document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        window.location.href = 'dashboard.html';
      } else {
        const errorData = await response.json();
        document.getElementById('loginError').innerText = errorData.message || 'Login failed!';
      }
    } catch (error) {
      document.getElementById('loginError').innerText = 'An error occurred. Please try again.';
    }
  });
});