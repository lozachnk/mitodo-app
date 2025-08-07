import {
  editTaskInfo,
  removeTask,
  tasksData,
  toggleTaskState,
} from "../data/tasks.js";
import { reflectSidebarContent } from "./sidebar.js";

const windowActions = document.querySelector(".window-actions");
let isSidebar = false;
let actionsIsHidden = true;

export function handleTaskClick(e, task) {
  const checkbox = e.target.closest(".tick.checkbox");
  const star = e.target.closest(".importance");
  const { taskId } = task.dataset;

  if (checkbox) toggleTaskState(taskId, "done");
  if (star) toggleTaskState(taskId, "important");

  if (!checkbox && !star) {
    if (!e.ctrlKey) {
      showSidebar(taskId);
    } else {
      selectTasks(e, task);
    }
  }
}

export function handleSelection(e, selectedTasks) {
  const deleteSlct = e.target.closest("#deleteSelected");
  const starSlct = e.target.closest("#importantAll");
  const tickSlct = e.target.closest("#completeAll");

  if (tickSlct) bulkAction(selectedTasks, "done");
  if (starSlct) bulkAction(selectedTasks, "important");
  if (deleteSlct) bulkAction(selectedTasks, "delete");

  if (!e.ctrlKey) {
    selectedTasks.forEach((task) => task.classList.toggle("select", e.ctrlKey));
    hideActions();
  }
}

export function saveTaskInfo(taskId, saveInfoBtn) {
  editTaskInfo(taskId);
  saveInfoBtn.classList.add("hidden");
}

export function hideSidebar() {
  isSidebar = false;
  showTaskInfo(isSidebar);
}

export function startDescriptionEditing(e, sidebar) {
  const saveInfoBtn = document.getElementById("saveInfo");

  const { taskId } = sidebar.dataset;
  const task = tasksData.find((t) => t.uuid === taskId);
  saveInfoBtn.classList.toggle("hidden", task.description === e.target.value);
}

function bulkAction(tasks, action) {
  tasks.forEach((task) => {
    const { taskId } = task.dataset;

    switch (action) {
      case "done":
      case "important":
        toggleTaskState(taskId, action);
        break;
      case "delete":
        removeTask(taskId);
        task.remove();
        break;
    }
  });
}

function showTaskInfo(isSidebar) {
  const sidebar = document.querySelector(".info-sidebar");
  const taskPane = document.querySelector(".task-content");

  sidebar.classList.toggle("opened", isSidebar);
  taskPane.classList.toggle("shifted", isSidebar);
}

function showSidebar(taskId) {
  isSidebar = true;
  showTaskInfo(isSidebar);
  reflectSidebarContent(taskId);
}

function hideActions() {
  actionsIsHidden = true;
  windowActions.classList.toggle("hidden", actionsIsHidden);
}

function showActions() {
  actionsIsHidden = false;
  windowActions.classList.toggle("hidden", actionsIsHidden);
}

export function deleteFromSidebar(taskId) {
  hideSidebar();
  removeTask(taskId);
}

function selectTasks(e, task) {
  hideSidebar();
  showActions();

  task.classList.toggle("select");
}
