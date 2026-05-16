const dotGlow = document.querySelector(".dot-glow");

let mouseX = 0;
let mouseY = 0;
let distanceDotGlowX = 0;
let distanceDotGlowY = 0;

function animationMoveMouse() {
  if (distanceDotGlowX === 0 && distanceDotGlowY === 0) {
    distanceDotGlowX = mouseX;
    distanceDotGlowY = mouseY;
  }

  distanceDotGlowX += (mouseX - distanceDotGlowX) * 0.12;
  distanceDotGlowY += (mouseY - distanceDotGlowY) * 0.12;

  dotGlow.style.transform = `translate(${distanceDotGlowX}px, ${distanceDotGlowY}px) translate(-50%, -45%)`;

  requestAnimationFrame(animationMoveMouse);
}

document.addEventListener("mousemove", (e) => {
  dotGlow.style.opacity = "1";
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animationMoveMouse();
