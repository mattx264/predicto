import React from "react";
import {
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Lock,
  Globe,
  Check,
  Sparkles,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PrizePoolPreview from "../prize-pool-preview/PrizePoolPreview";
import { TournamentDto } from "../../services/nsawg/client";
import type { RoomFormData } from "../../types/types";

interface Props {
  formData: RoomFormData;
  selectedTemplate: TournamentDto | undefined;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  error?: string;
}

const SummaryStep: React.FC<Props> = ({
  formData,
  selectedTemplate,
  onSubmit,
  onBack,
  isSubmitting = false,
  error,
}) => {
  const deadlineOptions: { [key: string]: string } = {
    matchStart: "Do startu każdego meczu",
    "15minBefore": "15 minut przed startem meczu",
    roundStart: "Do startu pierwszego meczu w kolejce",
  };

  if (!selectedTemplate) {
    return (
      <div className="step-content">
        <p>Błąd: Nie wybrano szablonu turnieju. Wróć do pierwszego kroku.</p>
        <div className="step-actions">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft className="arrow-icon" />
            Wstecz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Podsumowanie</h2>
        <p className="step-description">
          Sprawdź wszystkie dane przed utworzeniem pokoju
        </p>
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            padding: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <AlertCircle size={20} color="#dc2626" />
          <span style={{ color: "#dc2626", fontSize: "14px" }}>{error}</span>
        </div>
      )}

      <div className="summary-card">
        <h3 className="summary-title">Szczegóły pokoju</h3>

        <div className="summary-section">
          <h4 className="section-title">Turniej</h4>
          <div className="summary-item">
            <img
              src={selectedTemplate.logoUrl}
              alt={selectedTemplate.league}
              className="summary-logo"
            />
            <div className="item-content">
              <span className="item-label">Nazwa turnieju</span>
              <span className="item-value">{selectedTemplate.name}</span>
            </div>
          </div>
          <div className="summary-item">
            <Trophy className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Liga</span>
              <span className="item-value">{selectedTemplate.league}</span>
            </div>
          </div>
          <div className="summary-item">
            <Calendar className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Okres trwania</span>
              <span className="item-value">
                {selectedTemplate.startDate && selectedTemplate.endDate
                  ? `${new Date(selectedTemplate.startDate).toLocaleDateString(
                    "pl-PL"
                  )} - ${new Date(selectedTemplate.endDate).toLocaleDateString(
                    "pl-PL"
                  )}`
                  : "Brak danych o dacie"}
              </span>
            </div>
          </div>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-section">
          <h4 className="section-title">Ustawienia</h4>
          <div className="summary-item">
            <Trophy className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Nazwa pokoju</span>
              <span className="item-value">{formData.roomName}</span>
            </div>
          </div>
          <div className="summary-item">
            <Users className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Maksymalna liczba uczestników</span>
              <span className="item-value">
                {formData.maxParticipants} graczy
              </span>
            </div>
          </div>
          <div className="summary-item">
            <DollarSign className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Wpisowe</span>
              <span className="item-value">{formData.entryFee} Monet</span>
            </div>
          </div>
          <div className="summary-item">
            {formData.isPrivate ? (
              <Lock className="item-icon-svg" size={20} />
            ) : (
              <Globe className="item-icon-svg" size={20} />
            )}
            <div className="item-content">
              <span className="item-label">Widoczność</span>
              <span className="item-value">
                {formData.isPrivate ? "Prywatny" : "Publiczny"}
              </span>
            </div>
          </div>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-section">
          <h4 className="section-title">Zasady Gry</h4>
          <div className="summary-item">
            <Check className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Punkty za dokładny wynik</span>
              <span className="item-value">
                {formData.rules.scoring.exactScore} pkt
              </span>
            </div>
          </div>
          <div className="summary-item">
            <Check className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Punkty za rezultat 1X2</span>
              <span className="item-value">
                {formData.rules.scoring.correctOutcome} pkt
              </span>
            </div>
          </div>
          <div className="summary-item">
            <Calendar className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Termin typowania</span>
              <span className="item-value">
                {deadlineOptions[formData.rules.deadline]}
              </span>
            </div>
          </div>
          <div className="summary-item">
            <Sparkles className="item-icon-svg" size={20} />
            <div className="item-content">
              <span className="item-label">Bonus "Joker"</span>
              <span className="item-value">
                {formData.rules.joker.enabled
                  ? `Włączony (${formData.rules.joker.count} na sezon)`
                  : "Wyłączony"}
              </span>
            </div>
          </div>
        </div>

        <div className="summary-divider"></div>

        <PrizePoolPreview />

        {formData.description && (
          <>
            <div className="summary-divider"></div>
            <div className="summary-section">
              <h4 className="section-title">Opis</h4>
              <p className="summary-text">{formData.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="arrow-icon" />
          Wstecz
        </button>
        <button
          className="btn-create"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="spinner" />
              Tworzenie...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Utwórz Pokój
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;