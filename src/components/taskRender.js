export function renderEmptyTask() {
  return `
    <div class="all-done">
      <img src="styles/images/all-done.png">
      <h2>Sit back and relax</h2>
      <p>No more tasks pending</p>
    </div>
  `;
}

export function createTaskEl(task) {
  const taskEl = el('div', 'task', null, { taskId: task.uuid });
  const checkBox = el('div', 'tick checkbox');
  const taskInfo = el('div', 'task-info');
  const name = el('div', 'name', task.taskName);
  const dueDate = el('div', 'due-date', task.date);
  const star = el('div', 'importance');

  taskInfo.append(name, dueDate);
  taskEl.append(checkBox, taskInfo, star);

  return taskEl;
}

function el(tag, classList, textContent, dataset = {}) {
  const element = document.createElement(tag);
  if (classList) element.className = classList;
  if (textContent) element.textContent = textContent;

  for (const key in dataset) {
    element.dataset[key] = dataset[key];
  }

  return element;
}