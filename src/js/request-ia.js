import {
  btnCopy,
  btnRefresh,
  btnSend,
  codeOutput,
  previewPlaceholder,
  btnDevice,
  textarea,
  iframePreview,
  btnTab,
} from "./global-variables.js";

btnCopy.disabled = true;
btnRefresh.disabled = true;
export let lastResult;

async function generateCode() {
  const userPrompt = textarea.value.trim();

  if (!userPrompt) return;

  try {
    btnSend.classList.add("loading");
    btnSend.disabled = true;

    const response = await fetch("http://localhost:3000/generate", {
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

    btnTab.scrollIntoView({
      block: "start",
    });
    previewPlaceholder.classList.remove("active");

    btnCopy.classList.add("active");
    btnCopy.disabled = false;

    btnRefresh.classList.add("active");
    btnRefresh.disabled = false;

    btnDevice.forEach((btn) => {
      btn.classList.add("pointer-active");
    });
  } catch (e) {
    console.log("Erro:", e);
    alert("Erro ao gerar código");
  } finally {
    btnSend.classList.remove("loading");
    btnSend.disabled = false;
  }
}

btnSend.addEventListener("click", generateCode);
