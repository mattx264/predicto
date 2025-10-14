import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import {
  Trophy,
  Calendar,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import type { TournamentTemplate } from "../CreateRoomPage";

interface Props {
  tournamentTemplates: TournamentTemplate[];
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  error?: string;
  onNext: () => void;
}

const TournamentSelectionStep: React.FC<Props> = ({
  tournamentTemplates,
  selectedTemplateId,
  onTemplateSelect,
  error,
  onNext,
}) => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Wybierz szablon turnieju</h2>
        <p className="step-description">
          Wybierz gotowy turniej z meczami przygotowanymi przez administratorów
        </p>
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={18} />
          <span>{error}</span>
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
                  selectedTemplateId === template.id ? "selected" : ""
                }`}
                onClick={() => onTemplateSelect(template.id)}
              >
                {selectedTemplateId === template.id && (
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
                <p className="template-description">{template.description}</p>
                <div className="template-info">
                  <div className="info-item">
                    <Calendar size={14} />
                    <span>
                      {new Date(template.startDate).toLocaleDateString("pl-PL")}
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
          onClick={onNext}
          disabled={!selectedTemplateId}
        >
          Dalej <ArrowLeft className="arrow-icon rotated" />
        </button>
      </div>
    </div>
  );
};

export default TournamentSelectionStep;
