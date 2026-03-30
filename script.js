const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const form = document.querySelector("#lead-form");
const formNote = document.querySelector("#form-note");
const fbPostsEl = document.querySelector("#fb-posts");

const FACEBOOK_PAGE_URL = "https://www.facebook.com/OptiZak/";
const FACEBOOK_APP_ID = "";

// În front-end only nu putem prelua „ultimele 3 postări” programatic (CORS + API cu token).
// Soluția stabilă este să păstrăm aici 3 linkuri de postări (actualizabile ușor).
const FACEBOOK_POST_URLS = [
  // Exemplu (înlocuiește cu URL-urile postărilor dorite):
   "https://www.facebook.com/OptiZak/posts/1618886233578089",
   "https://www.facebook.com/OptiZak/posts/1624855076314538",
   ""
];

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

function ensureFacebookSdkLoaded() {
  if (window.FB) return;
  if (document.querySelector('script[data-fb-sdk="true"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.dataset.fbSdk = "true";
  script.crossOrigin = "anonymous";

  const appIdParam = FACEBOOK_APP_ID ? `&appId=${encodeURIComponent(FACEBOOK_APP_ID)}` : "";
  script.src = `https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v20.0${appIdParam}`;
  document.head.appendChild(script);
}

function renderFacebookPosts() {
  if (!fbPostsEl) return;

  if (!FACEBOOK_POST_URLS.length) {
    fbPostsEl.innerHTML = `
      <div class="fb-post">
        <div class="fb-post-placeholder">
          Adaugă 3 linkuri de postări în <code>FACEBOOK_POST_URLS</code> din <code>script.js</code>.
        </div>
      </div>
    `;
    return;
  }

  const urls = FACEBOOK_POST_URLS.slice(0, 3);
  fbPostsEl.innerHTML = urls
    .map(
      (url) => `
        <div class="fb-post">
          <div class="fb-post" data-href="${url}" data-show-text="true"></div>
        </div>
      `,
    )
    .join("");

  ensureFacebookSdkLoaded();

  const tryParse = () => {
    if (window.FB && window.FB.XFBML && typeof window.FB.XFBML.parse === "function") {
      window.FB.XFBML.parse(fbPostsEl);
      return true;
    }
    return false;
  };

  if (!tryParse()) {
    const start = Date.now();
    const timer = setInterval(() => {
      const ok = tryParse();
      if (ok || Date.now() - start > 8000) clearInterval(timer);
    }, 250);
  }
}

renderFacebookPosts();
