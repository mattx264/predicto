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

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  entryFee: number;
  onPaymentSuccess: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  isOpen,
  onClose,
  roomName,
  entryFee,
  onPaymentSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const validateForm = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setErrorMessage("Numer karty musi zawierać 16 cyfr");
      return false;
    }
    if (!cardName.trim()) {
      setErrorMessage("Podaj imię i nazwisko właściciela karty");
      return false;
    }
    if (expiryDate.length !== 5) {
      setErrorMessage("Podaj prawidłową datę ważności");
      return false;
    }
    if (cvv.length !== 3) {
      setErrorMessage("CVV musi zawierać 3 cyfry");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      setPaymentStatus("error");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");

    setTimeout(() => {
      if (Math.random() > 0.1) {
        setPaymentStatus("success");
        setIsProcessing(false);
        setTimeout(() => {
          onPaymentSuccess();
          handleClose();
        }, 2000);
      } else {
        setPaymentStatus("error");
        setErrorMessage("Płatność została odrzucona. Spróbuj ponownie.");
        setIsProcessing(false);
      }
    }, 2500);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
      setPaymentStatus("idle");
      setErrorMessage("");
      onClose();
    }
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
              <p className="payment-subtitle">Bezpieczna transakcja</p>
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

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label className="form-label">
              <CreditCard size={16} />
              Numer karty
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              disabled={isProcessing || paymentStatus === "success"}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imię i nazwisko</label>
            <input
              type="text"
              className="form-input"
              placeholder="JAN KOWALSKI"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              disabled={isProcessing || paymentStatus === "success"}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Data ważności</label>
              <input
                type="text"
                className="form-input"
                placeholder="MM/RR"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                disabled={isProcessing || paymentStatus === "success"}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Lock size={16} />
                CVV
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="123"
                value={cvv}
                onChange={handleCvvChange}
                disabled={isProcessing || paymentStatus === "success"}
                required
              />
            </div>
          </div>

          {paymentStatus === "error" && errorMessage && (
            <div className="payment-message error">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          {paymentStatus === "success" && (
            <div className="payment-message success">
              <CheckCircle size={20} />
              <span>Płatność zakończona sukcesem!</span>
            </div>
          )}

          <div className="security-info">
            <Shield className="security-icon" />
            <p className="security-text">
              Twoje dane są bezpieczne i szyfrowane SSL
            </p>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isProcessing || paymentStatus === "success"}
          >
            {isProcessing ? (
              <>
                <Loader className="spinner" size={20} />
                Przetwarzanie...
              </>
            ) : paymentStatus === "success" ? (
              <>
                <CheckCircle size={20} />
                Płatność zakończona
              </>
            ) : (
              <>
                <Lock size={20} />
                Zapłać {entryFee} PLN
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
