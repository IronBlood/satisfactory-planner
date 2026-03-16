declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function loadGoogleAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) {
    return;
  }

  const gaSrc = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  if (document.querySelector(`script[src="${gaSrc}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = gaSrc;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  window.gtag("js", new Date());
  window.gtag("config", gaId);
}
