import { codeOutput } from "./request-ia.js";

export const btnCopy = document.querySelector(".btn-copy");
const originIcon = `<i class="fa-regular fa-copy"></i> Copiar`;
const checkIcon = `<i class="fa-solid fa-check"></i> Copiado`;

let isCopying = false;

export const btnRefresh = document.querySelector(".btn-refresh");

function showSucess() {
  btnCopy.innerHTML = checkIcon;
  btnCopy.disabled = true;
  btnCopy.classList.add("copied");

  setTimeout(() => {
    btnCopy.innerHTML = originIcon;
    btnCopy.disabled = false;
    btnCopy.classList.remove("copied");
  }, 2000);
}

btnCopy.addEventListener("click", async () => {
  if (isCopying) return;
  try {
    isCopying = true;
    const text = codeOutput.textContent.trim() || "";

    await navigator.clipboard.writeText(text);
    showSucess();
  } catch (e) {
    console.log("Erro ao copiar");
  } finally {
    isCopying = false;
  }
});
