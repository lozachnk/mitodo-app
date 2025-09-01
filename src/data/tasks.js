import { createTaskEl, renderEmptyTask } from "../components/taskRender.js";

export let tasksData;

const taskInput = document.querySelector(".task-input");
const tasksPanel = document.querySelector(".tasks-pane");

loadFromStorage();

export function renderTasks() {
  if (!tasksData.length) {
    tasksPanel.innerHTML = renderEmptyTask();
    tasksPanel.classList.add('empty');
  } else {
    tasksData.map((task) =>{ 
      tasksPanel.append(createTaskEl(task));
      reflectTaskState(task.uuid);
    });
  }
}

export function addTask() {
  if (!tasksData.length) {
    tasksPanel.classList.remove('empty');
    tasksPanel.innerHTML = '';
  }

  const uuid = crypto.randomUUID();
  let taskName = taskInput.value;
  let date = document.getElementById("task-date");

  if (taskName !== "") {
    const newTask = {
      uuid,
      taskName,
      date: date.value,
      description: '',
      steps: [],
      state: {
        done: false,
        important: false,
      },
    }

    tasksData = [...tasksData, newTask];
    
    const taskEl = createTaskEl(newTask);
    tasksPanel.append(taskEl);

    taskInput.value = "";
    date.value = "";

    saveToStorage();
  }
}

export function editTaskInfo(taskId) {
  const taskInfo = document.querySelector('.task-description');

  tasksData = tasksData.map(task => {
    if (task.uuid === taskId) {
      return {
        ...task,
        description: taskInfo.value,
      }
    }
    return task;
  });

  saveToStorage();
}

export function editTaskName(taskId) {
  const newName = document.getElementById('nameEdit');

  tasksData = tasksData.map(task => {
    if (task.uuid === taskId) {
      return {
        ...task,
        taskName: newName.value,
      }
    }
    return task;
  });

  saveToStorage();
}

export function toggleTaskState(taskId, property) {  
  tasksData = tasksData.map(task => {
    if (task.uuid === taskId) {
      return {
        ...task,
        state: {
          ...task.state,
          [property]: !task.state[property],
        },
      }
    }
    return task;
  });
  saveToStorage();
  reflectTaskState(taskId);
}

export function removeTask(taskId) {
  tasksData = tasksData.filter((task) => task.uuid !== taskId);
  document.querySelector(`.task[data-task-id="${taskId}"]`).remove();
  saveToStorage();

  if (!tasksData.length) {
    renderTasks();
  }
}

export function updateState(task, taskEl, checkbox, taskName, star) {
  if (checkbox) checkbox.classList.toggle('checked', task.state.done);
  if (taskName) taskName.classList.toggle('checked', task.state.done);
  if (star) {
    star.classList.toggle('checked', task.state.important);

    if (task.state.important) {
      tasksPanel.insertBefore(taskEl, tasksPanel.firstElementChild);
    }
  }
}

function reflectTaskState(taskId) {
  tasksData.forEach(task => {
    if (task.uuid === taskId) {
      const taskEl = document.querySelector(`.task[data-task-id="${taskId}"]`);
      const checkBox = taskEl.querySelector('.tick.checkbox');
      const taskInfo = taskEl.querySelector('.task-info');
      const star = taskEl.querySelector('.importance');

      updateState(task, taskEl, checkBox, taskInfo, star);
    }
  });
}

function loadFromStorage() {
  tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];
  renderTasks();
}

function saveToStorage() {
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
}