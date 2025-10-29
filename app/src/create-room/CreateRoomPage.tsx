import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CreateRoomPage.css";
import TournamentSelectionStep from "./steps/TournamentSelectionStep";
import RoomSettingsStep from "./steps/RoomSettingsStep";
import SummaryStep from "./steps/SummaryStep";
import type { RoomFormData } from "../types/types";
import { mapFormDataToCreateRequest } from "../types/types";
import { roomService } from "../services/signalr/room.service";
import { toast } from "react-toastify";

export interface TournamentTemplate {
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
  const [formData, setFormData] = useState<RoomFormData>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.tournamentTemplateId) {
      newErrors.tournamentTemplateId = "Musisz wybrać szablon turnieju";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    let firstErrorField: React.RefObject<HTMLInputElement | null> | null = null;

    if (!formData.roomName.trim()) {
      newErrors.roomName = "Nazwa pokoju jest wymagana";
      if (!firstErrorField) firstErrorField = roomNameRef;
    } else if (formData.roomName.length < 3) {
      newErrors.roomName = "Nazwa pokoju musi mieć co najmniej 3 znaki";
      if (!firstErrorField) firstErrorField = roomNameRef;
    } else if (formData.roomName.length > 100) {
      newErrors.roomName = "Nazwa pokoju może mieć maksymalnie 100 znaków";
      if (!firstErrorField) firstErrorField = roomNameRef;
    }

    if (formData.maxParticipants < 2) {
      newErrors.maxParticipants = "Minimalna liczba uczestników to 2";
      if (!firstErrorField) firstErrorField = maxParticipantsRef;
    } else if (formData.maxParticipants > 100) {
      newErrors.maxParticipants = "Maksymalna liczba uczestników to 100";
      if (!firstErrorField) firstErrorField = maxParticipantsRef;
    }

    if (formData.entryFee < 0) {
      newErrors.entryFee = "Wpisowe nie może być ujemne";
      if (!firstErrorField) firstErrorField = entryFeeRef;
    } else if (formData.entryFee > 10000) {
      newErrors.entryFee = "Maksymalne wpisowe to 10000 PLN";
      if (!firstErrorField) firstErrorField = entryFeeRef;
    }

    if (formData.description.length > 500) {
      newErrors.description = "Opis może mieć maksymalnie 500 znaków";
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
    if (step > 1) {
      setStep(step - 1);
      if (errors.submit) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.submit;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) {
      setStep(2);
      return;
    }

    if (!roomService.isAuthenticated()) {
      setErrors({ submit: "Musisz być zalogowany, aby utworzyć pokój" });
      toast.error("Musisz być zalogowany, aby utworzyć pokój", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const request = mapFormDataToCreateRequest(formData);

      await roomService.createRoom(request);

      toast.success("🎉 Pokój został pomyślnie utworzony!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/rooms");
      }, 500);
    } catch (error) {
      console.error("❌ Błąd podczas tworzenia pokoju:", error);

      let errorMessage = "Nie udało się utworzyć pokoju. Spróbuj ponownie.";

      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      if (
        error instanceof Error &&
        (error.message.includes("zalogowany") ||
          error.message.includes("wygasła"))
      ) {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setErrors({ submit: errorMessage });

        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <TournamentSelectionStep
            tournamentTemplates={tournamentTemplates}
            selectedTemplateId={formData.tournamentTemplateId}
            onTemplateSelect={(id) => {
              setFormData({ ...formData, tournamentTemplateId: id });
              if (errors.tournamentTemplateId) {
                setErrors({});
              }
            }}
            error={errors.tournamentTemplateId}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RoomSettingsStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
            refs={{
              roomNameRef,
              maxParticipantsRef,
              entryFeeRef,
              correctOutcomeRef,
              exactScoreRef,
              jokerCountRef,
            }}
          />
        );
      case 3:
        return (
          <SummaryStep
            formData={formData}
            selectedTemplate={selectedTemplate}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            error={errors.submit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-room-page">
      <div className="create-room-container" ref={contentRef}>
        {/* Header */}
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

        {/* Progress Steps */}
        <div className="progress-steps">
          <div
            className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
          >
            <div className="step-circle">
              {step > 1 ? <Check size={20} /> : "1"}
            </div>
            <span className="step-label">Wybierz Turniej</span>
          </div>
          <div className="step-line"></div>
          <div
            className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}
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

        {renderStepContent()}
      </div>
    </div>
  );
};

export default CreateRoomPage;
