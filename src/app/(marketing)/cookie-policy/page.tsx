import { CookieSettingsButton } from "@/components/site/Consent";
import { LegalDocument } from "@/components/site/LegalDocument";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy — How Filing360 Uses Cookies",
  description: "The cookies and similar technologies Filing360 uses, what each one does, how long it lasts, and how to change your choice.",
  path: "/cookie-policy",
  absoluteTitle: true,
});

const COOKIES = [
  { name: "f360_consent (local storage)", provider: "Filing360", purpose: "Remembers your cookie choice", type: "Essential", duration: "12 months" },
  { name: "f360_attribution (local storage)", provider: "Filing360", purpose: "Remembers which campaign or page brought you, so we can answer your enquiry in context", type: "Essential", duration: "30 days" },
  { name: "sb-* ", provider: "Filing360 (Supabase)", purpose: "Keeps team members signed in to the admin panel", type: "Essential", duration: "Session / up to 7 days" },
  { name: "_ga, _ga_*", provider: "Google Analytics", purpose: "Counts visits and how pages are used", type: "Analytics", duration: "Up to 13 months" },
  { name: "_clck, _clsk, CLID", provider: "Microsoft Clarity", purpose: "Anonymous heatmaps and session insights to improve usability", type: "Analytics", duration: "Up to 12 months" },
  { name: "_gcl_au, _gcl_aw", provider: "Google Ads", purpose: "Measures whether ad clicks lead to enquiries", type: "Advertising", duration: "Up to 90 days" },
  { name: "_fbp, _fbc", provider: "Meta (Facebook / Instagram)", purpose: "Measures ad performance and builds audiences", type: "Advertising", duration: "Up to 90 days" },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      path="/cookie-policy"
      intro="Cookies are small files stored by your browser. We use a few essential ones to run the website, and — only if you agree — analytics and advertising cookies."
      sections={[
        {
          id: "choices",
          title: "Your choices",
          body: (
            <>
              <p>
                When you first visit, a banner lets you accept all cookies, reject non-essential ones, or choose by category. Essential cookies cannot
                be switched off because the website needs them. You can change your choice at any time:
              </p>
              <p>
                <CookieSettingsButton className="inline-flex h-10 items-center rounded-xl bg-[#0f2a45] px-4 text-[15px] font-semibold text-white hover:bg-[#173a58]" />
              </p>
              <p>
                You can also block or delete cookies in your browser settings. Blocking essential cookies may stop forms or sign-in from working.
              </p>
            </>
          ),
        },
        {
          id: "list",
          title: "Cookies we use",
          body: (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Category</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name}>
                      <td>{c.name}</td>
                      <td>{c.provider}</td>
                      <td>{c.purpose}</td>
                      <td>{c.type}</td>
                      <td>{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Analytics and advertising tools are only loaded if they are enabled on the website and you have given consent for that category.</p>
            </>
          ),
        },
        {
          id: "google-consent",
          title: "Google Consent Mode",
          body: (
            <p>
              We use Google Consent Mode. Until you opt in, Google tags are not loaded. If you later withdraw consent, we signal Google and Meta to stop
              using cookies for analytics and advertising.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about cookies: <a href={`mailto:${company.contact.privacyEmail}`}>{company.contact.privacyEmail}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
