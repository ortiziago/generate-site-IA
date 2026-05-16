const btnTabs = document.querySelectorAll(".btn-tab");
const tabContents = document.querySelectorAll(".tab-content");

btnTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentTab = btn.dataset.tab;

    btnTabs.forEach((item) => {
      item.classList.remove("active");
    });

    btn.classList.add("active");

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    const targetTab = document.querySelector(
      `.tab-content[data-tab="${currentTab}"]`,
    );

    if (targetTab) {
      targetTab.classList.add("active");
    }
  });
});
