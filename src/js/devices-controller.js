import {
  iframePreview,
  state,
  btnDevices,
  responsiveOptions,
  btnMobile,
} from "./global-variables.js";

function changeSize() {
  if (!iframePreview.classList.contains("mobile")) return;
  const mobile = document.querySelector(".mobile");
  mobile.classList.remove("small", "medium", "large");

  if (state.valueResponsivo == 400) {
    mobile.classList.add("small");
  } else if (state.valueResponsivo == 500) {
    mobile.classList.add("medium");
  } else {
    mobile.classList.add("large");
  }
}

btnDevices.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnDevices.forEach((item) => {
      item.classList.remove("active");
    });
    responsiveOptions.classList.remove("active");
    btn.classList.toggle("active");

    if (iframePreview.classList.contains("mobile")) {
      const mobile = document.querySelector(".mobile");
      mobile.classList.remove("small", "medium", "large");
      iframePreview.classList.remove("mobile");
    } else {
      return;
    }
  });
});

btnMobile.addEventListener("click", () => {
  responsiveOptions.classList.add("active");
  iframePreview.classList.add("mobile");
  changeSize();
});

responsiveOptions.addEventListener("change", (e) => {
  state.valueResponsivo = e.target.value;
  changeSize();
});

changeSize();
