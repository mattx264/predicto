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

interface InactiveUserEmailProps {
  username?: string;
  lastActiveDate?: string;
  daysInactive?: number;
  returnLink?: string;
  appName?: string;
  missedMatches?: number;
  currentRanking?: number;
  roomNames?: string[];
}

export const InactiveUserEmail = ({
  username = "Gracz",
  lastActiveDate = "15 września 2025",
  daysInactive = 14,
  returnLink = "http://localhost:5173/",
  appName = "Predicto",
  missedMatches = 12,
  currentRanking = 5,
  roomNames = ["Mistrzowie Ligi", "Typerzy Pro"],
}: InactiveUserEmailProps) => {
  const previewText = `${username}, tęsknimy za Tobą w ${appName}! 💚`;

  const HeartCrackIcon = () => (
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      <path d="m12 13-1-1 2-2-3-3 2-2"></path>
    </svg>
  );

  const CalendarOffIcon = () => (
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
      <path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path>
      <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path>
      <path d="M16 2v4"></path>
      <path d="M3 10h7"></path>
      <path d="M21 10h-5.5"></path>
      <line x1="2" y1="2" x2="22" y2="22"></line>
    </svg>
  );

  const TrendingDownIcon = () => (
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
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
      <polyline points="16 17 22 17 22 11"></polyline>
    </svg>
  );

  const SparklesIcon = () => (
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  );

  const UsersIcon = () => (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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

  const GiftIcon = () => (
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
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
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
            <HeartCrackIcon />
          </Section>

          <Heading style={heading}>Tęsknimy za Tobą! 💚</Heading>

          <Text style={paragraph}>Cześć {username},</Text>

          <Text style={paragraph}>
            Zauważyliśmy, że nie byłeś aktywny w{" "}
            <strong style={strongText}>{appName}</strong> od{" "}
            <strong style={strongText}>{lastActiveDate}</strong> (to już{" "}
            {daysInactive} dni!).
          </Text>

          <Text style={paragraph}>
            Twoi rywale nie próżnują, a Ty tracisz okazję do zdobywania punktów
            i utrzymania pozycji w rankingu. Wracaj do gry!
          </Text>
          <Section style={statsCard}>
            <Heading style={statsHeading}>
              Co się działo pod Twoją nieobecność?
            </Heading>

            <Section style={statItem}>
              <Text style={statText}>
                <CalendarOffIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Przegapiłeś{" "}
                  <strong style={statValue}>{missedMatches} meczów</strong> do
                  obstawienia
                </span>
              </Text>
            </Section>

            <Section style={statItem}>
              <Text style={statText}>
                <TrendingDownIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Twoja pozycja w rankingu:{" "}
                  <strong style={statValue}>#{currentRanking}</strong> (może
                  spaść!)
                </span>
              </Text>
            </Section>

            <Section style={statItem}>
              <Text style={statText}>
                <UsersIcon />
                <span style={{ verticalAlign: "middle" }}>
                  Twoje pokoje czekają:{" "}
                  <strong style={statValue}>{roomNames.join(", ")}</strong>
                </span>
              </Text>
            </Section>
          </Section>

          <Section style={whatsNewSection}>
            <Heading style={sectionHeading}>
              <SparklesIcon />
              <span style={{ verticalAlign: "middle" }}>
                Co nowego w {appName}?
              </span>
            </Heading>

            <Section style={featureItem}>
              <Text style={featureText}>
                <TrophyIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Nowe osiągnięcia</strong> –
                  Zdobywaj odznaki i wyróżnienia za swoje dokonania!
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <GiftIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Bonus powitalny</strong> – Wróć
                  teraz i otrzymaj dodatkowe punkty za pierwsze typy!
                </span>
              </Text>
            </Section>

            <Section style={featureItem}>
              <Text style={featureText}>
                <UsersIcon />
                <span style={{ verticalAlign: "middle" }}>
                  <strong style={strongText}>Nowi rywale</strong> – Dołączyli
                  nowi gracze do Twoich pokoi. Nie daj się wyprzedzić!
                </span>
              </Text>
            </Section>
          </Section>

          <Section style={motivationBox}>
            <Text style={motivationQuote}>
              "Najlepszy moment na powrót to TERAZ. Nie czekaj – każdy dzień to
              nowe szanse na punkty!"
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={returnLink}>
              Wracam do gry!
            </Button>
          </Section>

          <Text style={reminderText}>
            Zbliżające się mecze już czekają na Twoje typy. Nie trać czasu!
          </Text>

          <Hr style={hr} />

          <Section style={unsubscribeSection}>
            <Text style={unsubscribeText}>
              Nie chcesz już otrzymywać przypomnień? Możesz wyłączyć
              powiadomienia w ustawieniach konta.
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            &copy; {new Date().getFullYear()} {appName}. Wszelkie prawa
            zastrzeżone.
          </Text>
          <Text style={footer}>
            Otrzymałeś tego emaila, ponieważ jesteś zarejestrowanym
            użytkownikiem {appName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InactiveUserEmail;

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

const statsCard = {
  backgroundColor: "#0f172a",
  border: "2px solid #334155",
  borderRadius: "16px",
  padding: "32px 24px",
  margin: "32px 0",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
};

const statsHeading = {
  color: "#f8fafc",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const statItem = {
  margin: "16px 0",
};

const statText = {
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
};

const statValue = {
  color: "#22c55e",
  fontWeight: "700",
};

const whatsNewSection = {
  margin: "32px 0",
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

const motivationBox = {
  backgroundColor: "rgba(168, 85, 247, 0.1)",
  border: "2px solid rgba(168, 85, 247, 0.3)",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
  textAlign: "center" as const,
};

const motivationQuote = {
  color: "#e9d5ff",
  fontSize: "17px",
  fontWeight: "600",
  lineHeight: "28px",
  margin: "0",
  fontStyle: "italic" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "36px",
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
  padding: "18px 48px",
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

const unsubscribeSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const unsubscribeText = {
  color: "#64748b",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
};

const footer = {
  color: "#94a3b8",
  fontSize: "13px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "12px 0",
};
