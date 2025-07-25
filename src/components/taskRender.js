export function createTaskCard(task) {
  return `
    <div class="task" data-task-id="${task.uuid}">
      <div 
        class="tick checkbox ${returnActiveState(task.state.done)}">
      </div>
      <div class="task-info ${returnActiveState(task.state.done)}">
        <input type="text" id="taskEdit" class="hidden">
        <div class="name">${task.taskName}</div>
        <div class="due-date">
          ${returnTaskDate(task)}
        </div>
      </div>
      <div class="importance ${returnActiveState(task.state.important)}"></div>
      <button class="save btn hidden">Save</button>
      <div class="task-actions">
        <button class="edit btn"></button>
        <button class="delete btn"></buttons>
      </div>
    </div>
  `;
}

function returnActiveState(state) {
  if (state === true) {
    return "checked";
  } else {
    return "";
  }
}

function returnTaskDate(task) {
  if (task.date !== "") {
    return `<i class="fa-regular fa-calendar fa-sm"></i>&nbsp;${task.date}`;
  } else {
    return task.date;
  }
}

export function renderEmptyTask() {
  return `
    <div class="all-done">
      <img src="styles/images/all-done.png">
      <h2>Sit back and relax</h2>
      <p>No more tasks pending</p>
    </div>
  `;
}

export function createSidebarContent(selectedTask) {
  return `
      <div class="pseudo-info">
        <div class="pseudo-name">
          <div class="tick checkbox ${returnActiveState(selectedTask.state.done)}"></div>
          <h3 class="${returnActiveState(selectedTask.state.done)}">${selectedTask.taskName}</h3>
        </div>

        <div class="detailed-action">
          <p>Due date</p>
          <input type="date" value="${selectedTask.date}" id="dateEdit">
        </div>

        <div class="detailed-action">
          <p>Description</p>
          <textarea class="task-description">${selectedTask.description}</textarea>
        </div>
      </div>
    `;
}
