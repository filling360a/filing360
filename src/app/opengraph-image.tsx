import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = `${siteConfig.brandName} — Company registration, GST & income tax experts`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", siteConfig.logo.src));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f3f7fa" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 40px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={391} height={90} />
          <div style={{ display: "flex", marginTop: 48, fontSize: 60, fontWeight: 700, lineHeight: 1.12, color: "#0f2a45", letterSpacing: -1.5, maxWidth: 980 }}>
            Company registration, GST & income tax — done by experts
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#4a5d68" }}>
            Private Limited · LLP · OPC · GST returns · ITR · ROC compliance
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f2a45", color: "#ffffff", padding: "26px 72px", fontSize: 26 }}>
          <span>CA / CS-assisted · Transparent fees · 100% online</span>
          <span style={{ fontWeight: 700 }}>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
