import React, { useState } from "react";
import {
    X,
    Wallet,
    CreditCard,
    Zap,
    CheckCircle,
    AlertCircle,
    Loader,
    Sparkles,
    TrendingUp,
    Crown,
} from "lucide-react";
import "./WalletTopUpModal.css";

interface CoinPackage {
    id: string;
    coins: number;
    price: number;
    discount?: number;
    popular?: boolean;
    badge?: string;
}

interface WalletTopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBalance: number;
}

const COIN_PACKAGES: CoinPackage[] = [
    {
        id: "starter",
        coins: 1000,
        price: 10,
    },
    {
        id: "popular",
        coins: 5000,
        price: 45,
        discount: 10,
        popular: true,
        badge: "POPULARNE",
    },
    {
        id: "best",
        coins: 10000,
        price: 80,
        discount: 20,
        badge: "NAJLEPSZA OFERTA",
    },
];

const WalletTopUpModal: React.FC<WalletTopUpModalProps> = ({
    isOpen,
    onClose,
    currentBalance,
}) => {
    const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(
        null
    );
    const [paymentMethod, setPaymentMethod] = useState<"mock" | "card">("mock");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        if (isProcessing) return;
        setSelectedPackage(null);
        setPaymentMethod("mock");
        setPaymentStatus("idle");
        setErrorMessage("");
        onClose();
    };

    const handleMockPayment = async () => {
        if (!selectedPackage) return;

        setIsProcessing(true);
        setErrorMessage("");
        setPaymentStatus("idle");

        console.log("💳 Symulowanie doładowania:", selectedPackage);

        setTimeout(() => {
            console.log("✅ [MOCK] Doładowanie zakończone sukcesem");
            setPaymentStatus("success");
            setIsProcessing(false);

            setTimeout(() => {
                // TODO: Tutaj będzie aktualizacja balansu w kontekście
                handleClose();
            }, 2000);
        }, 1500);
    };

    const handleCardPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleMockPayment();
    };

    if (!isOpen) return null;

    return (
        <div className="topup-overlay" onClick={handleClose}>
            <div className="topup-modal" onClick={(e) => e.stopPropagation()}>
                <div className="topup-header">
                    <div className="topup-title-section">
                        <Wallet className="topup-icon" size={28} />
                        <div>
                            <h2 className="topup-title">Doładuj Portfel</h2>
                            <p className="topup-subtitle">Wybierz pakiet monet</p>
                        </div>
                    </div>
                    <button
                        className="topup-close-button"
                        onClick={handleClose}
                        disabled={isProcessing}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="topup-balance">
                    <div className="balance-label">Aktualne saldo</div>
                    <div className="balance-amount">
                        <Wallet size={20} />
                        {currentBalance.toFixed(2)} Monet
                    </div>
                </div>

                <div className="topup-content">
                    {paymentStatus === "success" ? (
                        <div className="topup-message success">
                            <CheckCircle size={24} />
                            <div>
                                <p className="message-title">Doładowanie zakończone!</p>
                                <p className="message-subtitle">
                                    +{selectedPackage?.coins} monet dodano do portfela
                                </p>
                            </div>
                        </div>
                    ) : paymentStatus === "error" ? (
                        <div className="topup-message error">
                            <AlertCircle size={24} />
                            <div>
                                <p className="message-title">Wystąpił błąd</p>
                                <p className="message-subtitle">{errorMessage}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {!selectedPackage ? (
                                <>
                                    <h3 className="section-title">Wybierz pakiet</h3>
                                    <div className="packages-grid">
                                        {COIN_PACKAGES.map((pkg) => (
                                            <div
                                                key={pkg.id}
                                                className={`package-card ${pkg.popular ? "popular" : ""
                                                    }`}
                                                onClick={() => setSelectedPackage(pkg)}
                                            >
                                                {pkg.badge && (
                                                    <div className="package-badge">{pkg.badge}</div>
                                                )}

                                                <div className="package-icon">
                                                    {pkg.id === "starter" && <Zap size={32} />}
                                                    {pkg.id === "popular" && <TrendingUp size={32} />}
                                                    {pkg.id === "best" && <Crown size={32} />}
                                                </div>

                                                <div className="package-coins">
                                                    <Sparkles size={18} />
                                                    {pkg.coins.toLocaleString()} Monet
                                                </div>

                                                <div className="package-price">
                                                    {pkg.price} PLN
                                                    {pkg.discount && (
                                                        <span className="package-discount">
                                                            Oszczędź {pkg.discount}%
                                                        </span>
                                                    )}
                                                </div>

                                                <button className="package-select-btn">Wybierz</button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="selected-package-info">
                                        <button
                                            className="wallet-back-button"
                                            onClick={() => setSelectedPackage(null)}
                                            disabled={isProcessing}
                                        >
                                            ← Zmień pakiet
                                        </button>

                                        <div className="selected-package-details">
                                            <div className="selected-coins">
                                                <Sparkles size={20} />
                                                {selectedPackage.coins.toLocaleString()} Monet
                                            </div>
                                            <div className="selected-price">
                                                {selectedPackage.price} PLN
                                            </div>
                                        </div>
                                    </div>

                                    <div className="payment-method-selector">
                                        <button
                                            className={`method-tab ${paymentMethod === "mock" ? "active" : ""
                                                }`}
                                            onClick={() => setPaymentMethod("mock")}
                                            disabled={isProcessing}
                                        >
                                            ⚡ Szybka płatność (TEST)
                                        </button>
                                        <button
                                            className={`method-tab ${paymentMethod === "card" ? "active" : ""
                                                }`}
                                            onClick={() => setPaymentMethod("card")}
                                            disabled={isProcessing}
                                        >
                                            <CreditCard size={18} /> Karta Płatnicza
                                        </button>
                                    </div>

                                    {isProcessing ? (
                                        <div className="processing-indicator">
                                            <Loader className="spinner" size={36} />
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
                                                        <Wallet size={20} />
                                                        Doładuj {selectedPackage.price} PLN
                                                    </button>
                                                </div>
                                            )}

                                            {paymentMethod === "card" && (
                                                <form
                                                    onSubmit={handleCardPayment}
                                                    className="payment-form"
                                                >
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <CreditCard size={16} /> Numer karty
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            className="form-input"
                                                            placeholder="1234 5678 9012 3456"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Imię i nazwisko
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder="JAN KOWALSKI"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                Data ważności
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                placeholder="MM/RR"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">CVV</label>
                                                            <input
                                                                type="text"
                                                                className="form-input"
                                                                placeholder="123"
                                                                maxLength={3}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="submit-button"
                                                        disabled={isProcessing}
                                                    >
                                                        <Wallet size={20} />
                                                        Doładuj {selectedPackage.price} PLN
                                                    </button>
                                                </form>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletTopUpModal;