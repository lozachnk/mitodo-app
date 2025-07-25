import { createSidebarContent, createTaskCard, renderEmptyTask } from "../components/taskRender.js";

export let tasksData;

const taskInput = document.querySelector(".task-input");
const tasksPanel = document.querySelector(".tasks-pane");
const infoShelf = document.querySelector('.info-shelf');

loadFromStorage();

export function renderTasks() {
  if (!tasksData.length) {
    tasksPanel.innerHTML = renderEmptyTask();
    tasksPanel.classList.add('empty');
  } else {
    tasksPanel.classList.remove('empty');

    tasksData.sort((a, b) => b.state.important - a.state.important);
    tasksPanel.innerHTML = tasksData
      .map((task) => createTaskCard(task))
      .join("");
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
      description: '',
      steps: [],
      state: {
        done: false,
        important: false,
      },
    });

    taskInput.value = "";
    date.value = "";
  }
  renderAndSave();
}

export function toggleTaskState(taskId, property) {
  const selectedTask = tasksData.find((task) => task.uuid === taskId);
  if (selectedTask) {
    selectedTask.state[property] = !selectedTask?.state?.[property];
    renderSidebarContent(selectedTask.uuid);
    renderAndSave();
  }
}

export function removeTask(taskId) {
  tasksData = tasksData.filter((task) => task.uuid !== taskId);
  renderAndSave();
}

export function editTask(task, taskId) {
  const taskName = task.querySelector('.name');
  const editName = task.querySelector('#taskEdit');
  const saveBtn = task.querySelector('.save.btn');
  const taskActions = task.querySelector('.task-actions');
  const selectedTask = tasksData.find((t) =>  t.uuid === taskId);
  let isEditing = false;

  if (selectedTask) {
    isEditing = true;
    isEditingMode();
    editName.focus();

    editName.style.setProperty('width', `${taskName.offsetWidth}px`);
    editName.value = selectedTask.taskName;

    saveBtn.addEventListener('click', () => {
      saveName();
    });

    editName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveName()});

    function saveName() {
      isEditing = false;
      if (editName.value !== "") selectedTask.taskName = editName.value;
      
      isEditingMode();
      renderAndSave();
      renderSidebarContent(selectedTask.uuid);
    }

    function isEditingMode() {
      if (isEditing) {
        taskName.classList.add('hidden');
        taskActions.classList.add('hidden');
        editName.classList.remove('hidden');
        saveBtn.classList.remove('hidden');
      } else {
        taskName.classList.remove('hidden');
        taskActions.classList.remove('hidden');
        editName.classList.add('hidden');
        saveBtn.classList.add('hidden');
      }
    }
  }
}

export function renderSidebarContent(taskId) {
  const selectedTask = tasksData.find(task => task.uuid === taskId);
  infoShelf.innerHTML = createSidebarContent(selectedTask);

  
}

function loadFromStorage() {
  tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];
  renderTasks();
}

function saveToStorage() {
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

function renderAndSave() {
  renderTasks();
  saveToStorage();  
}