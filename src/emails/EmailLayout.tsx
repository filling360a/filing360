import type { ReactNode } from "react";
import { Body, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";

const LOGO_HEIGHT = 44;

const styles = {
  body: { backgroundColor: "#f1f5f9", fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: "24px 0" },
  container: { backgroundColor: "#ffffff", borderRadius: "12px", maxWidth: "560px", margin: "0 auto", overflow: "hidden" },
  header: { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 28px" },
  logo: { display: "block", border: 0 },
  content: { padding: "28px" },
  footer: { padding: "0 28px 24px" },
  muted: { color: "#64748b", fontSize: "12px", lineHeight: "18px", margin: "0 0 4px" },
} as const;

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={`${env.siteUrl}${siteConfig.logo.src}`}
              alt={siteConfig.brandName}
              height={LOGO_HEIGHT}
              width={Math.round((LOGO_HEIGHT * siteConfig.logo.width) / siteConfig.logo.height)}
              style={styles.logo}
            />
          </Section>
          <Section style={styles.content}>{children}</Section>
          <Hr style={{ borderColor: "#e2e8f0", margin: "0 28px 20px" }} />
          <Section style={styles.footer}>
            <Text style={styles.muted}>
              {siteConfig.brandName} · {siteConfig.contact.phone} · {siteConfig.contact.email}
            </Text>
            <Text style={styles.muted}>
              {siteConfig.brandName} is a private facilitation platform, not a government website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const emailText = {
  h1: { color: "#0b2c5e", fontSize: "22px", fontWeight: 700, lineHeight: "30px", margin: "0 0 12px" },
  p: { color: "#334155", fontSize: "15px", lineHeight: "24px", margin: "0 0 14px" },
  label: { color: "#64748b", fontSize: "12px", margin: "0", textTransform: "uppercase" as const, letterSpacing: "0.04em" },
  value: { color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "2px 0 12px" },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px 20px",
    textDecoration: "none",
  },
};
