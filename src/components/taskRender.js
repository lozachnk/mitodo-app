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
  const checkBox = el("div", { classList: "tick checkbox" });
  const name = el("div", { classList: "name", textContent: task.taskName });
  const dueDate = el("div", { classList: "due-date", textContent: task.date });
  const star = el("div", { classList: "importance" });

  const taskInfo = el("div", {
    classList: "task-info",
    childNodes: [name, dueDate],
  });

  const taskEl = el("div", {
    classList: "task",
    dataset: { taskId: task.uuid },
    childNodes: [checkBox, taskInfo, star],
  });

  return taskEl;
}

function el(
  tag,
  { classList, textContent, dataset = {}, childNodes = [] } = {}
) {
  const element = document.createElement(tag);
  if (classList) element.className = classList;
  if (textContent) element.textContent = textContent;

  for (const key in dataset) {
    element.dataset[key] = dataset[key];
  }

  for (const el of childNodes) {
    element.appendChild(el);
  }

  return element;
}
