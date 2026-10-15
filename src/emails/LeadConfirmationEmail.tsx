import { Button, Text } from "@react-email/components";
import { siteConfig } from "@/lib/siteConfig";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = { name: string; reference: string; interest?: string | null };

export function LeadConfirmationEmail({ name, reference, interest }: Props) {
  const firstName = name.split(" ")[0];
  return (
    <EmailLayout preview={`We've received your request (${reference}) — an expert will call you shortly.`}>
      <Text style={emailText.h1}>Thanks, {firstName} — we&apos;ve got your request</Text>
      <Text style={emailText.p}>
        A {siteConfig.brandName} expert will call you within {siteConfig.socialProof.callbackMins} minutes during
        working hours to understand your requirement
        {interest ? ` for ${interest}` : ""} and share a written estimate.
      </Text>
      <Text style={emailText.label}>Your reference</Text>
      <Text style={emailText.value}>{reference}</Text>
      <Text style={emailText.p}>
        Keep this reference handy when you speak to us. You can reply to this email with any documents or
        questions.
      </Text>
      <Button href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} style={emailText.button}>
        Call us now
      </Button>
    </EmailLayout>
  );
}
