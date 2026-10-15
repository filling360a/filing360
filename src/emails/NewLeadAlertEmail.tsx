import { Button, Text } from "@react-email/components";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = {
  reference: string;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  interest?: string | null;
  message?: string | null;
  source: string;
  campaign?: string | null;
  repeat: boolean;
  adminUrl: string;
};

export function NewLeadAlertEmail(props: Props) {
  const rows: [string, string | null | undefined][] = [
    ["Name", props.name],
    ["Phone", props.phone],
    ["Email", props.email],
    ["City", props.city],
    ["Service", props.interest],
    ["Message", props.message],
    ["Form", props.source],
    ["Campaign", props.campaign],
  ];
  return (
    <EmailLayout preview={`${props.name} · ${props.interest ?? "New enquiry"} · ${props.phone}`}>
      <Text style={emailText.h1}>
        {props.repeat ? "Returning lead" : "New lead"} {props.reference}
      </Text>
      {props.repeat && (
        <Text style={emailText.p}>This person has enquired before — the existing lead was updated.</Text>
      )}
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div key={label}>
            <Text style={emailText.label}>{label}</Text>
            <Text style={emailText.value}>{value}</Text>
          </div>
        ))}
      <Button href={props.adminUrl} style={emailText.button}>
        Open in admin
      </Button>
    </EmailLayout>
  );
}
