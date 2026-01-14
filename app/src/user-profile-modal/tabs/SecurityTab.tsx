import React, { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";

const SecurityTab: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="my-profile-tab-content">
      <div className="my-profile-section">
        <h3>Zmiana hasła</h3>
        <div className="my-profile-fields">
          <div className="my-profile-field full-width">
            <label>Aktualne hasło</label>
            <div className="my-profile-password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                className="my-profile-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="my-profile-field full-width">
            <label>Nowe hasło</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="my-profile-field full-width">
            <label>Potwierdź nowe hasło</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="my-profile-btn-change-password">
            <Shield size={16} />
            Zmień hasło
          </button>
        </div>
      </div>

      <div className="my-profile-section my-profile-danger-zone">
        <h3>Strefa niebezpieczna</h3>
        <p className="my-profile-danger-description">
          Usunięcie konta jest nieodwracalne. Wszystkie Twoje dane zostaną
          trwale usunięte.
        </p>
        <button className="my-profile-btn-delete-account">Usuń konto</button>
      </div>
    </div>
  );
};

export default SecurityTab;