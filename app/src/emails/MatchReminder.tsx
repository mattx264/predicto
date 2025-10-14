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

interface MatchReminderEmailProps {
  username?: string;
  homeTeam?: string;
  awayTeam?: string;
  matchDate?: string;
  matchTime?: string;
  competition?: string;
  predictionLink?: string;
  roomName?: string;
  appName?: string;
  hoursUntilMatch?: number;
}

export const MatchReminderEmail = ({
  username = "MATYS",
  homeTeam = "Manchester United",
  awayTeam = "Liverpool",
  matchDate = "15 października 2025",
  matchTime = "20:45",
  competition = "Premier League",
  predictionLink = "https://example.com",
  roomName = "Premier League",
  appName = "Predicto",
  hoursUntilMatch = 24,
}: MatchReminderEmailProps) => {
  const previewText = ` Zbliża się mecz ${homeTeam} vs ${awayTeam}! Zostaw swój typ!`;

  const getUrgencyColor = (hours: number) => {
    if (hours <= 6) return "#ef4444";
    if (hours <= 12) return "#f59e0b";
    return "#22c55e";
  };

  const urgencyColor = getUrgencyColor(hoursUntilMatch);

  const CalendarIcon = () => (
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const ClockIcon = () => (
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
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const TrophyIcon = () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );

  const TargetIcon = () => (
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
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );

  const TimerIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <line x1="10" y1="2" x2="14" y2="2"></line>
      <line x1="12" y1="14" x2="15" y2="11"></line>
      <circle cx="12" cy="14" r="8"></circle>
    </svg>
  );

  const LightbulbIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: "middle", marginRight: "8px" }}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
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

          <Section style={headerSection}>
            <div style={{ textAlign: "center" }}>
              <TrophyIcon />
            </div>
            <Heading style={heading}>Nadchodzący mecz!</Heading>
          </Section>

          <Text style={paragraph}>Cześć {username},</Text>

          <Text style={paragraph}>
            Przypominamy o zbliżającym się meczu w Twoim pokoju{" "}
            <strong style={strongText}>"{roomName}"</strong>. Nie zapomnij
            zostawić swojego typu!
          </Text>

          <Section style={matchCard}>
            <Text style={competitionLabel}>{competition}</Text>

            <Text style={teamName}>{homeTeam}</Text>
            <Text style={vsText}>VS</Text>
            <Text style={teamName}>{awayTeam}</Text>

            <Section style={matchInfoSection}>
              <table style={{ width: "100%", margin: "0 auto" }}>
                <tr>
                  <td style={{ textAlign: "center", padding: "0 20px" }}>
                    <div style={infoBlock}>
                      <Text style={infoLabel}>
                        <CalendarIcon />
                        <span style={{ verticalAlign: "middle" }}>Data</span>
                      </Text>
                      <Text style={infoValue}>{matchDate}</Text>
                    </div>
                  </td>
                  <td style={{ width: "1px", padding: "0" }}>
                    <div style={infoDivider}></div>
                  </td>
                  <td style={{ textAlign: "center", padding: "0 20px" }}>
                    <div style={infoBlock}>
                      <Text style={infoLabel}>
                        <ClockIcon />
                        <span style={{ verticalAlign: "middle" }}>Godzina</span>
                      </Text>
                      <Text style={infoValue}>{matchTime}</Text>
                    </div>
                  </td>
                </tr>
              </table>
            </Section>

            <Section style={{ ...timeAlert, backgroundColor: urgencyColor }}>
              <Text style={timeAlertText}>
                <TimerIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Do meczu pozostało: <strong>{hoursUntilMatch}h</strong>
                </span>
              </Text>
            </Section>
          </Section>

          <Section style={motivationBox}>
            <Text style={motivationText}>
              <TargetIcon />
              <span style={{ verticalAlign: "middle" }}>
                Każdy typ się liczy! Nie przegap okazji do zdobycia punktów i
                awansu w rankingu.
              </span>
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={predictionLink}>
              Zostaw swój typ
            </Button>
          </Section>

          <Text style={reminderText}>
            <LightbulbIcon />
            <span style={{ verticalAlign: "middle" }}>
              Pamiętaj: Typ możesz oddać do momentu rozpoczęcia meczu!
            </span>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            &copy; {new Date().getFullYear()} {appName}. Wszelkie prawa
            zastrzeżone.
          </Text>
          <Text style={footer}>
            Otrzymujesz te przypomnienia, ponieważ jesteś członkiem pokoju "
            {roomName}".
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MatchReminderEmail;

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

const headerSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const heading = {
  color: "#f8fafc",
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "16px 0 24px 0",
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

const matchCard = {
  backgroundColor: "#0f172a",
  border: "2px solid #334155",
  borderRadius: "16px",
  padding: "32px 24px",
  margin: "32px 0",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  textAlign: "center" as const,
};

const competitionLabel = {
  color: "#22c55e",
  fontSize: "14px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
};

const teamName = {
  color: "#f8fafc",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "8px 0",
  lineHeight: "1.3",
  textAlign: "center" as const,
};

const vsText = {
  color: "#64748b",
  fontSize: "18px",
  fontWeight: "900",
  margin: "12px 0",
  textAlign: "center" as const,
};

const matchInfoSection = {
  margin: "24px 0",
  padding: "20px 0",
  borderTop: "1px solid #334155",
  borderBottom: "1px solid #334155",
};

const infoBlock = {
  textAlign: "center" as const,
};

const infoLabel = {
  color: "#94a3b8",
  fontSize: "13px",
  margin: "0 0 8px 0",
  fontWeight: "600",
  display: "block",
};

const infoValue = {
  color: "#f8fafc",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
  display: "block",
};

const infoDivider = {
  width: "1px",
  height: "60px",
  backgroundColor: "#334155",
  margin: "0 auto",
};

const timeAlert = {
  backgroundColor: "#22c55e",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "24px",
  textAlign: "center" as const,
};

const timeAlertText = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const motivationBox = {
  backgroundColor: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  borderRadius: "12px",
  padding: "20px",
  margin: "24px 0",
};

const motivationText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
  textAlign: "center" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "24px",
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
};

const reminderText = {
  color: "#94a3b8",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "16px 0",
  fontStyle: "italic" as const,
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
