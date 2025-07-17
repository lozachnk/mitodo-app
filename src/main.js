import { renderEmptyTask } from "./components/taskRender.js";
import { addTask, tasksData } from "./data/tasks.js";

const taskInput = document.querySelector(".task-input");
const addTaskBtn = document.querySelector(".send.checkbox");
const navTabs = document.querySelectorAll('.tab');

addTaskBtn.addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

navTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    navTabs.forEach(t => t.classList.remove('selected'));
    tab.classList.add('selected');
  });
});


