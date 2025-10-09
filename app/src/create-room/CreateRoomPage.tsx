import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Lock,
  Globe,
  Info,
  Check,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CreateRoomPage.css";
import PrizePoolPreview from "./prize-pool-preview/PrizePoolPreview";

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

interface TournamentTemplate {
  id: string;
  name: string;
  league: string;
  description: string;
  matchesCount: number;
  startDate: string;
  endDate: string;
  logoUrl: string;
}

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const roomNameRef = useRef<HTMLInputElement>(null);
  const maxParticipantsRef = useRef<HTMLInputElement>(null);
  const entryFeeRef = useRef<HTMLInputElement>(null);
  const correctOutcomeRef = useRef<HTMLInputElement>(null);
  const exactScoreRef = useRef<HTMLInputElement>(null);
  const jokerCountRef = useRef<HTMLInputElement>(null);

  const tournamentTemplates: TournamentTemplate[] = [
    {
      id: "1",
      name: "Liga Mistrzów UEFA 2025/26 - Faza Grupowa",
      league: "Champions League",
      description: "Wszystkie mecze fazy grupowej Ligi Mistrzów UEFA.",
      matchesCount: 96,
      startDate: "2025-09-16",
      endDate: "2025-12-10",
      logoUrl: "/tournament-logos/championsleague.png",
    },
    {
      id: "2",
      name: "Premier League 2025/26 - Runda Jesienna",
      league: "Premier League",
      description:
        "Typuj wyniki pierwszych 19 kolejek angielskiej Premier League.",
      matchesCount: 190,
      startDate: "2025-08-16",
      endDate: "2025-12-28",
      logoUrl: "/tournament-logos/premier-league.png",
    },
    {
      id: "3",
      name: "La Liga 2025/26 - Początek Sezonu",
      league: "La Liga",
      description: "Pierwsza połowa sezonu hiszpańskiej ekstraklasy.",
      matchesCount: 190,
      startDate: "2025-08-15",
      endDate: "2025-12-21",
      logoUrl: "/tournament-logos/laliga.png",
    },
    {
      id: "4",
      name: "Bundesliga 2025/26 - Runda Jesienna",
      league: "Bundesliga",
      description: "Wszystkie mecze rundy jesiennej Bundesligi.",
      matchesCount: 153,
      startDate: "2025-08-22",
      endDate: "2025-12-21",
      logoUrl: "/tournament-logos/bundesliga.png",
    },
    {
      id: "5",
      name: "Serie A 2025/26 - Pierwsze 15 kolejek",
      league: "Serie A",
      description: "Początek zmagań we włoskiej Serie A, pierwsze 15 kolejek.",
      matchesCount: 150,
      startDate: "2025-08-23",
      endDate: "2025-12-14",
      logoUrl: "/tournament-logos/serie-a.png",
    },
    {
      id: "6",
      name: "Ekstraklasa 2025/26 - Runda Jesienna",
      league: "Ekstraklasa",
      description: "Wszystkie mecze rundy jesiennej polskiej ekstraklasy.",
      matchesCount: 153,
      startDate: "2025-07-18",
      endDate: "2025-12-15",
      logoUrl: "/tournament-logos/ekstraklasa.png",
    },
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tournamentTemplateId: "",
    roomName: "",
    maxParticipants: 10,
    entryFee: 50,
    isPrivate: false,
    description: "",
    rules: {
      scoring: {
        exactScore: 5,
        correctOutcome: 2,
      },
      deadline: "matchStart",
      joker: {
        enabled: true,
        count: 1,
      },
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const selectedTemplate = tournamentTemplates.find(
    (t) => t.id === formData.tournamentTemplateId
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let valueToSet: string | number | boolean = value;
    if (type === "checkbox") {
      valueToSet = checked;
    } else if (type === "number") {
      valueToSet = value === "" ? "" : parseInt(value, 10);
    }

    setFormData((prev) => {
      const newFormData = JSON.parse(JSON.stringify(prev));
      const keys = name.split(".");

      let currentLevel: any = newFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        currentLevel = currentLevel[keys[i]];
      }
      currentLevel[keys[keys.length - 1]] = valueToSet;

      return newFormData;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.tournamentTemplateId) {
      newErrors.tournamentTemplateId = "Musisz wybrać szablon turnieju";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    let firstErrorField: React.RefObject<HTMLInputElement | null> | null = null;
    if (!formData.roomName.trim()) {
      newErrors.roomName = "Nazwa pokoju jest wymagana";
      if (!firstErrorField) firstErrorField = roomNameRef;
    } else if (formData.roomName.length < 3) {
      newErrors.roomName = "Nazwa pokoju musi mieć co najmniej 3 znaki";
      if (!firstErrorField) firstErrorField = roomNameRef;
    }

    if (formData.maxParticipants < 2) {
      newErrors.maxParticipants = "Minimalna liczba uczestników to 2";
      if (!firstErrorField) firstErrorField = maxParticipantsRef;
    } else if (formData.maxParticipants > 50) {
      newErrors.maxParticipants = "Maksymalna liczba uczestników to 50";
      if (!firstErrorField) firstErrorField = maxParticipantsRef;
    }

    if (formData.entryFee < 0) {
      newErrors.entryFee = "Wpisowe nie może być ujemne";
      if (!firstErrorField) firstErrorField = entryFeeRef;
    } else if (formData.entryFee > 10000) {
      newErrors.entryFee = "Maksymalne wpisowe to 10000 PLN";
      if (!firstErrorField) firstErrorField = entryFeeRef;
    }

    const { rules } = formData;
    if (rules.scoring.correctOutcome < 1) {
      newErrors["rules.scoring.correctOutcome"] =
        "Punkty muszą być większe od 0";
      if (!firstErrorField) firstErrorField = correctOutcomeRef;
    }
    if (rules.scoring.exactScore <= rules.scoring.correctOutcome) {
      newErrors["rules.scoring.exactScore"] =
        "Musi być więcej punktów niż za trafiony rezultat";
      if (!firstErrorField) firstErrorField = exactScoreRef;
    }

    if (rules.joker.enabled) {
      if (rules.joker.count < 1) {
        newErrors["rules.joker.count"] =
          "Liczba jokerów musi wynosić co najmniej 1";
        if (!firstErrorField) firstErrorField = jokerCountRef;
      } else if (rules.joker.count > 10) {
        newErrors["rules.joker.count"] = "Maksymalna liczba jokerów to 10";
        if (!firstErrorField) firstErrorField = jokerCountRef;
      }
    }

    setErrors(newErrors);

    if (firstErrorField?.current && Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        firstErrorField.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstErrorField.current?.focus();
      }, 100);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    console.log("Tworzenie pokoju:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/rooms");
  };

  const calculatePrizePool = () =>
    Number(formData.entryFee) * Number(formData.maxParticipants);

  return (
    <div className="create-room-page">
      <div className="create-room-container" ref={contentRef}>
        <div className="create-room-header">
          <button className="back-btn" onClick={() => navigate("/rooms")}>
            <ArrowLeft className="back-icon" />
            <span>Powrót do pokoi</span>
          </button>
          <div className="header-content">
            <h1 className="page-title">
              <Sparkles className="title-icon" />
              Stwórz Nowy Pokój
            </h1>
            <p className="page-subtitle">
              Wybierz turniej i skonfiguruj swój pokój do typowania
            </p>
          </div>
        </div>

        <div className="progress-steps">
          <div
            className={`step ${step >= 1 ? "active" : ""} ${
              step > 1 ? "completed" : ""
            }`}
          >
            <div className="step-circle">
              {step > 1 ? <Check size={20} /> : "1"}
            </div>
            <span className="step-label">Wybierz Turniej</span>
          </div>
          <div className="step-line"></div>
          <div
            className={`step ${step >= 2 ? "active" : ""} ${
              step > 2 ? "completed" : ""
            }`}
          >
            <div className="step-circle">
              {step > 2 ? <Check size={20} /> : "2"}
            </div>
            <span className="step-label">Ustawienia</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <div className="step-circle">3</div>
            <span className="step-label">Podsumowanie</span>
          </div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Wybierz szablon turnieju</h2>
              <p className="step-description">
                Wybierz gotowy turniej z meczami przygotowanymi przez
                administratorów
              </p>
            </div>
            {errors.tournamentTemplateId && (
              <div className="error-message">
                <AlertCircle size={18} />
                <span>{errors.tournamentTemplateId}</span>
              </div>
            )}
            <div className="templates-swiper-container">
              <Swiper
                modules={[Navigation, Pagination, Keyboard]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                keyboard={{ enabled: true, onlyInViewport: true }}
                className="templates-swiper"
              >
                {tournamentTemplates.map((template) => (
                  <SwiperSlide key={template.id}>
                    <div
                      className={`template-card ${
                        formData.tournamentTemplateId === template.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          tournamentTemplateId: template.id,
                        })
                      }
                    >
                      {formData.tournamentTemplateId === template.id && (
                        <div className="selected-badge">
                          <Check size={16} />
                        </div>
                      )}
                      <div className="template-logo-container">
                        <img
                          src={template.logoUrl}
                          alt={template.league}
                          className="template-logo"
                        />
                      </div>
                      <h3 className="template-name">{template.name}</h3>
                      <div className="template-league">
                        <Trophy size={14} />
                        <span>{template.league}</span>
                      </div>
                      <p className="template-description">
                        {template.description}
                      </p>
                      <div className="template-info">
                        <div className="info-item">
                          <Calendar size={14} />
                          <span>
                            {new Date(template.startDate).toLocaleDateString(
                              "pl-PL"
                            )}
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="matches-count">
                            {template.matchesCount} meczów
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="swiper-button-prev-custom">
                <ChevronLeft size={24} />
              </button>
              <button className="swiper-button-next-custom">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="step-actions">
              <button
                className="btn-next"
                onClick={handleNext}
                disabled={!formData.tournamentTemplateId}
              >
                Dalej <ArrowLeft className="arrow-icon rotated" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
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
                  ref={roomNameRef}
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
                  ref={maxParticipantsRef}
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  min="2"
                  max="50"
                  className={`form-input ${
                    errors.maxParticipants ? "error" : ""
                  }`}
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
                  ref={entryFeeRef}
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleInputChange}
                  min="0"
                  max="10000"
                  step="5"
                  className={`form-input ${errors.entryFee ? "error" : ""}`}
                />
                {errors.entryFee && (
                  <span className="field-error">{errors.entryFee}</span>
                )}
                <span className="field-hint">Wpisz 0, aby grać za darmo.</span>
                <PrizePoolPreview
                  entryFee={Number(formData.entryFee)}
                  maxParticipants={Number(formData.maxParticipants)}
                />
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
                      setFormData({ ...formData, isPrivate: false })
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
                    className={`privacy-option ${
                      formData.isPrivate ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, isPrivate: true })
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
                      ref={correctOutcomeRef}
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
                      ref={exactScoreRef}
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
                      <label htmlFor="jokerCount">
                        Liczba jokerów na sezon:
                      </label>
                      <input
                        ref={jokerCountRef}
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
              <button className="btn-back" onClick={handleBack}>
                <ArrowLeft className="arrow-icon" />
                Wstecz
              </button>
              <button className="btn-next" onClick={handleNext}>
                Dalej
                <ArrowLeft className="arrow-icon rotated" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Podsumowanie</h2>
              <p className="step-description">
                Sprawdź wszystkie dane przed utworzeniem pokoju
              </p>
            </div>
            <div className="summary-card">
              <h3 className="summary-title">Szczegóły pokoju</h3>
              <div className="summary-section">
                <h4 className="section-title">Turniej</h4>
                <div className="summary-item">
                  <img
                    src={selectedTemplate?.logoUrl}
                    alt={selectedTemplate?.league}
                    className="summary-logo"
                  />
                  <div className="item-content">
                    <span className="item-label">Nazwa turnieju</span>
                    <span className="item-value">{selectedTemplate?.name}</span>
                  </div>
                </div>
                <div className="summary-item">
                  <Trophy className="item-icon-svg" size={20} />
                  <div className="item-content">
                    <span className="item-label">Liga</span>
                    <span className="item-value">
                      {selectedTemplate?.league}
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <Calendar className="item-icon-svg" size={20} />
                  <div className="item-content">
                    <span className="item-label">Okres trwania</span>
                    <span className="item-value">
                      {selectedTemplate &&
                        `${new Date(
                          selectedTemplate.startDate
                        ).toLocaleDateString("pl-PL")} - ${new Date(
                          selectedTemplate.endDate
                        ).toLocaleDateString("pl-PL")}`}
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
                    <span className="item-label">
                      Maksymalna liczba uczestników
                    </span>
                    <span className="item-value">
                      {formData.maxParticipants} graczy
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <DollarSign className="item-icon-svg" size={20} />
                  <div className="item-content">
                    <span className="item-label">Wpisowe</span>
                    <span className="item-value">{formData.entryFee} PLN</span>
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
                      {
                        {
                          matchStart: "Do startu każdego meczu",
                          "15minBefore": "15 minut przed startem meczu",
                          roundStart: "Do startu pierwszego meczu w kolejce",
                        }[formData.rules.deadline]
                      }
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

              <PrizePoolPreview
                entryFee={Number(formData.entryFee)}
                maxParticipants={Number(formData.maxParticipants)}
              />

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
              <button className="btn-back" onClick={handleBack}>
                <ArrowLeft className="arrow-icon" />
                Wstecz
              </button>
              <button className="btn-create" onClick={handleSubmit}>
                <Sparkles size={20} />
                Utwórz Pokój
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoomPage;
