import {
  btnCopy,
  btnRefresh,
  btnSend,
  codeOutput,
  previewPlaceholder,
  btnDevices,
  btnDesktop,
  textarea,
  iframePreview,
  btnTab,
  btnSuggestions,
} from "./global-variables.js";

import { showMessage } from "./message.js";

btnCopy.disabled = true;
btnRefresh.disabled = true;
btnDevices.forEach((btn) => {
  btn.disabled = true;
});
export let lastResult;

async function generateCode() {
  const userPrompt = textarea.value.trim();

  if (!userPrompt) return;

  try {
    btnSend.classList.add("loading");
    btnSend.disabled = true;
    btnSuggestions.forEach((btn) => {
      btn.disabled = true;
    });

    const response = await fetch("https://generate-site-ia.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: userPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na API");
    }

    const data = await response.json();

    const result = data.result;

    lastResult = result;

    codeOutput.textContent = result;
    iframePreview.srcdoc = result;

    btnSuggestions.forEach((btn) => {
      btn.disabled = false;
    });

    btnCopy.classList.add("active");
    btnCopy.disabled = false;

    btnRefresh.classList.add("active");
    btnRefresh.disabled = false;

    btnDevices.forEach((btn) => {
      btn.classList.add("unlocked");
      btn.disabled = false;
    });
    btnDesktop.classList.add("active");

    previewPlaceholder.classList.remove("active");

    btnTab.scrollIntoView({
      block: "start",
    });
  } catch (e) {
    console.log("Erro:", e);
    showMessage("Erro:", "Erro ao gerar código.");
  } finally {
    btnSend.classList.remove("loading");
    btnSend.disabled = false;
  }
}

btnSend.addEventListener("click", generateCode);
