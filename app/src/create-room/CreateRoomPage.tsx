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
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CreateRoomPage.css";
import PrizePoolPreview from "./prize-pool-preview/PrizePoolPreview";

interface TournamentTemplate {
  id: string;
  name: string;
  league: string;
  description: string;
  matchesCount: number;
  startDate: string;
  endDate: string;
  logoUrl: string; // Zmienione z image na logoUrl
}

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const maxParticipantsRef = useRef<HTMLInputElement>(null);
  const entryFeeRef = useRef<HTMLInputElement>(null);

  const tournamentTemplates: TournamentTemplate[] = [
    {
      id: "1",
      name: "Liga Mistrzów UEFA 2024/25 - Faza Grupowa",
      league: "Champions League",
      description: "Wszystkie mecze fazy grupowej Ligi Mistrzów UEFA",
      matchesCount: 96,
      startDate: "2024-09-17",
      endDate: "2024-12-11",
      logoUrl: "/tournament-logos/championsleague.jpg",
    },
    {
      id: "2",
      name: "Premier League - Kolejki 10-20",
      league: "Premier League",
      description: "Typuj wyniki 11 kolejek Premier League",
      matchesCount: 110,
      startDate: "2024-10-26",
      endDate: "2025-01-04",
      logoUrl: "/tournament-logos/premier-league.jpg",
    },
    {
      id: "3",
      name: "La Liga - Sezon 2024/25 Część 1",
      league: "La Liga",
      description: "Pierwsza połowa sezonu hiszpańskiej ekstraklasy",
      matchesCount: 190,
      startDate: "2024-08-15",
      endDate: "2024-12-22",
      logoUrl: "/tournament-logos/laliga.jpg",
    },
    {
      id: "4",
      name: "Bundesliga - Runda Jesienna",
      league: "Bundesliga",
      description: "Wszystkie mecze rundy jesiennej Bundesligi",
      matchesCount: 153,
      startDate: "2024-08-23",
      endDate: "2024-12-15",
      logoUrl: "/tournament-logos/bundesliga.jpg",
    },
    {
      id: "5",
      name: "Serie A - Początek Sezonu",
      league: "Serie A",
      description: "Pierwsze 15 kolejek włoskiej Serie A",
      matchesCount: 150,
      startDate: "2024-08-17",
      endDate: "2024-12-08",
      logoUrl: "/tournament-logos/serie-a.png",
    },
    {
      id: "6",
      name: "Ekstraklasa - Runda Jesienna 2024",
      league: "Ekstraklasa",
      description: "Wszystkie mecze rundy jesiennej polskiej ekstraklasy",
      matchesCount: 90,
      startDate: "2024-07-19",
      endDate: "2024-12-07",
      logoUrl: "/tournament-logos/ekstraklasa.jpg",
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
    rules: "",
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

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
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
    let firstErrorField: HTMLElement | null = null;

    if (!formData.roomName.trim()) {
      newErrors.roomName = "Nazwa pokoju jest wymagana";
      if (!firstErrorField) firstErrorField = roomNameRef.current;
    } else if (formData.roomName.length < 3) {
      newErrors.roomName = "Nazwa pokoju musi mieć co najmniej 3 znaki";
      if (!firstErrorField) firstErrorField = roomNameRef.current;
    }

    if (formData.maxParticipants < 2) {
      newErrors.maxParticipants = "Minimalna liczba uczestników to 2";
      if (!firstErrorField) firstErrorField = maxParticipantsRef.current;
    } else if (formData.maxParticipants > 50) {
      newErrors.maxParticipants = "Maksymalna liczba uczestników to 50";
      if (!firstErrorField) firstErrorField = maxParticipantsRef.current;
    }

    if (formData.entryFee < 0) {
      newErrors.entryFee = "Wpisowe nie może być ujemne";
      if (!firstErrorField) firstErrorField = entryFeeRef.current;
    } else if (formData.entryFee > 10000) {
      newErrors.entryFee = "Maksymalne wpisowe to 10000 PLN";
      if (!firstErrorField) firstErrorField = entryFeeRef.current;
    }

    setErrors(newErrors);

    if (firstErrorField && Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        firstErrorField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstErrorField?.focus();
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
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    console.log("Tworzenie pokoju:", formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate("/rooms");
  };

  const calculatePrizePool = () => {
    return formData.entryFee * formData.maxParticipants;
  };

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
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true,
                }}
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

                      {/* Logo zamiast emoji */}
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
                Dalej
                <ArrowLeft className="arrow-icon rotated" />
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
                  <Trophy size={18} />
                  Nazwa pokoju *
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
                  <Users size={18} />
                  Maksymalna liczba uczestników *
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
                  <DollarSign size={18} />
                  Wpisowe (PLN) *
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
                <span className="field-hint">
                  Maksymalne wpisowe: 10,000 PLN
                </span>

                <PrizePoolPreview
                  entryFee={formData.entryFee}
                  maxParticipants={formData.maxParticipants}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={18} />
                  Widoczność pokoju
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
                  <Info size={18} />
                  Opis pokoju (opcjonalnie)
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

              <div className="summary-highlight">
                <Trophy className="highlight-icon" />
                <div className="highlight-content">
                  <span className="highlight-label">Całkowita pula nagród</span>
                  <span className="highlight-value">
                    {calculatePrizePool()} PLN
                  </span>
                </div>
              </div>

              {formData.description && (
                <>
                  <div className="summary-divider"></div>
                  <div className="summary-section">
                    <h4 className="section-title">Opis</h4>
                    <p className="summary-text">{formData.description}</p>
                  </div>
                </>
              )}

              {formData.rules && (
                <>
                  <div className="summary-divider"></div>
                  <div className="summary-section">
                    <h4 className="section-title">Dodatkowe zasady</h4>
                    <p className="summary-text">{formData.rules}</p>
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
