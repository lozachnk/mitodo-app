import { editTask, removeTask, toggleTaskState } from "../data/tasks.js";

export function appendEventListeners() {
  document.querySelectorAll('.task').forEach(task => {
    const { taskId } = task.dataset;

    task.querySelector('.name').addEventListener('dblclick', () => {
      editTask(task, taskId);
    });

    task.addEventListener('click', (e) => {
      if (e.target.closest('.tick.checkbox')) {
        toggleTaskState(taskId, "done");
      } else if (e.target.closest('.importance')) {
        toggleTaskState(taskId, "important")
      } else if (e.target.closest('.delete.btn')) {
        removeTask(taskId); 
      } else if (e.target.closest('.edit.btn')) {
        editTask(task, taskId);
      }
    });
  });
}