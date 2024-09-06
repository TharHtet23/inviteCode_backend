document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inviteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inviteCode = document.getElementById('inviteCode').value;

    try {
      const response = await fetch('/api/inviteCode/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode })
      });

      if (response.ok) {
        alert('Invite code used successfully!');
        window.location.href = 'dashboard.html';
      } else {
        const errorData = await response.json();
        document.getElementById('inviteError').innerText = errorData.msg || 'Failed to use invite code!';
      }
    } catch (error) {
      document.getElementById('inviteError').innerText = 'An error occurred. Please try again.';
    }
  });
});