import { textarea, btnSend, btnSuggestions } from "./global-variables.js";

function autoResizeAndBtnBlocked() {
  textarea.style.height = "auto";

  const scrollHeight = textarea.scrollHeight;

  textarea.style.height = `${scrollHeight}px`;

  const isEmply = textarea.value.trim().length === 0;

  btnSend.disabled = isEmply;
  btnSend.classList.toggle("blocked", isEmply);
}

btnSend.classList.add("blocked");
textarea.addEventListener("input", () => {
  autoResizeAndBtnBlocked();
});

btnSuggestions.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      textarea.value = "";
    } else {
      btnSuggestions.forEach((item) => {
        item.classList.remove("active");
      });

      btn.classList.add("active");
      const promptChip = btn.getAttribute("data-prompt");
      textarea.value = promptChip;
    }
    autoResizeAndBtnBlocked();
  });
});
