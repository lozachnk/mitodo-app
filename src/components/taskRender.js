export function createTaskCard(task) {
  return `
    <div class="task">
      <div 
        class="tick checkbox ${returnCheckedState(task)}" 
        data-task-id="${task.uuid}">
      </div>
      <div class="task-info ${returnCheckedState(task)}">
        <div class="name">${task.taskName}</div>
        <div class="due-date">
          ${returnTaskDate(task)}
        </div>
      </div>
      <div class="delete-btn">
        <i class="fa fa-trash fa-sm"></i>
      </div>
    </div>
  `;
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

function returnCheckedState(task) {
  if (task.done === true) {
    return "checked";
  } else {
    return "";
  }
}

function returnTaskDate(task) {
  if (task.date !== '') {
    return `<i class="fa-regular fa-calendar fa-sm"></i>&nbsp;${task.date}`;
  } else {
    return task.date;
  }
}
