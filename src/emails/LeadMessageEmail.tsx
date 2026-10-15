import { Text } from "@react-email/components";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = { name: string; body: string; senderName: string; senderTitle?: string | null };

export function LeadMessageEmail({ name, body, senderName, senderTitle }: Props) {
  const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <EmailLayout preview={paragraphs[0]?.slice(0, 120) ?? ""}>
      <Text style={emailText.p}>Hi {name.split(" ")[0]},</Text>
      {paragraphs.map((p, i) => (
        <Text key={i} style={{ ...emailText.p, whiteSpace: "pre-line" }}>
          {p}
        </Text>
      ))}
      <Text style={{ ...emailText.p, marginTop: "20px" }}>
        Regards,
        <br />
        {senderName}
        {senderTitle ? (
          <>
            <br />
            {senderTitle}
          </>
        ) : null}
      </Text>
    </EmailLayout>
  );
}
