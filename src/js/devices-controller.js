import {
  iframePreview,
  state,
  btnDevice,
  responsiveOptions,
  btnMobile,
} from "./global-variables.js";

function changeSize() {
  if (iframePreview.classList.contains("mobile")) {
    const mobile = document.querySelector(".mobile");
    mobile.classList.remove("small", "medium", "large");

    if (state.valueResponsivo === 400) {
      mobile.classList.add("small");
    } else if (state.valueResponsivo == 500) {
      mobile.classList.add("medium");
    } else {
      mobile.classList.add("large");
    }
  } else {
    return;
  }
}

btnDevice.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnDevice.forEach((item) => {
      item.classList.remove("active");
    });
    responsiveOptions.classList.remove("active");
    btn.classList.toggle("active");
  });
});

btnMobile.addEventListener("click", () => {
  responsiveOptions.classList.add("active");
  iframePreview.classList.add("mobile");
});

changeSize();
