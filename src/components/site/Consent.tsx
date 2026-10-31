"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  onConsentChange,
  onConsentOpen,
  openConsentSettings,
  readConsent,
  saveConsent,
  trackingIds as ids,
  usesAnalytics,
  usesMarketing,
  usesOptionalCookies,
  type ConsentState,
} from "@/lib/consent";

const subscribe = (cb: () => void) => onConsentChange(cb);
const snapshot = () => {
  const c = readConsent();
  return c ? `${Number(c.analytics)}${Number(c.marketing)}` : "";
};

/** "" = no choice yet, "10" = analytics only, etc. `null` during SSR. */
function useConsentKey(): string | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

function pushConsent(state: ConsentState) {
  const w = window as GtagWindow;
  w.gtag?.("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  });
  w.fbq?.("consent", state.marketing ? "grant" : "revoke");
}

/** Loads analytics and ad tags only after the visitor opts in. */
export function Analytics() {
  const key = useConsentKey();

  useEffect(() => onConsentChange(pushConsent), []);

  if (!key) return null;
  const analytics = key[0] === "1";
  const marketing = key[1] === "1";
  const consentJs = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'${analytics ? "granted" : "denied"}',ad_storage:'${marketing ? "granted" : "denied"}',ad_user_data:'${marketing ? "granted" : "denied"}',ad_personalization:'${marketing ? "granted" : "denied"}'});`;
  const gtagId = (analytics && ids.ga) || (marketing && ids.googleAds) || "";

  return (
    <>
      {(analytics || marketing) && (ids.gtm || gtagId) && <Script id="consent-mode" strategy="afterInteractive">{consentJs}</Script>}

      {ids.gtm && (analytics || marketing) && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ids.gtm}');`}
        </Script>
      )}

      {!ids.gtm && gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-config" strategy="afterInteractive">
            {`gtag('js',new Date());${analytics && ids.ga ? `gtag('config','${ids.ga}');` : ""}${marketing && ids.googleAds ? `gtag('config','${ids.googleAds}');` : ""}`}
          </Script>
        </>
      )}

      {marketing && ids.metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ids.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}

      {analytics && ids.clarity && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${ids.clarity}");`}
        </Script>
      )}
    </>
  );
}

export function CookieBanner() {
  const key = useConsentKey();
  const [open, setOpen] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(
    () =>
      onConsentOpen(() => {
        const current = readConsent();
        setAnalytics(current?.analytics ?? true);
        setMarketing(current?.marketing ?? true);
        setCustomise(true);
        setOpen(true);
      }),
    [],
  );

  if (!usesOptionalCookies || key === null) return null;
  if (key !== "" && !open) return null;

  const choose = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setOpen(false);
    setCustomise(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-[4.75rem] z-[60] mx-auto max-w-[560px] rounded-2xl border border-[#d7e4de] bg-white p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] md:bottom-5 md:left-5 md:right-auto md:mx-0 md:p-5"
    >
      <p id="cookie-title" className="text-[16px] font-bold text-[#0f2a45]">We value your privacy</p>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#4a5d68]">
        We use essential cookies to run this site. With your permission we&rsquo;d also like to use analytics
        {usesMarketing ? " and advertising" : ""} cookies to understand what helps visitors. Read our{" "}
        <Link href="/cookie-policy" className="font-semibold text-[#0e7b5b] hover:underline">Cookie Policy</Link>.
      </p>

      {customise && (
        <div className="mt-3 space-y-2 rounded-xl bg-[#f3f7fa] p-3 text-[14.5px]">
          <label className="flex items-start gap-2.5 text-[#2c3f4e]">
            <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
            <span><strong className="text-[#0f2a45]">Essential</strong> — security, forms and your cookie choice. Always on.</span>
          </label>
          {usesAnalytics && (
            <label className="flex items-start gap-2.5 text-[#2c3f4e]">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-[#0e7b5b]" />
              <span><strong className="text-[#0f2a45]">Analytics</strong> — anonymous usage statistics that help us improve pages.</span>
            </label>
          )}
          {usesMarketing && (
            <label className="flex items-start gap-2.5 text-[#2c3f4e]">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 h-4 w-4 accent-[#0e7b5b]" />
              <span><strong className="text-[#0f2a45]">Advertising</strong> — measure our ads and show relevant ones on other sites.</span>
            </label>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {customise ? (
          <button
            type="button"
            onClick={() => choose({ analytics: usesAnalytics && analytics, marketing: usesMarketing && marketing })}
            className="h-10 rounded-xl bg-[#0f2a45] px-4 text-[14.5px] font-semibold text-white hover:bg-[#173a58]"
          >
            Save choices
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => choose({ analytics: usesAnalytics, marketing: usesMarketing })}
              className="h-10 rounded-xl bg-[#0f2a45] px-4 text-[14.5px] font-semibold text-white hover:bg-[#173a58]"
            >
              Accept all
            </button>
            <button type="button" onClick={() => setCustomise(true)} className="h-10 rounded-xl border border-[#bfd4cb] px-4 text-[14.5px] font-semibold text-[#0f2a45] hover:bg-[#f3f7fa]">
              Customise
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => choose({ analytics: false, marketing: false })}
          className="h-10 rounded-xl border border-[#bfd4cb] px-4 text-[14.5px] font-semibold text-[#0f2a45] hover:bg-[#f3f7fa]"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
