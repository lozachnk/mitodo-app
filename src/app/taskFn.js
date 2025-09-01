import {
  addTask,
  editTaskInfo,
  editTaskName,
  removeTask,
  tasksData,
  toggleTaskState,
} from "../data/tasks.js";
import { reflectSidebarContent } from "./sidebar.js";

const windowActions = document.querySelector(".window-actions");
let isSidebar = false;
let actionsIsHidden = true;

export function handleTaskClick(e, task) {
  const editInput = document.getElementById('nameEdit');
  const taskName = document.getElementById('taskName');
  const editBtn = document.querySelector('.edit.btn');
  const checkbox = e.target.closest(".tick.checkbox");
  const star = e.target.closest(".importance");
  const { taskId } = task.dataset;

  if (checkbox) toggleTaskState(taskId, "done");
  if (star) toggleTaskState(taskId, "important");

  if (!checkbox && !star) {
    if (!e.ctrlKey) {
      showSidebar(taskId);
      
      // TO DO: Make into function
      editInput.value = '';
      editInput.style.opacity = 0;
      taskName.style.opacity = 1;
      editBtn.classList.remove('edit-mode');
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
  saveInfoBtn.classList.add("hidden");
  editTaskInfo(taskId);
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

export function startNameEditing(taskId, editBtn) {
  if (editBtn.classList.contains('edit-mode')) return;
  editBtn.classList.add('edit-mode');

  const editInput = document.getElementById('nameEdit');
  const taskName = document.getElementById('taskName');
  const selectedTask = tasksData.find(t => t.uuid === taskId);

  editInput.focus();
  
  editInput.style.opacity = 1;
  editInput.value = selectedTask.taskName;
  editInput.style.height = `${taskName.offsetHeight}px`;

  taskName.style.opacity = 0;
}

export function saveTaskName(taskId, editBtn) {
  const editInput = document.getElementById('nameEdit');
  const taskName = document.getElementById('taskName');
  const taskNode = document.querySelector(`.task[data-task-id="${taskId}"]`);
  const infoContainer = document.querySelector('.info-shelf__task-info');

  editTaskName(taskId);

  taskName.textContent = editInput.value;
  taskNode.querySelector('.name').textContent = editInput.value;
  infoContainer.style.height = 'auto';
  taskName.style.opacity = 1;
  editInput.style.opacity = 0;

  editBtn.classList.remove('edit-mode');
}

export function resizeNameEl(nameEdit) {
  const infoContainer = document.querySelector('.info-shelf__task-info');

  nameEdit.style.height = 'auto';
  nameEdit.style.height = nameEdit.scrollHeight + 'px';

  infoContainer.style.height = 'auto';
  infoContainer.style.height = (nameEdit.scrollHeight + 22) + 'px';
}

export function addTaskOnEnter(e) {
  if (e.key === 'Enter') addTask();
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


