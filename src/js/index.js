const textarea = document.querySelector(".textarea");
const btnSend = document.querySelector(".btn-send");

const suggestions = document.querySelectorAll(".suggestion-chip");

const btnTabs = document.querySelectorAll(".btn-tab");
const tabContents = document.querySelectorAll(".tab-content");

const dot = document.querySelector(".dot-glow");
let mouseX = 0;
let mouseY = 0;

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

function animationMoveMouse() {
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";

  requestAnimationFrame(animationMoveMouse);
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

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animationMoveMouse();

btnTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentTab = btn.getAttribute("data-tab");

    btnTabs.forEach((item) => {
      item.classList.remove("active");
    });

    btn.classList.add("active");

    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    const targetTab = document.querySelector(
      `.tab-content[data-tab="${currentTab}"]`,
    );

    targetTab.style.display = "flex";
  });
});
