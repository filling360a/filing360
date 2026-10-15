import { Button, Text } from "@react-email/components";
import { EmailLayout, emailText } from "./EmailLayout";

type Props = {
  reference: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  city?: string | null;
  experience?: number | null;
  expectedCtc?: number | null;
  noticeDays?: number | null;
  adminUrl: string;
};

export function NewApplicationAlertEmail(props: Props) {
  const rows: [string, string | null | undefined][] = [
    ["Candidate", props.name],
    ["Email", props.email],
    ["Phone", props.phone],
    ["City", props.city],
    ["Experience", props.experience != null ? `${props.experience} years` : null],
    ["Expected CTC", props.expectedCtc != null ? `₹${props.expectedCtc} LPA` : null],
    ["Notice period", props.noticeDays != null ? `${props.noticeDays} days` : null],
  ];
  return (
    <EmailLayout preview={`${props.name} applied for ${props.jobTitle}`}>
      <Text style={emailText.h1}>
        New application {props.reference}
      </Text>
      <Text style={emailText.p}>
        For <strong>{props.jobTitle}</strong>
      </Text>
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div key={label}>
            <Text style={emailText.label}>{label}</Text>
            <Text style={emailText.value}>{value}</Text>
          </div>
        ))}
      <Button href={props.adminUrl} style={emailText.button}>
        Review application
      </Button>
    </EmailLayout>
  );
}
