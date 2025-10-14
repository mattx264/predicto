import React from "react";
import {
  Trophy,
  Users,
  DollarSign,
  Lock,
  Globe,
  Info,
  Check,
  Calendar,
  Sparkles,
  HelpCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import PrizePoolPreview from "../prize-pool-preview/PrizePoolPreview";
import type { RoomFormData } from "../../types/types";

import {
  entryFeeSignal,
  maxParticipantsSignal,
} from "../../signals/create-room-form.signals";

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

interface Props {
  formData: RoomFormData;
  errors: Record<string, string>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<RoomFormData>>;
  onNext: () => void;
  onBack: () => void;
  refs: {
    roomNameRef: React.RefObject<HTMLInputElement | null>;
    maxParticipantsRef: React.RefObject<HTMLInputElement | null>;
    entryFeeRef: React.RefObject<HTMLInputElement | null>;
    correctOutcomeRef: React.RefObject<HTMLInputElement | null>;
    exactScoreRef: React.RefObject<HTMLInputElement | null>;
    jokerCountRef: React.RefObject<HTMLInputElement | null>;
  };
}

const RoomSettingsStep: React.FC<Props> = ({
  formData,
  errors,
  handleInputChange,
  setFormData,
  onNext,
  onBack,
  refs,
}) => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Konfiguracja pokoju</h2>
        <p className="step-description">
          Ustaw parametry swojego pokoju typowania
        </p>
      </div>
      <div className="settings-form">
        <div className="form-group">
          <label className="form-label">
            <Trophy size={18} /> Nazwa pokoju *
          </label>
          <input
            ref={refs.roomNameRef}
            type="text"
            name="roomName"
            value={formData.roomName}
            onChange={handleInputChange}
            placeholder="np. Liga Mistrzów z Ekipą"
            className={`form-input ${errors.roomName ? "error" : ""}`}
          />
          {errors.roomName && (
            <span className="field-error">{errors.roomName}</span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">
            <Users size={18} /> Maksymalna liczba uczestników *
          </label>
          <input
            ref={refs.maxParticipantsRef}
            type="number"
            name="maxParticipants"
            value={maxParticipantsSignal.value}
            onChange={(e) => {
              maxParticipantsSignal.value = Number(e.target.value);
              handleInputChange(e);
            }}
            min="2"
            max="50"
            className={`form-input ${errors.maxParticipants ? "error" : ""}`}
          />
          {errors.maxParticipants && (
            <span className="field-error">{errors.maxParticipants}</span>
          )}
          <span className="field-hint">
            Minimalna liczba: 2, Maksymalna: 50
          </span>
        </div>
        <div className="form-group">
          <label className="form-label">
            <DollarSign size={18} /> Wpisowe (PLN) *
          </label>
          <input
            ref={refs.entryFeeRef}
            type="number"
            name="entryFee"
            value={entryFeeSignal.value}
            onChange={(e) => {
              entryFeeSignal.value = Number(e.target.value);
              handleInputChange(e);
            }}
            min="0"
            max="10000"
            step="5"
            className={`form-input ${errors.entryFee ? "error" : ""}`}
          />
          {errors.entryFee && (
            <span className="field-error">{errors.entryFee}</span>
          )}
          <span className="field-hint">Wpisz 0, aby grać za darmo.</span>

          <PrizePoolPreview />
        </div>
        <div className="form-group">
          <label className="form-label">
            <Lock size={18} /> Widoczność pokoju
          </label>
          <div className="privacy-toggle">
            <button
              type="button"
              className={`privacy-option ${
                !formData.isPrivate ? "active" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, isPrivate: false }))
              }
            >
              <Globe size={18} />
              <div className="option-text">
                <span className="option-title">Publiczny</span>
                <span className="option-desc">Każdy może dołączyć</span>
              </div>
            </button>
            <button
              type="button"
              className={`privacy-option ${formData.isPrivate ? "active" : ""}`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, isPrivate: true }))
              }
            >
              <Lock size={18} />
              <div className="option-text">
                <span className="option-title">Prywatny</span>
                <span className="option-desc">Tylko na zaproszenie</span>
              </div>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">
            <Info size={18} /> Opis pokoju (opcjonalnie)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Dodaj opis swojego pokoju..."
            className="form-textarea"
            rows={4}
          />
        </div>

        <div className="form-section-divider">
          <h3 className="form-section-title">Zasady Gry</h3>
        </div>
        <div className="form-group">
          <label className="form-label">
            <Check size={18} /> System Punktacji
            <Tooltip text="Ustaw ile punktów przyznawane jest za trafienie wyniku lub rezultatu meczu.">
              <HelpCircle size={16} className="tooltip-icon" />
            </Tooltip>
          </label>
          <div className="scoring-inputs">
            <div className="scoring-input-group">
              <label htmlFor="correctOutcome">
                Za trafiony rezultat (1X2):
              </label>
              <input
                ref={refs.correctOutcomeRef}
                type="number"
                name="rules.scoring.correctOutcome"
                value={formData.rules.scoring.correctOutcome}
                onChange={handleInputChange}
                className={`form-input ${
                  errors["rules.scoring.correctOutcome"] ? "error" : ""
                }`}
                min="1"
              />
              {errors["rules.scoring.correctOutcome"] && (
                <span className="field-error">
                  {errors["rules.scoring.correctOutcome"]}
                </span>
              )}
            </div>
            <div className="scoring-input-group">
              <label htmlFor="exactScore">Za dokładny wynik:</label>
              <input
                ref={refs.exactScoreRef}
                type="number"
                name="rules.scoring.exactScore"
                value={formData.rules.scoring.exactScore}
                onChange={handleInputChange}
                className={`form-input ${
                  errors["rules.scoring.exactScore"] ? "error" : ""
                }`}
                min="0"
              />
              {errors["rules.scoring.exactScore"] && (
                <span className="field-error">
                  {errors["rules.scoring.exactScore"]}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">
            <Calendar size={18} /> Termin Typowania
            <Tooltip text="Zdecyduj, do kiedy gracze mogą wysyłać lub edytować swoje typy.">
              <HelpCircle size={16} className="tooltip-icon" />
            </Tooltip>
          </label>
          <select
            name="rules.deadline"
            value={formData.rules.deadline}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="matchStart">Do startu każdego meczu</option>
            <option value="15minBefore">
              15 minut przed startem każdego meczu
            </option>
            <option value="roundStart">
              Do startu pierwszego meczu w kolejce
            </option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">
            <Sparkles size={18} /> Bonus "Joker" (Mnożnik x2)
            <Tooltip text="Pozwól graczom na użycie mnożnika x2 na jeden wybrany mecz w kolejce, aby zdobyć podwójne punkty.">
              <HelpCircle size={16} className="tooltip-icon" />
            </Tooltip>
          </label>
          <div className="joker-settings">
            <div className="privacy-toggle">
              <button
                type="button"
                className={`privacy-option ${
                  formData.rules.joker.enabled ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rules: {
                      ...prev.rules,
                      joker: { ...prev.rules.joker, enabled: true },
                    },
                  }))
                }
              >
                <Check size={18} />
                <div className="option-text">
                  <span className="option-title">Włączony</span>
                </div>
              </button>
              <button
                type="button"
                className={`privacy-option ${
                  !formData.rules.joker.enabled ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rules: {
                      ...prev.rules,
                      joker: { ...prev.rules.joker, enabled: false },
                    },
                  }))
                }
              >
                <AlertCircle size={18} />
                <div className="option-text">
                  <span className="option-title">Wyłączony</span>
                </div>
              </button>
            </div>
            {formData.rules.joker.enabled && (
              <div className="joker-count-input">
                <label htmlFor="jokerCount">Liczba jokerów na sezon:</label>
                <input
                  ref={refs.jokerCountRef}
                  type="number"
                  name="rules.joker.count"
                  value={formData.rules.joker.count}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors["rules.joker.count"] ? "error" : ""
                  }`}
                  min="1"
                  max="10"
                />
                {errors["rules.joker.count"] && (
                  <span className="field-error">
                    {errors["rules.joker.count"]}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft className="arrow-icon" />
          Wstecz
        </button>
        <button className="btn-next" onClick={onNext}>
          Dalej
          <ArrowLeft className="arrow-icon rotated" />
        </button>
      </div>
    </div>
  );
};

export default RoomSettingsStep;
