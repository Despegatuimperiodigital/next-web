import React from 'react';
import Script from 'next/script';

function loadMetricoolScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://tracker.metricool.com/resources/be.js';
  script.onload = function () {
    beTracker.t({ hash: 'bba9d0ea49388083e9e58899dc0cf0b1' });
  };
  document.head.appendChild(script);
}

function loadGoogleTagScript() {
  const gtagScript = document.createElement('script');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-7JV8GN6ZET';
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  const configScript = document.createElement('script');
  configScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-7JV8GN6ZET');
  `;
  document.head.appendChild(configScript);
}

export default function Analytics() {
  React.useEffect(() => {
    loadMetricoolScript();
    loadGoogleTagScript();
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-7JV8GN6ZET"
        async
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7JV8GN6ZET');
        `}
      </Script>
    </>
  );
}
