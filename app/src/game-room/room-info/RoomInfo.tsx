import React from "react";
import {
  Trophy,
  Users,
  Target,
  Lock,
  Globe,
  Calendar,
  Info,
  Clock,
  Hash
} from "lucide-react";
import "./RoomInfo.css";

interface RoomInfoProps {
  tournamentName: string;
  league: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  inviteCode?: string;
  description?: string;
  rules?: string;
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  tournamentName,
  league,
  startDate,
  endDate,
  isPrivate,
  inviteCode,
  description,
  rules,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 dzień";
    if (diffDays < 30) return `${diffDays} dni`;

    const months = Math.floor(diffDays / 30);
    if (months === 1) return "1 miesiąc";
    return `${months} miesięcy`;
  };

  return (
    <div className="info-section">

      <div className="info-card main-card">
        <h3 className="info-card-title">
          <div className="title-icon-wrapper">
            <Trophy size={20} />
          </div>
          Informacje o turnieju
        </h3>

        <div className="info-grid">
          <div className="info-item-detail">
            <span className="info-label">Nazwa turnieju</span>
            <span className="info-value highlight">{tournamentName}</span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Liga</span>
            <span className="info-value">{league}</span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Data rozpoczęcia</span>
            <span className="info-value">
              <Calendar size={16} className="value-icon" />
              {formatDate(startDate)}
            </span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Data zakończenia</span>
            <span className="info-value">
              <Calendar size={16} className="value-icon" />
              {formatDate(endDate)}
            </span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Czas trwania</span>
            <span className="info-value">
              <Clock size={16} className="value-icon" />
              {calculateDuration()}
            </span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Typ pokoju</span>
            <span className="info-value">
              {isPrivate ? (
                <>
                  <Lock size={16} className="value-icon" /> Prywatny
                </>
              ) : (
                <>
                  <Globe size={16} className="value-icon" /> Publiczny
                </>
              )}
            </span>
          </div>

          {isPrivate && inviteCode && (
            <div className="info-item-detail full-width-mobile">
              <span className="info-label">Kod zaproszenia</span>
              <div className="invite-code-wrapper">
                <Hash size={16} className="code-icon" />
                <span className="info-value code">{inviteCode}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="info-card">
        <h3 className="info-card-title">
          <div className="title-icon-wrapper">
            <Info size={20} />
          </div>
          Opis pokoju
        </h3>
        {description ? (
          <p className="info-text">{description}</p>
        ) : (
          <p className="info-text empty">
            Organizator nie dodał opisu dla tego pokoju.
          </p>
        )}
      </div>

      <div className="info-card">
        <h3 className="info-card-title">
          <div className="title-icon-wrapper">
            <Target size={20} />
          </div>
          Zasady punktacji
        </h3>
        <div className="info-text rules">
          {rules ? (
            rules.split("\n").map((line, index) => (
              <div key={index} className="rule-item">
                <span className="rule-dot" />
                <p>{line}</p>
              </div>
            ))
          ) : (
            <>
              <div className="rule-item">
                <span className="rule-emoji">📊</span>
                <p><strong>Dokładny wynik:</strong> 5 punktów</p>
              </div>
              <div className="rule-item">
                <span className="rule-emoji">🎯</span>
                <p><strong>Poprawny zwycięzca i różnica bramek:</strong> 3 punkty</p>
              </div>
              <div className="rule-item">
                <span className="rule-emoji">✅</span>
                <p><strong>Poprawny zwycięzca:</strong> 1 punkt</p>
              </div>
              <div className="rule-item error">
                <span className="rule-emoji">❌</span>
                <p><strong>Błędna prognoza:</strong> 0 punktów</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="info-card info-card-highlight">
        <h3 className="info-card-title">
          <div className="title-icon-wrapper">
            <Users size={20} />
          </div>
          Jak to działa?
        </h3>
        <div className="info-steps">
          <div className="info-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Typuj wyniki</h4>
              <p>Przewiduj wyniki meczów przed ich rozpoczęciem</p>
            </div>
          </div>

          <div className="info-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Zdobywaj punkty</h4>
              <p>Otrzymuj punkty za trafne prognozy według zasad</p>
            </div>
          </div>

          <div className="info-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Wygraj nagrodę</h4>
              <p>Najlepsi typerzy dzielą się pulą nagród</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;