import {
  removeTask,
  toggleTaskState,
  updateSidebarContents,
} from "../data/tasks.js";

export function appendGlobalEventListeners() {
  const window = document.querySelector(".main-window");
  let isSidebarOpen = false;
  let isSelectionMode = true;

  window.addEventListener("click", (e) => {
    const selectedTasks = document.querySelectorAll(".task.select");

    const task = e.target.closest(".task");
    const sidebar = e.target.closest(".info-sidebar");

    const deleteSlct = e.target.closest("#deleteSelected");
    const starSlct = e.target.closest('#importantAll');
    const tickSlct = e.target.closest('#completeAll');

    if (tickSlct) {
      selectedTasks.forEach((selectedTask) => {
        const { taskId } = selectedTask.dataset;
        toggleTaskState(taskId, "done");
      })
    }

    if(starSlct) {
      console.log('Hi!');
      selectedTasks.forEach((selectedTask) => {
        const { taskId } = selectedTask.dataset;
        toggleTaskState(taskId, "important");
      })
    }

    if (deleteSlct) {
      console.log("Deleted!");
      selectedTasks.forEach((selectedTask) => {
        const { taskId } = selectedTask.dataset;

        removeTask(taskId);
        selectedTask.remove();
      });
    }

    if (!e.ctrlKey) {
      document.querySelectorAll(".task").forEach((task) => {
        task.classList.toggle("select", e.ctrlKey);
      });

      isSelectionMode = true;
      document.querySelector('.window-actions').classList.toggle('hidden', isSelectionMode);
    }

    if (task) {
      const { taskId } = task.dataset;

      if (e.target.closest(".tick.checkbox")) {
        toggleTaskState(taskId, "done");
      } else if (e.target.closest(".importance")) {
        toggleTaskState(taskId, "important");
      } else {
        if (!e.ctrlKey) {
          isSidebarOpen = true;
          showTaskInfo(isSidebarOpen);
          updateSidebarContents(taskId);
        } else {
          isSidebarOpen = false;
          showTaskInfo(isSidebarOpen);

          isSelectionMode = false;
          document.querySelector('.window-actions').classList.toggle('hidden', isSelectionMode);
          if (!task.classList.contains("select")) {
            task.classList.toggle("select", e.ctrlKey);
          } else {
            task.classList.toggle("select");
          }
        }
      }
    }

    if (sidebar) {
      const sideBar = window.querySelector(".info-shelf");
      const { taskId } = sideBar.dataset;

      if (e.target.closest(".close.btn")) {
        isSidebarOpen = false;
        showTaskInfo(isSidebarOpen);
      } else if (e.target.closest(".delete.btn")) {
        isSidebarOpen = false;
        showTaskInfo(isSidebarOpen);
        removeTask(taskId);
      }
    }
  });
}

function showTaskInfo(isSidebarOpen) {
  const sidebar = document.querySelector(".info-sidebar");
  const taskPane = document.querySelector(".task-content");

  sidebar.classList.toggle("opened", isSidebarOpen);
  taskPane.classList.toggle("shifted", isSidebarOpen);
}
