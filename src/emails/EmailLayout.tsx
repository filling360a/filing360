import type { ReactNode } from "react";
import { Body, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";

const LOGO_HEIGHT = 44;

const styles = {
  body: { backgroundColor: "#eef4f1", fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: "24px 0" },
  container: { backgroundColor: "#ffffff", borderRadius: "12px", maxWidth: "560px", margin: "0 auto", overflow: "hidden" },
  header: { backgroundColor: "#ffffff", borderBottom: "1px solid #d7e4de", padding: "18px 28px" },
  logo: { display: "block", border: 0 },
  content: { padding: "28px" },
  footer: { padding: "0 28px 24px" },
  muted: { color: "#5b6e7a", fontSize: "12px", lineHeight: "18px", margin: "0 0 4px" },
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
          <Hr style={{ borderColor: "#d7e4de", margin: "0 28px 20px" }} />
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
  h1: { color: "#0f2a45", fontSize: "22px", fontWeight: 700, lineHeight: "30px", margin: "0 0 12px" },
  p: { color: "#2c3f4e", fontSize: "15px", lineHeight: "24px", margin: "0 0 14px" },
  label: { color: "#5b6e7a", fontSize: "12px", margin: "0", textTransform: "uppercase" as const, letterSpacing: "0.04em" },
  value: { color: "#0f2a45", fontSize: "15px", fontWeight: 600, margin: "2px 0 12px" },
  button: {
    backgroundColor: "#0e7b5b",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px 20px",
    textDecoration: "none",
  },
};
