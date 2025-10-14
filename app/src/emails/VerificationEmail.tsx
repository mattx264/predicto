import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailVerificationEmailProps {
  username?: string;
  verificationLink?: string;
  appName?: string;
  expirationHours?: number;
}

export const EmailVerificationEmail = ({
  username = "Gracz",
  verificationLink = "http://localhost:5173",
  appName = "Predicto",
  expirationHours = 24,
}: EmailVerificationEmailProps) => {
  const previewText = `Potwierdź swój adres email w ${appName}`;

  const MailCheckIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"></path>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      <path d="m16 19 2 2 4-4"></path>
    </svg>
  );

  const ShieldCheckIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );

  const ClockIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  const TrophyIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const TargetIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <div style={logoGlow}></div>
            <Heading style={logoText}>PREDICTO</Heading>
            <div style={logoUnderline}></div>
          </Section>

          <Section style={iconSection}>
            <MailCheckIcon />
          </Section>

          <Heading style={heading}>Witaj w Predicto!</Heading>

          <Text style={paragraph}>Cześć {username},</Text>

          <Text style={paragraph}>
            Dziękujemy za rejestrację w{" "}
            <strong style={strongText}>{appName}</strong> – Twojej nowej
            platformie do typowania wyników meczów piłkarskich!
          </Text>

          <Text style={paragraph}>
            Aby rozpocząć swoją przygodę z typowaniem i dołączyć do rywalizacji,
            musisz potwierdzić swój adres email.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={verificationLink}>
              Potwierdź adres email
            </Button>
          </Section>

          <Section style={infoBox}>
            <Text style={infoText}>
              <ClockIcon />
              <span style={{ verticalAlign: "middle" }}>
                Ten link weryfikacyjny jest ważny przez{" "}
                <strong>{expirationHours} godzin</strong>
              </span>
            </Text>
          </Section>

          <Section style={nextStepsSection}>
            <Heading style={sectionHeading}>
              Co Cię czeka po weryfikacji?
            </Heading>

            <Section style={featureItem}>
              <Text style={featureText}>
                <TargetIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Typuj mecze</strong> – Obstawiaj
                  wyniki swoich ulubionych drużyn
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <UsersIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Dołącz do pokoi</strong> –
                  Rywalizuj z przyjaciółmi lub dołącz do publicznych lig
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <TrophyIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Wspinaj się w rankingu</strong> –
                  Zdobywaj punkty i zostań mistrzem typera!
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <CheckCircleIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Śledź statystyki</strong> – Zobacz
                  swoją skuteczność i postępy
                </span>
              </Text>
            </Section>
          </Section>

          <Section style={securityBox}>
            <Text style={securityText}>
              <ShieldCheckIcon />
              <span style={{ verticalAlign: "middle" }}>
                <strong>Nie zakładałeś konta?</strong> Jeśli to nie Ty
                zakładałeś konto w {appName}, po prostu zignoruj tego emaila.
                Link weryfikacyjny wygaśnie automatycznie.
              </span>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={alternativeText}>
            Jeśli przycisk nie działa, skopiuj i wklej poniższy link do
            przeglądarki:
          </Text>
          <Text style={linkText}>{verificationLink}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            &copy; {new Date().getFullYear()} {appName}. Wszelkie prawa
            zastrzeżone.
          </Text>
          <Text style={footer}>
            Otrzymałeś tego emaila, ponieważ ktoś zarejestrował konto używając
            tego adresu email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailVerificationEmail;

const main = {
  backgroundColor: "#0f172a",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 20px",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  width: "600px",
  maxWidth: "100%",
  backgroundColor: "#1e293b",
  borderRadius: "16px",
  border: "1px solid #334155",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
  position: "relative" as const,
  paddingTop: "20px",
};

const logoGlow = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "100px",
  background:
    "radial-gradient(ellipse, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
  filter: "blur(30px)",
  pointerEvents: "none" as const,
};

const logoText = {
  fontSize: "48px",
  fontWeight: "900",
  color: "#ffffff",
  letterSpacing: "0.15em",
  margin: "0",
  textShadow:
    "0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.5)",
  background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const logoUnderline = {
  height: "4px",
  width: "200px",
  background: "linear-gradient(90deg, #22c55e 0%, #3b82f6 100%)",
  margin: "12px auto 0",
  borderRadius: "2px",
  boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
};

const iconSection = {
  textAlign: "center" as const,
  margin: "32px 0 24px 0",
};

const heading = {
  color: "#f8fafc",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "24px 0",
  lineHeight: "1.2",
};

const paragraph = {
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  textAlign: "left" as const,
};

const strongText = {
  color: "#f8fafc",
  fontWeight: "700",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "36px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#22c55e",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "18px 48px",
  display: "inline-block",
  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
  border: "none",
};

const infoBox = {
  backgroundColor: "rgba(245, 158, 11, 0.1)",
  border: "1px solid rgba(245, 158, 11, 0.3)",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const infoText = {
  color: "#fbbf24",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const nextStepsSection = {
  margin: "40px 0 32px 0",
};

const sectionHeading = {
  color: "#f8fafc",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const featureItem = {
  margin: "16px 0",
};

const featureText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
};

const securityBox = {
  backgroundColor: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  borderRadius: "12px",
  padding: "20px",
  margin: "32px 0",
};

const securityText = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const hr = {
  borderColor: "#334155",
  margin: "32px 0",
  borderWidth: "1px",
  borderStyle: "solid",
};

const alternativeText = {
  color: "#94a3b8",
  fontSize: "13px",
  textAlign: "center" as const,
  margin: "16px 0 8px 0",
};

const linkText = {
  color: "#3b82f6",
  fontSize: "13px",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
  wordBreak: "break-all" as const,
  padding: "0 20px",
};

const footer = {
  color: "#94a3b8",
  fontSize: "13px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "12px 0",
};
