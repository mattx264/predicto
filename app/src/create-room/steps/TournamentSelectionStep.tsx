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
  Loader2,
} from "lucide-react";
import type { TournamentDto } from "../../services/nsawg/client";

interface Props {
  tournamentTemplates: TournamentDto[];
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  error?: string;
  onNext: () => void;
  isLoading?: boolean;
}

const TournamentSelectionStep: React.FC<Props> = ({
  tournamentTemplates,
  selectedTemplateId,
  onTemplateSelect,
  error,
  onNext,
  isLoading = false,
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

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <Loader2 size={48} className="animate-spin" />
          <span style={{ marginLeft: "12px", fontSize: "18px" }}>
            Ładowanie turniejów...
          </span>
        </div>
      ) : tournamentTemplates.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <AlertCircle size={48} style={{ margin: "0 auto 16px" }} />
          <p>Brak dostępnych turniejów</p>
        </div>
      ) : (
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
                  className={`template-card ${selectedTemplateId === template.id?.toString()
                      ? "selected"
                      : ""
                    }`}
                  onClick={() => onTemplateSelect(template.id?.toString() || "")}
                >
                  {selectedTemplateId === template.id?.toString() && (
                    <div className="selected-badge">
                      <Check size={16} />
                    </div>
                  )}
                  <div className="template-logo-container">
                    <img
                      src={template.logoUrl || "/placeholder-logo.png"}
                      alt={template.league || "Logo turnieju"}
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
                        {template.startDate
                          ? new Date(template.startDate).toLocaleDateString("pl-PL")
                          : "Brak daty"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="matches-count">
                        {template.matchesCount || 0} meczów
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
      )}

      <div className="step-actions">
        <button
          className="btn-next"
          onClick={onNext}
          disabled={!selectedTemplateId || isLoading}
        >
          Dalej <ArrowLeft className="arrow-icon rotated" />
        </button>
      </div>
    </div>
  );
};

export default TournamentSelectionStep;