import { createTaskCard, renderEmptyTask } from "../components/taskRender.js";
import { startDeleteListeners } from "../components/eventListeners.js";

export let tasksData;

const taskInput = document.querySelector(".task-input");
const tasksPanel = document.querySelector(".tasks-pane");

loadFromStorage();

function loadFromStorage() {
  tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];
  renderTasks();
}

function saveToStorage() {
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

export function renderTasks() {
  if (!tasksData.length) {
    tasksPanel.innerHTML = renderEmptyTask();
    tasksPanel.classList.add('empty');
  } else {
    tasksPanel.classList.remove('empty');
    tasksPanel.innerHTML = tasksData
      .map((task) => createTaskCard(task))
      .join("");

    startDeleteListeners();
  }
}

export function addTask() {
  const uuid = crypto.randomUUID();
  let taskName = taskInput.value;
  let date = document.getElementById("task-date");

  if (taskName !== "") {
    tasksData.push({
      uuid,
      taskName,
      date: date.value,
      done: false,
    });

    taskInput.value = "";
    date.value = "";
  }

  renderTasks();
  saveToStorage();
}

export function completeTask(taskId) {
  const selectedTask = tasksData.find((task) => task.uuid === taskId);
  console.log(selectedTask);
  
  if (selectedTask) {
    selectedTask.done = (selectedTask.done === true ? false : true);

    renderTasks();
    saveToStorage();
  }
}

export function removeTask(taskId) {
  tasksData = tasksData.filter((task) => task.uuid !== taskId);
  renderTasks();
  saveToStorage();
}
