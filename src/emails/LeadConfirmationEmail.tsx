import { Button, Text } from "@react-email/components";
import { siteConfig } from "@/lib/siteConfig";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = { name: string; reference: string; interest?: string | null };

export function LeadConfirmationEmail({ name, reference, interest }: Props) {
  const firstName = name.split(" ")[0];
  return (
    <EmailLayout preview={`We've received your request (${reference}) — we'll contact you within 24 hours.`}>
      <Text style={emailText.h1}>Thanks, {firstName} — we&apos;ve got your request</Text>
      <Text style={emailText.p}>
        Thank you for contacting {siteConfig.brandName}
        {interest ? ` about ${interest}` : ""}. Our team will get in touch with you within{" "}
        <strong>24 hours</strong> during working days to understand your requirement and share the next
        steps.
      </Text>
      <Text style={emailText.label}>Your reference</Text>
      <Text style={emailText.value}>{reference}</Text>
      <Text style={emailText.p}>
        Keep this reference handy when you speak to us. You can reply to this email with any documents or
        questions in the meantime.
      </Text>
      <Button href={`tel:${siteConfig.contact.phoneTel}`} style={emailText.button}>
        Call us now
      </Button>
    </EmailLayout>
  );
}
