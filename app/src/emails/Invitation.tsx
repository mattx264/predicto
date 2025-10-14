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

interface InvitationEmailProps {
  username?: string;
  inviterName?: string;
  roomName?: string;
  inviteLink?: string;
  appName?: string;
}

export const InvitationEmail = ({
  username = "Gracz",
  inviterName = "mattx",
  roomName = "Premier League",
  inviteLink = "http://localhost:5173/",
  appName = "Predicto",
}: InvitationEmailProps) => {
  const previewText = `${inviterName} zaprasza Cię do pokoju ${roomName}!`;

  const MailIcon = () => (
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
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );

  const UserPlusIcon = () => (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <line x1="19" y1="8" x2="19" y2="14"></line>
      <line x1="22" y1="11" x2="16" y2="11"></line>
    </svg>
  );

  const TargetIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "10px" }}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "10px" }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const TrophyIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "10px" }}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
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
            <MailIcon />
          </Section>

          <Heading style={heading}>Otrzymałeś zaproszenie do pokoju!</Heading>

          <Text style={paragraph}>Cześć {username},</Text>

          <Text style={paragraph}>
            <UserPlusIcon />
            <span style={{ verticalAlign: "middle" }}>
              Użytkownik <strong style={strongText}>{inviterName}</strong>{" "}
              zaprosił Cię do dołączenia do swojego pokoju typerskiego
            </span>
          </Text>

          <Section style={roomCard}>
            <Text style={roomLabel}>Pokój:</Text>
            <Text style={roomNameStyle}>
              <span style={{ verticalAlign: "middle" }}>{roomName}</span>
            </Text>
          </Section>

          <Text style={paragraph}>
            Kliknij przycisk poniżej, aby przyjąć zaproszenie i rozpocząć
            rywalizację. Powodzenia!
          </Text>

          <Section style={featuresSection}>
            <Heading style={sectionHeading}>Co Cię czeka?</Heading>

            <Section style={featureItem}>
              <Text style={featureText}>
                <TargetIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Typuj mecze</strong> i rywalizuj z
                  innymi graczami
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <UsersIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Wspólna rywalizacja</strong> w
                  prywatnym pokoju
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <TrophyIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Walcz o podium</strong> i zostań
                  mistrzem!
                </span>
              </Text>
            </Section>
          </Section>

          <Section style={taglineSection}>
            <Text style={tagline}>
              Obstawiaj <span style={taglineDot}>•</span> Rywalizuj{" "}
              <span style={taglineDot}>•</span> Wygrywaj
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={inviteLink}>
              Dołącz do pokoju
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            &copy; {new Date().getFullYear()} {appName}. Wszelkie prawa
            zastrzeżone.
          </Text>
          <Text style={footer}>
            Otrzymałeś tego e-maila, ponieważ użytkownik {inviterName} podał
            Twój adres, aby wysłać Ci zaproszenie.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InvitationEmail;

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
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0 24px 0",
  lineHeight: "1.3",
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

const roomCard = {
  backgroundColor: "#0f172a",
  border: "2px solid #22c55e",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const roomLabel = {
  color: "#94a3b8",
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "0 0 8px 0",
};

const roomNameStyle = {
  color: "#f8fafc",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const featuresSection = {
  margin: "32px 0",
};

const sectionHeading = {
  color: "#f8fafc",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
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

const taglineSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const tagline = {
  fontSize: "16px",
  color: "#94a3b8",
  fontWeight: "600",
  letterSpacing: "0.05em",
  margin: "0",
};

const taglineDot = {
  color: "#22c55e",
  fontWeight: "900",
  margin: "0 8px",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "36px",
  marginBottom: "36px",
};

const button = {
  backgroundColor: "#22c55e",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "16px 40px",
  display: "inline-block",
  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
  border: "none",
  transition: "all 0.3s ease",
};

const hr = {
  borderColor: "#334155",
  margin: "32px 0",
  borderWidth: "1px",
  borderStyle: "solid",
};

const footer = {
  color: "#94a3b8",
  fontSize: "13px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "12px 0",
};
