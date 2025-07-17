import { removeTask } from "../data/tasks.js";

export function startDeleteListeners() {
  const completeBtn = document.querySelectorAll(".tick.checkbox");

  completeBtn.forEach((btn) => {
    const { taskId } = btn.dataset;
    btn.addEventListener("click", () => {
      removeTask(taskId);
    });
  });
}