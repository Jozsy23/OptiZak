const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const form = document.querySelector("#lead-form");
const formNote = document.querySelector("#form-note");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");

    formNote.textContent = `Îți mulțumim, ${name}. Solicitarea ta a fost primită. Te vom contacta în curând.`;
    form.reset();
  });
}
