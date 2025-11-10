import React, { useState } from "react";
import {
  X,
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import "./PaymentGateway.css";
import { roomService } from "../services/signalr/room.service";

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  entryFee: number;
  roomId: string;
  onPaymentSuccess: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  isOpen,
  onClose,
  roomName,
  entryFee,
  roomId,
  onPaymentSuccess,
}) => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"mock" | "card">("mock");

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    if (isProcessing) return;
    setCardData({ number: "", name: "", expiry: "", cvv: "" });
    setPaymentMethod("mock");
    setPaymentStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMockPayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    setPaymentStatus("idle");

    console.log("💳 Symulowanie płatności...");

    setTimeout(async () => {
      try {
        console.log("✅ [MOCK] Płatność zakończona sukcesem");

        await roomService.joinRoom(Number(roomId));
        console.log("✅ Pomyślnie dołączono do pokoju po płatności");

        setPaymentStatus("success");
        setIsProcessing(false);

        setTimeout(() => {
          onPaymentSuccess();
          handleClose();
        }, 1500);
      } catch (error) {
        console.error("❌ Błąd podczas dołączania do pokoju:", error);

        // ✅ Jeśli błąd to "już jesteś w pokoju", traktuj jako sukces
        const errorMsg = error instanceof Error ? error.message : "";
        if (errorMsg.includes("Już jesteś w tym pokoju")) {
          console.log("ℹ️ Already in room - treating as success");
          setPaymentStatus("success");
          setIsProcessing(false);

          setTimeout(() => {
            onPaymentSuccess();
            handleClose();
          }, 1500);
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Płatność przeszła, ale wystąpił błąd podczas dołączania."
        );
        setPaymentStatus("error");
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleMockPayment();
  };

  if (!isOpen) return null;

  return (
    <div className="payment-overlay" onClick={handleClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-header">
          <div className="payment-title-section">
            <CreditCard className="payment-icon" />
            <div>
              <h2 className="payment-title">Bramka Płatności</h2>
              <p className="payment-subtitle">
                Bezpieczna transakcja (TEST MODE)
              </p>
            </div>
          </div>
          <button
            className="close-button"
            onClick={handleClose}
            disabled={isProcessing}
          >
            <X size={24} />
          </button>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Pokój:</span>
            <span className="detail-value">{roomName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Wpisowe:</span>
            <span className="detail-value highlight">{entryFee} PLN</span>
          </div>
        </div>

        <div className="payment-content">
          <div className="payment-method-selector">
            <button
              className={`method-tab ${
                paymentMethod === "mock" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("mock")}
              disabled={isProcessing}
            >
              ⚡ Szybka płatność (TEST)
            </button>
            <button
              className={`method-tab ${
                paymentMethod === "card" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("card")}
              disabled={isProcessing}
            >
              <CreditCard size={20} /> Karta Płatnicza
            </button>
          </div>

          {paymentStatus === "success" ? (
            <div className="payment-message success">
              <CheckCircle size={20} />
              <span>Płatność zakończona! Dołączono do pokoju.</span>
            </div>
          ) : paymentStatus === "error" ? (
            <div className="payment-message error">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          ) : isProcessing ? (
            <div className="processing-indicator">
              <Loader className="spinner" size={32} />
              <p>Przetwarzanie płatności...</p>
            </div>
          ) : (
            <>
              {paymentMethod === "mock" && (
                <div className="mock-payment-container">
                  <div className="mock-info">
                    <AlertCircle size={18} />
                    <p>
                      Tryb testowy - płatność zostanie automatycznie
                      zaakceptowana
                    </p>
                  </div>
                  <button
                    className="submit-button"
                    onClick={handleMockPayment}
                    disabled={isProcessing}
                  >
                    <Lock size={20} /> Zapłać i dołącz - {entryFee} PLN
                  </button>
                </div>
              )}

              {paymentMethod === "card" && (
                <form onSubmit={handleCardSubmit} className="payment-form">
                  <div className="form-group">
                    <label className="form-label">
                      <CreditCard size={16} /> Numer karty
                    </label>
                    <input
                      type="tel"
                      name="number"
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={handleCardInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Imię i nazwisko</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="JAN KOWALSKI"
                      value={cardData.name}
                      onChange={handleCardInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Data ważności</label>
                      <input
                        type="text"
                        name="expiry"
                        className="form-input"
                        placeholder="MM/RR"
                        value={cardData.expiry}
                        onChange={handleCardInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <Lock size={16} /> CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-input"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isProcessing}
                  >
                    <Lock size={20} /> Zapłać i dołącz - {entryFee} PLN
                  </button>
                </form>
              )}
            </>
          )}
          <div className="security-info">
            <Shield className="security-icon" />
            <p className="security-text">
              Twoje dane są bezpieczne i szyfrowane (TEST MODE)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
