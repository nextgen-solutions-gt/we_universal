$(function () {
  const key = "universaldarkhole";
  const $html = $("html");
  const $btn = $("#switch-theme");
  const $icon = $btn.find("i");

  const states = ["light", "dark", "system"];

  // 🔹 textos por idioma (sin PHP, sin archivos extra)
  const labels = {
    es: {
      light: "Modo claro",
      dark: "Modo oscuro",
      system: "Modo del sistema"
    },
    en: {
      light: "Light mode",
      dark: "Dark mode",
      system: "System mode"
    }
  };

  function getLang() {
    // soporta es, es-ES, en, en-GB, etc.
    return (document.documentElement.lang || "en").split("-")[0];
  }

  function getNext(current) {
    return states[(states.indexOf(current) + 1) % states.length];
  }

function apply(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    $html.attr("data-theme", prefersDark ? "dark" : "light");
  } else {
    $html.attr("data-theme", theme);
  }

  localStorage.setItem(key, theme);
  updateIcon(theme);
  updateTooltip(theme); // 👈 aquí
}


  function updateIcon(theme) {
    $icon
      .removeClass("fa-sun-o fa-moon-o fa-desktop")
      .addClass(
        theme === "light"
          ? "fa-sun-o"
          : theme === "dark"
          ? "fa-moon-o"
          : "fa-desktop"
      );
  }

function updateTooltip(theme) {
  const lang = getLang();
  const dict = labels[lang] || labels.en;

  const text = dict[theme];

  $btn
    .attr("aria-label", text)
    .find(".theme-tooltip")
    .text(text);
}


  // estado inicial
  const saved = localStorage.getItem(key) || "system";
  apply(saved);

  // click
  $btn.on("click", function (e) {
    e.preventDefault();
    apply(getNext(localStorage.getItem(key) || "system"));
  });

  // cambios del sistema (solo si está en SYSTEM)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if ((localStorage.getItem(key) || "system") === "system") {
        apply("system");
      }
    });
});
