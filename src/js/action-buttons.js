import { btnCopy, state } from "./global-variables.js";

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
