document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.querySelector(".date");
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString("en-US", options);

  const nameContainer = document.querySelector(".name-container");
  const startScreen = document.getElementById("start-screen");
  const startBtn = startScreen?.querySelector(".start-btn");
  const shuffleBtn = document.querySelector(".name-container .shuffle");

  const todayKey = new Date().toISOString().slice(0, 10);
  const STORAGE_KEY = "repRoulette:startUsedDate";

  function showMain() {
    if (nameContainer) nameContainer.style.display = "flex";
    if (startScreen) startScreen.style.display = "none";
  }

  function showStart() {
    if (nameContainer) nameContainer.style.display = "none";
    if (startScreen) startScreen.style.display = "flex";
  }

  function shuffleNodes(nodes) {
    const arr = Array.from(nodes);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const lastUsed = localStorage.getItem(STORAGE_KEY);
  if (lastUsed === todayKey) {
    showMain();
  } else {
    showStart();
  }

  startBtn?.addEventListener("click", () => {
    const nameEls = nameContainer.querySelectorAll(".name");
    const buttonRow = nameContainer.querySelector("div");
    const shuffled = shuffleNodes(nameEls);
    shuffled.forEach(el => nameContainer.insertBefore(el, buttonRow));
    localStorage.setItem(STORAGE_KEY, todayKey);
    showMain();
  });

  shuffleBtn?.addEventListener("click", () => {
    const nameEls = nameContainer.querySelectorAll(".name");
    const buttonRow = nameContainer.querySelector("div");

    if (nameEls.length > 0) {
      const first = nameEls[0];
      nameContainer.insertBefore(first, buttonRow);
    }
  });
});