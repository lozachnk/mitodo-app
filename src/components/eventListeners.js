import {
  editTask,
  removeTask,
  renderSidebarContent,
  toggleTaskState,
} from "../data/tasks.js";

export function appendGlobalEventListeners() {
  const window = document.querySelector('.main-window');
  let isSidebarOpen = false;

  window.addEventListener('click', (e) => {
    const task = e.target.closest('.task');
    const closeBtn = e.target.closest(".close.btn");

    if (task) {
      const { taskId } = task.dataset;

      if (e.target.closest(".tick.checkbox")) {
        toggleTaskState(taskId, "done");
      } else if (e.target.closest(".importance")) {
        toggleTaskState(taskId, "important");
      } else if (e.target.closest(".delete.btn")) {
        removeTask(taskId);
      } else if (e.target.closest(".edit.btn")) {
        editTask(task, taskId);
      } else {
        isSidebarOpen = true;
        showTaskInfo(isSidebarOpen);
        renderSidebarContent(taskId);
      }
    }

    if (closeBtn) {
      isSidebarOpen = false;
      showTaskInfo(isSidebarOpen); 
    }
  });
}

function showTaskInfo(isSidebarOpen) {
  const sidebar = document.querySelector('.info-sidebar');
  const taskPane = document.querySelector('.task-content');

  sidebar.classList.toggle('opened', isSidebarOpen);
  taskPane.classList.toggle('shifted', isSidebarOpen);
}