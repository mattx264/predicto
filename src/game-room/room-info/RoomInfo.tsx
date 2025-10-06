import React from "react";
import { Trophy, Users, Target, Lock } from "lucide-react";
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
              {new Date(startDate).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div className="info-item-detail">
            <span className="info-label">Data zakończenia</span>
            <span className="info-value">
              {new Date(endDate).toLocaleDateString("pl-PL")}
            </span>
          </div>
          <div className="info-item-detail">
            <span className="info-label">Typ pokoju</span>
            <span className="info-value">
              {isPrivate ? (
                <>
                  <Lock size={14} /> Prywatny
                </>
              ) : (
                <>Publiczny</>
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

      {description && (
        <div className="info-card">
          <h3 className="info-card-title">
            <Users size={20} />
            Opis pokoju
          </h3>
          <p className="info-text">{description}</p>
        </div>
      )}

      {rules && (
        <div className="info-card">
          <h3 className="info-card-title">
            <Target size={20} />
            Zasady punktacji
          </h3>
          <p className="info-text">{rules}</p>
        </div>
      )}
    </div>
  );
};

export default RoomInfo;
