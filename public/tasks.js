document.addEventListener('DOMContentLoaded', async () => {
  const verifyButton = document.getElementById('verifyTasks');
  const taskList = document.getElementById('taskList');
  const pointsValue = document.getElementById('pointsValue');

  let totalPoints = 0;

  const tasks = [
    { id: 'youtube', points: 50 },
    { id: 'twitter', points: 30 },
    { id: 'discord', points: 20 },
  ];

  // Check if tasks are already completed
  try {
    const response = await fetch('/api/checkTasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.completed) {
        taskList.innerHTML = '<p class="alert alert-success">You have completed all tasks. Enjoy full access!</p>';
        verifyButton.style.display = 'none';
        pointsValue.textContent = data.totalPoints || tasks.reduce((sum, task) => sum + task.points, 0);
        return;
      }
      // Update points if some tasks are already completed
      totalPoints = data.totalPoints || 0;
      pointsValue.textContent = totalPoints;
    }
  } catch (error) {
    console.error('Error checking tasks:', error);
  }

  // If tasks are not completed, add event listener for verification
  verifyButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/verifyTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.verified) {
          taskList.innerHTML = '<p class="alert alert-success">All tasks completed successfully! You now have full access.</p>';
          verifyButton.style.display = 'none';
          totalPoints = data.totalPoints || tasks.reduce((sum, task) => sum + task.points, 0);
          pointsValue.textContent = totalPoints;
        } else {
          // Update completed tasks and points
          data.completedTasks.forEach(taskId => {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskElement) {
              taskElement.classList.add('text-muted');
              const task = tasks.find(t => t.id === taskId);
              if (task) {
                totalPoints += task.points;
              }
            }
          });
          pointsValue.textContent = totalPoints;
          alert('Some tasks are not completed. Please complete all tasks to gain full access.');
        }
      } else {
        throw new Error('Failed to verify tasks');
      }
    } catch (error) {
      console.error('Error verifying tasks:', error);
      alert('An error occurred while verifying tasks. Please try again.');
    }
  });
});