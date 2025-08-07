import { tasksData, updateState } from "../data/tasks.js";

const sidebarEl = document.querySelector('.info-sidebar');
const taskName = sidebarEl.querySelector('h3');
const checkbox = sidebarEl.querySelector('.tick.checkbox');
const datePickerUI = sidebarEl.querySelector('#dateEdit');
const taskInfo = sidebarEl.querySelector('.task-description');

export function reflectSidebarContent(taskId) {
  const task = tasksData.find(t => t.uuid === taskId);

  if (task) {
    sidebarEl.dataset.taskId = task.uuid;
    taskName.textContent = task.taskName;
    datePickerUI.value = task.date;
    taskInfo.value = task.description;

    updateState(task, checkbox, taskName);
  }
}
