const textarea = document.querySelector(".textarea");
const btnSend = document.querySelector(".btn-send");

const suggestions = document.querySelectorAll(".suggestion-chip");

const btnTabs = document.querySelectorAll(".btn-tab");
const tabContents = document.querySelectorAll(".tab-content");

const dotGlow = document.querySelector(".dot-glow");

const currentYear = document.getElementById("currentYear");

let mouseX = 0;
let mouseY = 0;
let distanceDotGlowX = 0;
let distanceDotGlowY = 0;

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
  distanceDotGlowX += (mouseX - distanceDotGlowX) * 0.1;
  distanceDotGlowY += (mouseY - distanceDotGlowY) * 0.1;

  dotGlow.style.transform = `translate(${distanceDotGlowX}px, ${distanceDotGlowY}px) translate(-50%, -45%)`;

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

animationMoveMouse();
currentYear.innerHTML = new Date().getFullYear();
