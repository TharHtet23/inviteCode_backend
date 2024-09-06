async function fetchUserInfo() {
  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      document.getElementById('inviteCode').innerText = data.result.inviteCode;
      document.getElementById('inviteCount').innerText = data.result.inviteCount;
    } else {
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    window.location.href = 'login.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });

  fetchUserInfo();
});