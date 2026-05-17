import { textarea, btnSend } from "./textarea-animation.js";
import { btnCopy, btnRefresh } from "./action-buttons.js";

export const codeOutput = document.getElementById("codeOutput");
const iframePreview = document.querySelector(".iframePreview");
const btnTab = document.querySelector(".btn-tab");

const previewPlaceholder = document.querySelector(".preview-placeholder");

btnCopy.disabled = true;

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

    codeOutput.textContent = result;
    iframePreview.srcdoc = result;

    btnTab.scrollIntoView({
      block: "start",
    });
    previewPlaceholder.classList.remove("active");
    btnCopy.classList.add("active");
    btnCopy.disabled = false;
  } catch (e) {
    console.log("Erro:", e);
    alert("Erro ao gerar código");
  } finally {
    btnSend.classList.remove("loading");
    btnSend.disabled = false;
  }
}

btnSend.addEventListener("click", generateCode);
