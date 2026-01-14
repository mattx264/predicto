import React from "react";
import { Wallet, CreditCard, History } from "lucide-react";
import type { UserData } from "../UserProfileModal";

interface WalletTabProps {
    userData: UserData;
    onOpenTopUp: () => void;
}

const WalletTab: React.FC<WalletTabProps> = ({ userData, onOpenTopUp }) => {
    return (
        <div className="my-profile-tab-content">
            <div className="my-profile-wallet-balance">
                <div className="my-profile-balance-card">
                    <Wallet className="my-profile-balance-icon" />
                    <div className="my-profile-balance-info">
                        <span className="my-profile-balance-label">Dostępne saldo</span>
                        <span className="my-profile-balance-amount">
                            {userData.balance.toFixed(2)} Monet
                        </span>
                    </div>
                </div>
            </div>

            <div className="my-profile-wallet-actions">
                <button
                    className="my-profile-wallet-btn deposit"
                    onClick={onOpenTopUp}
                >
                    <CreditCard size={18} />
                    Doładuj konto
                </button>
                <button className="my-profile-wallet-btn withdraw">
                    <CreditCard size={18} />
                    Wypłać środki
                </button>
            </div>

            <div className="my-profile-section">
                <h3>
                    <History size={20} />
                    Podsumowanie
                </h3>
                <div className="my-profile-wallet-summary">
                    <div className="my-profile-summary-item">
                        <span className="my-profile-summary-label">Łączne wpłaty</span>
                        <span className="my-profile-summary-value positive">
                            +{userData.totalDeposits.toFixed(2)} Monet
                        </span>
                    </div>
                    <div className="my-profile-summary-item">
                        <span className="my-profile-summary-label">Łączne wypłaty</span>
                        <span className="my-profile-summary-value negative">
                            -{userData.totalWithdrawals.toFixed(2)} Monet
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletTab;