import {
  btnCopy,
  originIcon,
  checkIcon,
  btnRefresh,
  previewReloading,
  refreshIcon,
  iframePreview,
  state,
} from "./global-variables.js";

import { lastResult } from "./request-ia.js";

function showSucess() {
  btnCopy.disabled = true;
  btnCopy.classList.add("copied");

  setTimeout(() => {
    btnCopy.innerHTML = originIcon;
    btnCopy.disabled = false;
    btnCopy.classList.remove("copied");
  }, 2000);
}

btnCopy.addEventListener("click", async () => {
  if (state.isCopying) return;
  try {
    state.isCopying = true;
    const text = codeOutput.textContent.trim() || "";

    await navigator.clipboard.writeText(text);
    showSucess();
  } catch (e) {
    console.log("Erro ao copiar");
  } finally {
    state.isCopying = false;
  }
});

btnRefresh.addEventListener("click", () => {
  iframePreview.srcdoc = "";
  btnRefresh.classList.add("reloading");
  btnRefresh.innerHTML = `${refreshIcon} Recarregando`;
  previewReloading.classList.add("active");

  setTimeout(() => {
    previewReloading.classList.remove("active");
    btnRefresh.classList.remove("reloading");
    btnRefresh.innerHTML = `${refreshIcon} Recarregar`;
    iframePreview.srcdoc = lastResult;
  }, 2000);
});
