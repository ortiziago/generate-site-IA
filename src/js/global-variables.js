export const codeOutput = document.getElementById("codeOutput");
export const iframePreview = document.querySelector(".iframePreview");
export const previewPlaceholder = document.querySelector(
  ".preview-placeholder",
);

export const textarea = document.querySelector(".textarea");
export const btnSend = document.querySelector(".btn-send");
export const suggestions = document.querySelectorAll(".suggestion-chip");

export const btnTabs = document.querySelectorAll(".btn-tab");
export const btnTab = document.querySelector(".btn-tab");
export const tabContents = document.querySelectorAll(".tab-content");

export const btnDevices = document.querySelectorAll(".btn-device");
export const btnDesktop = document.querySelector(".btn-desktop");
export const btnMobile = document.querySelector(".btn-mobile");
export const responsiveOptions = document.querySelector(".responsive-options");

export const btnCopy = document.querySelector(".btn-copy");
export const originIcon = `
  <i class="fa-regular fa-copy"></i> Copiar
`;
export const checkIcon = `
  <i class="fa-solid fa-check"></i> Copiado
`;

export const btnRefresh = document.querySelector(".btn-refresh");
export const previewReloading = document.querySelector(".preview-reloading");
export const refreshIcon = `
  <i class="fa-solid fa-arrows-rotate"></i>
`;

export const dotGlow = document.querySelector(".dot-glow");

export const message = document.querySelector(".message");
export const messageTitle = document.querySelector(".message-title");
export const messageDescription = document.querySelector(
  ".message-description",
);
export const messageTime = document.querySelector(".message-time");

export const state = {
  isCopying: false,

  valueResponsivo: responsiveOptions.value,

  mouseX: 0,
  mouseY: 0,
  distanceDotGlowX: 0,
  distanceDotGlowY: 0,
};
