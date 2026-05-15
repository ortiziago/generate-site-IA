const textarea = document.querySelector(".textarea");
const btnSend = document.querySelector(".btn-send");

const suggestions = document.querySelectorAll(".suggestion-chip");

const btnTab = document.querySelectorAll(".btn-tab");

function autoResizeAndBtnBlocked() {
  textarea.style.height = "auto";

  const styleTextarea = getComputedStyle(textarea);
  const heightTextArea = styleTextarea.height;
  const lineHeightTextarea = styleTextarea.lineHeight;

  const heightScrollTextarea = textarea.scrollHeight;

  textarea.style.height = heightScrollTextarea + "px";

  if (textarea.value.length === 0) {
    btnSend.classList.add("blocked");
  } else {
    btnSend.classList.remove("blocked");
  }
}

btnSend.classList.add("blocked");
textarea.addEventListener("input", () => {
  autoResizeAndBtnBlocked();
});

suggestions.forEach((chip) => {
  chip.addEventListener("click", () => {
    const promptChip = chip.getAttribute("data-prompt");
    textarea.value = promptChip;
    autoResizeAndBtnBlocked();
  });
});

btnTab.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnTab.forEach((item) => {
      item.classList.remove("active");
    });

    btn.classList.add("active");
  });
});
