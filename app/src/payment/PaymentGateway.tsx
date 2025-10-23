import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type {
  OnApproveData,
  OnApproveActions,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js";
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
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">(
    "paypal"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const PAYPAL_CLIENT_ID = "test";

  const handleClose = () => {
    if (isProcessing) return;
    setCardData({ number: "", name: "", expiry: "", cvv: "" });
    setPaymentMethod("paypal");
    setPaymentStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const createOrder = (_data: CreateOrderData, actions: CreateOrderActions) => {
    setIsProcessing(true);
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `Wpisowe do pokoju: ${roomName}`,
          amount: {
            value: entryFee.toString(),
            currency_code: "PLN",
          },
        },
      ],
    });
  };

  const onApprove = (_data: OnApproveData, actions: OnApproveActions) => {
    return actions.order!.capture().then((details) => {
      console.log("Płatność pomyślna:", details);
      setPaymentStatus("success");
      setIsProcessing(false);
      setTimeout(() => {
        onPaymentSuccess();
        handleClose();
      }, 2000);
    });
  };

  const onError = (err: unknown) => {
    console.error("Błąd płatności PayPal:", err);
    setErrorMessage("Wystąpił błąd podczas płatności. Spróbuj ponownie.");
    setPaymentStatus("error");
    setIsProcessing(false);
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <PayPalScriptProvider
      options={{ clientId: PAYPAL_CLIENT_ID, currency: "PLN" }}
    >
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

          <div className="payment-content">
            <div className="payment-method-selector">
              <button
                className={`method-tab ${
                  paymentMethod === "paypal" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <img
                  src="/paypal/paypal-logo.png"
                  alt="PayPal"
                  className="paypal-logo"
                />
              </button>
              <button
                className={`method-tab ${
                  paymentMethod === "card" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={20} /> Karta Płatnicza
              </button>
            </div>

            {paymentStatus === "success" ? (
              <div className="payment-message success">
                <CheckCircle size={20} />
                <span>Płatność zakończona sukcesem!</span>
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
                {paymentMethod === "paypal" && (
                  <div className="paypal-container">
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay",
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      forceReRender={[entryFee, roomName]}
                    />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <form onSubmit={handleCardSubmit} className="payment-form">
                    {/* Uproszczony formularz karty */}
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
                    <button type="submit" className="submit-button">
                      <Lock size={20} /> Zapłać {entryFee} PLN
                    </button>
                  </form>
                )}
              </>
            )}
            <div className="security-info">
              <Shield className="security-icon" />
              <p className="security-text">
                Twoje dane są bezpieczne i szyfrowane
              </p>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentGateway;
