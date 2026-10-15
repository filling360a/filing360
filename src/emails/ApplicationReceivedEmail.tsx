import { Text } from "@react-email/components";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = { name: string; reference: string; jobTitle: string };

export function ApplicationReceivedEmail({ name, reference, jobTitle }: Props) {
  return (
    <EmailLayout preview={`We've received your application for ${jobTitle}`}>
      <Text style={emailText.h1}>Thanks for applying, {name.split(" ")[0]}</Text>
      <Text style={emailText.p}>
        We&apos;ve received your application for <strong>{jobTitle}</strong>. Your reference number is{" "}
        <strong>{reference}</strong>.
      </Text>
      <Text style={emailText.p}>
        Our hiring team reviews every application personally. If your profile matches what we&apos;re looking for,
        we&apos;ll reach out within 7–10 working days to schedule a conversation.
      </Text>
      <Text style={emailText.p}>
        If you need to update anything, just reply to this email and mention your reference number.
      </Text>
      <Text style={emailText.p}>— Hiring team, Filing360</Text>
    </EmailLayout>
  );
}
