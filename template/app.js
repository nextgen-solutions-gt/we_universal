$(function () {
  const key = "universaldarkhole";
  const $html = $("html");
  const $buttons = $(".theme-toggle button");

  const i18n = {
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
    return document.documentElement.lang &&
      document.documentElement.lang.toLowerCase().startsWith("es")
      ? "es"
      : "en";
  }

function apply(theme) {
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    $html.attr("data-theme", prefersDark ? "dark" : "light");
  } else {
    $html.attr("data-theme", theme);
  }

  // 👇 clave
  $html.attr("data-theme-selected", theme);

  localStorage.setItem(key, theme);
  updateUI(theme);
}


  function updateUI(theme) {
    const lang = getLang();
    const text = i18n[lang][theme];

    $buttons.removeClass("active").each(function () {
      const $btn = $(this);
      const btnTheme = $btn.data("theme-option");

      if (btnTheme === theme) {
        $btn.addClass("active");
      }

      $btn.attr("title", i18n[lang][btnTheme]);
      $btn.attr("aria-label", i18n[lang][btnTheme]);
    });
  }

  // Estado inicial
  const saved = localStorage.getItem(key) || "system";
  apply(saved);

  // Click
  $buttons.on("click", function () {
    apply($(this).data("theme-option"));
  });

  // Cambio del sistema
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if ((localStorage.getItem(key) || "system") === "system") {
        apply("system");
      }
    });
});
