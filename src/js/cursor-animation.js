import { dotGlow, state } from "./global-variables.js";

function animationMoveMouse() {
  if (state.distanceDotGlowX === 0 && state.distanceDotGlowY === 0) {
    state.distanceDotGlowX = state.mouseX;
    state.distanceDotGlowY = state.mouseY;
  }

  state.distanceDotGlowX += (state.mouseX - state.distanceDotGlowX) * 0.12;
  state.distanceDotGlowY += (state.mouseY - state.distanceDotGlowY) * 0.12;

  dotGlow.style.transform = `translate(${state.distanceDotGlowX}px, ${state.distanceDotGlowY}px) translate(-50%, -45%)`;

  requestAnimationFrame(animationMoveMouse);
}

document.addEventListener("mousemove", (e) => {
  dotGlow.style.opacity = "1";
  state.mouseX = e.clientX;
  state.mouseY = e.clientY;
});

animationMoveMouse();
