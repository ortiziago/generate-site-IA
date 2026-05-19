import {
  message,
  messageClose,
  messageTitle,
  messageDescription,
  messageProgress,
  state,
} from "./global-variables.js";

export function showMessage(title, description) {
  messageClose.addEventListener("click", () => {
    message.classList.remove("active");
  });

  messageTitle.textContent = title;
  messageDescription.textContent = description;

  message.classList.add("active");

  messageProgress.classList.remove("animate");
  void messageProgress.offsetWidth;
  messageProgress.classList.add("animate");

  clearTimeout(state.timeout);

  timeout = setTimeout(() => {
    message.classList.remove("active");
  }, 5000);
}
