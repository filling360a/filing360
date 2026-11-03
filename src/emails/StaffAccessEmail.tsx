import { Button, Text } from "@react-email/components";
import { siteConfig } from "@/lib/siteConfig";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = {
  kind: "invite" | "recovery";
  name?: string | null;
  link: string;
  invitedBy?: string | null;
  expiresInMinutes?: number;
};

export function StaffAccessEmail({ kind, name, link, invitedBy, expiresInMinutes = 15 }: Props) {
  const invite = kind === "invite";
  const greeting = name ? `Hi ${name.split(" ")[0]},` : "Hi,";
  return (
    <EmailLayout preview={invite ? `You've been invited to the ${siteConfig.brandName} admin` : "Reset your admin password"}>
      <Text style={emailText.h1}>{invite ? `Join the ${siteConfig.brandName} admin` : "Reset your password"}</Text>
      <Text style={emailText.p}>{greeting}</Text>
      <Text style={emailText.p}>
        {invite
          ? `${invitedBy ?? "An admin"} has invited you to the ${siteConfig.brandName} admin panel. Click below to set your password and sign in.`
          : `We received a request to reset the password for your ${siteConfig.brandName} admin account. Click below to choose a new one.`}
      </Text>
      <Button href={link} style={emailText.button}>
        {invite ? "Accept invite & set password" : "Choose a new password"}
      </Button>
      <Text style={{ ...emailText.p, marginTop: "20px", fontSize: "13px", color: "#5b6e7a" }}>
        This link works once and expires in {expiresInMinutes} minutes.{" "}
        {invite
          ? "If it expires, ask an admin to resend your invite. If you weren't expecting this, you can ignore this email."
          : "If you didn't ask for this, you can ignore this email — your password won't change."}
      </Text>
    </EmailLayout>
  );
}
