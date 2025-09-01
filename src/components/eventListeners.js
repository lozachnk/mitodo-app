import * as taskFn from "../app/taskFn.js";
import { addTask } from "../data/tasks.js";

export function appendGlobalEventListeners() {
  const mainWindow = document.querySelector(".main-window");
  const sidebar = mainWindow.querySelector(".info-sidebar");

  if (mainWindow) {
    mainWindow.addEventListener("click", (e) => {
      const selectedTasks = document.querySelectorAll(".task.select");
      const task = e.target.closest(".task");
      const addBtn = e.target.closest('.send.checkbox');

      if (addBtn) addTask();
      if (task) taskFn.handleTaskClick(e, task);
      if (selectedTasks) taskFn.handleSelection(e, selectedTasks);
    });

    mainWindow.addEventListener('keydown', (e) => {
      const taskInput = e.target.closest('.task-input');
      if (taskInput) taskFn.addTaskOnEnter(e);
    })
  }

  if (sidebar) {
    sidebar.addEventListener("click", (e) => {
      const { taskId } = sidebar.dataset;
      const closeBtn = e.target.closest(".close.btn");
      const editBtn = e.target.closest(".edit.btn");
      const saveNameBtn = e.target.closest('.edit.btn.edit-mode');
      const deleteBtn = e.target.closest(".delete.btn");
      const saveInfoBtn = e.target.closest(".save.btn");

      if (closeBtn) taskFn.hideSidebar();
      if (deleteBtn) taskFn.deleteFromSidebar(taskId);
      if (saveInfoBtn) taskFn.saveTaskInfo(taskId, saveInfoBtn);
      if (editBtn) taskFn.startNameEditing(taskId, editBtn);
      if (saveNameBtn) taskFn.saveTaskName(taskId, editBtn);
    });

    sidebar.addEventListener("input", (e) => {
      const taskInfo = e.target.closest(".task-description");
      const nameEdit = e.target.closest('.edit-field');
      
      if (taskInfo) taskFn.startDescriptionEditing(e, sidebar);
      if (nameEdit) taskFn.resizeNameEl(nameEdit); 
    });
  }
}
