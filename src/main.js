import { appendGlobalEventListeners } from "./components/eventListeners.js";

appendGlobalEventListeners();

const navTabs = document.querySelectorAll(".tab");
navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    navTabs.forEach((t) => t.classList.remove("selected"));
    tab.classList.add("selected");
  });
});
