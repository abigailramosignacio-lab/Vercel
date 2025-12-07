const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = document.documentElement;
const body = document.body;

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("vc-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("vc-theme", "light");
  }
}

function initTheme() {
  const stored = localStorage.getItem("vc-theme");
  if (stored) setTheme(stored === "dark");
  else setTheme(prefersDark);
}
initTheme();

/* Hook theme buttons */
document
  .querySelectorAll("#themeToggle, #themeToggle2, #themeToggle3")
  .forEach((btn) => {
    btn &&
      btn.addEventListener("click", () => {
        const dark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("vc-theme", dark ? "dark" : "light");
      });
  });

function revealAll() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealAll);
window.addEventListener("load", revealAll);
window.addEventListener("resize", revealAll);

const btnTop =
  document.getElementById("btnTop") ||
  document.getElementById("btnTop2") ||
  document.getElementById("btnTop3");
if (btnTop) {
  const show = () => {
    if (window.scrollY > 360) btnTop.classList.add("show");
    else btnTop.classList.remove("show");
  };
  window.addEventListener("scroll", show);
  btnTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

const header = document.querySelector(".site-header");
function shrinkHeader() {
  if (window.scrollY > 30) header.style.backdropFilter = "blur(8px)";
  else header.style.backdropFilter = "blur(0px)";
}
window.addEventListener("scroll", shrinkHeader);

const form = document.getElementById("contactForm");
if (form) {
  const status = document.getElementById("formStatus");
  const clearBtn = document.getElementById("clearBtn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    // Basic validation
    const data = new FormData(form);
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const msg = data.get("message")?.trim();
    if (!name || !email || !msg) {
      status.textContent = "Por favor completa todos los campos.";
      status.style.color = "#d66";
      return;
    }
    // Simular envío
    status.textContent = "Enviando mensaje...";
    status.style.color = "#64707a";
    setTimeout(() => {
      status.textContent =
        "Mensaje enviado. ¡Gracias! Te respondemos en 48 horas.";
      status.style.color = "#2f8a57";
      form.reset();
    }, 900);
  });

  clearBtn &&
    clearBtn.addEventListener("click", () => {
      form.reset();
      status.textContent = "";
    });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") document.body.classList.add("user-is-tabbing");
});

document.querySelectorAll(".nav-link").forEach((a) => {
  if (
    a.href === location.href ||
    location.pathname.endsWith(a.getAttribute("href"))
  ) {
    a.classList.add("active");
  }
});
