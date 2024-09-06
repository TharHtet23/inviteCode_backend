async function checkAuthStatus() {
  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      window.location.href = 'dashboard.html';
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
  }
}