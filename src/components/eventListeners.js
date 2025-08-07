import {
  handleTaskClick,
  handleSelection,
  hideSidebar,
  deleteFromSidebar,
  saveTaskInfo,
  startDescriptionEditing,
} from "../app/taskList.js";

export function appendGlobalEventListeners() {
  const window = document.querySelector(".main-window");
  const sidebar = window.querySelector(".info-sidebar");

  if (window) {
    window.addEventListener("click", (e) => {
      const selectedTasks = document.querySelectorAll(".task.select");
      const task = e.target.closest(".task");

      if (task) handleTaskClick(e, task);
      if (selectedTasks) handleSelection(e, selectedTasks);
    });
  }

  if (sidebar) {
    sidebar.addEventListener("click", (e) => {
      const { taskId } = sidebar.dataset;
      const closeBtn = e.target.closest(".close.btn");
      const deleteBtn = e.target.closest(".delete.btn");
      const saveInfoBtn = e.target.closest(".save.btn");

      if (closeBtn) hideSidebar();
      if (deleteBtn) deleteFromSidebar(taskId);
      if (saveInfoBtn) saveTaskInfo(taskId, saveInfoBtn);
    });

    sidebar.addEventListener("input", (e) => {
      const taskInfo = e.target.closest(".task-description");
      
      if (taskInfo) startDescriptionEditing(e, sidebar);
    });
  }
}
