import React from "react";
import {
  Trophy,
  Users,
  Target,
  Lock,
  Globe,
  Calendar,
  Info,
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
      <div className="info-card">
        <h3 className="info-card-title">
          <Trophy size={20} />
          Informacje o turnieju
        </h3>
        <div className="info-grid">
          <div className="info-item-detail">
            <span className="info-label">Nazwa turnieju</span>
            <span className="info-value">{tournamentName}</span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Liga</span>
            <span className="info-value">{league}</span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Data rozpoczęcia</span>
            <span className="info-value">
              <Calendar size={14} style={{ marginRight: "4px" }} />
              {formatDate(startDate)}
            </span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Data zakończenia</span>
            <span className="info-value">
              <Calendar size={14} style={{ marginRight: "4px" }} />
              {formatDate(endDate)}
            </span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Czas trwania</span>
            <span className="info-value">{calculateDuration()}</span>
          </div>

          <div className="info-item-detail">
            <span className="info-label">Typ pokoju</span>
            <span className="info-value">
              {isPrivate ? (
                <>
                  <Lock size={14} style={{ marginRight: "4px" }} /> Prywatny
                </>
              ) : (
                <>
                  <Globe size={14} style={{ marginRight: "4px" }} /> Publiczny
                </>
              )}
            </span>
          </div>

          {isPrivate && inviteCode && (
            <div className="info-item-detail">
              <span className="info-label">Kod zaproszenia</span>
              <span className="info-value code">{inviteCode}</span>
            </div>
          )}
        </div>
      </div>

      {description ? (
        <div className="info-card">
          <h3 className="info-card-title">
            <Info size={20} />
            Opis pokoju
          </h3>
          <p className="info-text">{description}</p>
        </div>
      ) : (
        <div className="info-card">
          <h3 className="info-card-title">
            <Info size={20} />
            Opis pokoju
          </h3>
          <p className="info-text empty">
            Organizator nie dodał opisu dla tego pokoju.
          </p>
        </div>
      )}

      {rules ? (
        <div className="info-card">
          <h3 className="info-card-title">
            <Target size={20} />
            Zasady punktacji
          </h3>
          <div className="info-text rules">
            {rules.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="info-card">
          <h3 className="info-card-title">
            <Target size={20} />
            Zasady punktacji
          </h3>
          <div className="info-text rules">
            <p>
              📊 <strong>Dokładny wynik:</strong> 5 punktów
            </p>
            <p>
              🎯 <strong>Poprawny zwycięzca i różnica bramek:</strong> 3 punkty
            </p>
            <p>
              ✅ <strong>Poprawny zwycięzca:</strong> 1 punkt
            </p>
            <p>
              ❌ <strong>Błędna prognoza:</strong> 0 punktów
            </p>
          </div>
        </div>
      )}

      <div className="info-card info-card-highlight">
        <h3 className="info-card-title">
          <Users size={20} />
          Jak to działa?
        </h3>
        <div className="info-steps">
          <div className="info-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Typuj wyniki</h4>
              <p>Przewiduj wyniki meczów przed ich rozpoczęciem</p>
            </div>
          </div>

          <div className="info-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Zdobywaj punkty</h4>
              <p>Otrzymuj punkty za trafne prognozy według zasad</p>
            </div>
          </div>

          <div className="info-step">
            <span className="step-number">3</span>
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
