import { completeTask, removeTask } from "../data/tasks.js";

export function startDeleteListeners() {
  document.querySelectorAll('.task').forEach(task => {
    const tickBox = task.querySelector('.tick.checkbox');
    const { taskId } = tickBox.dataset;

    task.addEventListener('click', (e) => {
      if (e.target.closest('.tick.checkbox')) {
        completeTask(taskId);
      } else if (e.target.closest('.delete-btn')) {
        removeTask(taskId);
      }
    })
  });
}