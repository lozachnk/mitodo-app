export function createTaskCard(task) {
  return `
    <div class="task">
      <div>
        <div 
          class="tick checkbox" 
          data-task-id="${task.uuid}">
        </div>
      </div>
      <div class="name">${task.taskName}</div>
      <div class="due-date">${task.date}</div>
    </div>
  `
}

export function renderEmptyTask() {
  return `
    <div class="all-done">
      <img src="styles/images/all-done.png">
      <h2>Sit back and relax!</h2>
      <p>No more tasks pending.</p>
    </div>
  `;
}