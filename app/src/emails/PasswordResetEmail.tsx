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

interface PasswordResetEmailProps {
  username?: string;
  resetLink?: string;
  appName?: string;
  expirationMinutes?: number;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: string;
}

export const PasswordResetEmail = ({
  username = "Gracz",
  resetLink = "http://localhost:5173/",
  appName = "Predicto",
  expirationMinutes = 60,
  ipAddress = "192.168.1.1",
  userAgent = "Chrome on Windows",
  timestamp = "12 października 2025, 14:30",
}: PasswordResetEmailProps) => {
  const previewText = `Zresetuj swoje hasło w ${appName}`;

  // SVG Icons from Lucide
  const KeyRoundIcon = () => (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
      <circle cx="16.5" cy="7.5" r=".5"></circle>
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

  const ShieldAlertIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>
  );

  const InfoIcon = () => (
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
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  );

  const LockIcon = () => (
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="18"
      height="18"
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

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo PREDICTO */}
          <Section style={logoSection}>
            <div style={logoGlow}></div>
            <Heading style={logoText}>PREDICTO</Heading>
            <div style={logoUnderline}></div>
          </Section>

          {/* Ikona główna */}
          <Section style={iconSection}>
            <KeyRoundIcon />
          </Section>

          <Heading style={heading}>Resetowanie hasła</Heading>

          <Text style={paragraph}>Cześć {username},</Text>

          <Text style={paragraph}>
            Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w{" "}
            <strong style={strongText}>{appName}</strong>.
          </Text>

          <Text style={paragraph}>
            Jeśli to Ty złożyłeś tę prośbę, kliknij przycisk poniżej, aby
            ustawić nowe hasło:
          </Text>

          {/* Przycisk resetowania */}
          <Section style={btnContainer}>
            <Button style={button} href={resetLink}>
              Zresetuj hasło
            </Button>
          </Section>

          {/* Ostrzeżenie o wygaśnięciu */}
          <Section style={warningBox}>
            <Text style={warningText}>
              <ClockIcon />
              <span style={{ verticalAlign: "middle" }}>
                <strong>Link jest ważny przez {expirationMinutes} minut</strong>{" "}
                od momentu wysłania tego emaila
              </span>
            </Text>
          </Section>

          {/* Szczegóły żądania */}
          <Section style={detailsCard}>
            <Heading style={detailsHeading}>Szczegóły żądania</Heading>

            <Section style={detailItem}>
              <Text style={detailLabel}>Czas:</Text>
              <Text style={detailValue}>{timestamp}</Text>
            </Section>

            <Section style={detailItem}>
              <Text style={detailLabel}>Adres IP:</Text>
              <Text style={detailValue}>{ipAddress}</Text>
            </Section>

            <Section style={detailItem}>
              <Text style={detailLabel}>Urządzenie:</Text>
              <Text style={detailValue}>{userAgent}</Text>
            </Section>
          </Section>

          {/* Sekcja bezpieczeństwa */}
          <Section style={securitySection}>
            <Heading style={sectionHeading}>
              <ShieldAlertIcon />
              <span style={{ verticalAlign: "middle" }}>To nie Ty?</span>
            </Heading>

            <Text style={securityText}>
              Jeśli <strong style={strongText}>nie prosiłeś</strong> o reset
              hasła, <strong style={strongText}>zignoruj tego emaila</strong>.
              Twoje hasło pozostanie bez zmian i będzie bezpieczne.
            </Text>

            <Text style={securityText}>Jednak zalecamy:</Text>

            <Section style={tipItem}>
              <Text style={tipText}>
                <CheckCircleIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Sprawdzić ostatnie aktywności na koncie
                </span>
              </Text>
            </Section>

            <Section style={tipItem}>
              <Text style={tipText}>
                <CheckCircleIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Zmienić hasło prewencyjnie
                </span>
              </Text>
            </Section>

            <Section style={tipItem}>
              <Text style={tipText}>
                <CheckCircleIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Włączyć uwierzytelnianie dwuskładnikowe (jeśli dostępne)
                </span>
              </Text>
            </Section>
          </Section>

          {/* Wskazówki dotyczące hasła */}
          <Section style={tipsBox}>
            <Text style={tipsHeading}>
              <LockIcon />
              <span style={{ verticalAlign: "middle" }}>
                Wskazówki dotyczące silnego hasła:
              </span>
            </Text>

            <Text style={tipsList}>
              • Używaj minimum 8 znaków
              <br />
              • Łącz wielkie i małe litery
              <br />
              • Dodaj cyfry i znaki specjalne
              <br />
              • Nie używaj oczywistych haseł (imię, data urodzenia)
              <br />• Nie wykorzystuj tego samego hasła w innych serwisach
            </Text>
          </Section>

          {/* Alternatywny link */}
          <Hr style={hr} />

          <Section style={infoBox}>
            <Text style={infoText}>
              <InfoIcon />
              <span style={{ verticalAlign: "middle" }}>
                Jeśli przycisk nie działa, skopiuj i wklej poniższy link do
                przeglądarki:
              </span>
            </Text>
          </Section>

          <Text style={linkText}>{resetLink}</Text>

          <Hr style={hr} />

          {/* Stopka */}
          <Text style={footer}>
            &copy; {new Date().getFullYear()} {appName}. Wszelkie prawa
            zastrzeżone.
          </Text>
          <Text style={footer}>
            Ten email został wysłany automatycznie w odpowiedzi na prośbę o
            reset hasła. Jeśli potrzebujesz pomocy, skontaktuj się z naszym
            wsparciem.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

// --- Style ---

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
  backgroundColor: "#3b82f6",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "18px 48px",
  display: "inline-block",
  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
  border: "none",
};

const warningBox = {
  backgroundColor: "rgba(245, 158, 11, 0.1)",
  border: "2px solid rgba(245, 158, 11, 0.4)",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const warningText = {
  color: "#fbbf24",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0",
};

const detailsCard = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
};

const detailsHeading = {
  color: "#f8fafc",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
  textAlign: "center" as const,
};

const detailItem = {
  display: "flex",
  justifyContent: "space-between",
  margin: "12px 0",
  padding: "8px 0",
  borderBottom: "1px solid #334155",
};

const detailLabel = {
  color: "#94a3b8",
  fontSize: "14px",
  margin: "0",
  fontWeight: "600",
};

const detailValue = {
  color: "#cbd5e1",
  fontSize: "14px",
  margin: "0",
  textAlign: "right" as const,
};

const securitySection = {
  margin: "32px 0",
};

const sectionHeading = {
  color: "#f8fafc",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
};

const securityText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "12px 0",
};

const tipItem = {
  margin: "8px 0",
};

const tipText = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const tipsBox = {
  backgroundColor: "rgba(34, 197, 94, 0.1)",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  borderRadius: "12px",
  padding: "20px",
  margin: "32px 0",
};

const tipsHeading = {
  color: "#22c55e",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px 0",
};

const tipsList = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0",
};

const hr = {
  borderColor: "#334155",
  margin: "32px 0",
  borderWidth: "1px",
  borderStyle: "solid",
};

const infoBox = {
  textAlign: "center" as const,
  margin: "24px 0 16px 0",
};

const infoText = {
  color: "#94a3b8",
  fontSize: "13px",
  margin: "0",
};

const linkText = {
  color: "#3b82f6",
  fontSize: "12px",
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
