import React from "react";
import { Bell } from "lucide-react";
import type { SettingsData } from "../UserProfileModal";

interface SettingsTabProps {
    settings: SettingsData;
    handleSettingsChange: (key: string, value: boolean) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
    settings,
    handleSettingsChange,
}) => {
    return (
        <div className="my-profile-tab-content">
            <div className="my-profile-section">
                <h3>
                    <Bell size={20} />
                    Powiadomienia
                </h3>
                <div className="my-profile-settings-list">
                    <div className="my-profile-setting-item">
                        <div className="my-profile-setting-info">
                            <span className="my-profile-setting-label">
                                Powiadomienia email
                            </span>
                            <span className="my-profile-setting-description">
                                Otrzymuj ważne informacje na email
                            </span>
                        </div>
                        <label className="my-profile-toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) =>
                                    handleSettingsChange("emailNotifications", e.target.checked)
                                }
                            />
                            <span className="my-profile-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="my-profile-setting-item">
                        <div className="my-profile-setting-info">
                            <span className="my-profile-setting-label">
                                Powiadomienia push
                            </span>
                            <span className="my-profile-setting-description">
                                Powiadomienia w przeglądarce
                            </span>
                        </div>
                        <label className="my-profile-toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={(e) =>
                                    handleSettingsChange("pushNotifications", e.target.checked)
                                }
                            />
                            <span className="my-profile-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="my-profile-setting-item">
                        <div className="my-profile-setting-info">
                            <span className="my-profile-setting-label">
                                Przypomnienia o meczach
                            </span>
                            <span className="my-profile-setting-description">
                                Powiadom przed rozpoczęciem meczu
                            </span>
                        </div>
                        <label className="my-profile-toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.matchReminders}
                                onChange={(e) =>
                                    handleSettingsChange("matchReminders", e.target.checked)
                                }
                            />
                            <span className="my-profile-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="my-profile-setting-item">
                        <div className="my-profile-setting-info">
                            <span className="my-profile-setting-label">Wyniki meczów</span>
                            <span className="my-profile-setting-description">
                                Powiadom o wynikach wytypowanych meczów
                            </span>
                        </div>
                        <label className="my-profile-toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.resultNotifications}
                                onChange={(e) =>
                                    handleSettingsChange("resultNotifications", e.target.checked)
                                }
                            />
                            <span className="my-profile-toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="my-profile-section">
                <h3>Prywatność</h3>
                <div className="my-profile-settings-list">
                    <div className="my-profile-setting-item">
                        <div className="my-profile-setting-info">
                            <span className="my-profile-setting-label">Prywatny profil</span>
                            <span className="my-profile-setting-description">
                                Ukryj swoje statystyki przed innymi
                            </span>
                        </div>
                        <label className="my-profile-toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.privateProfile}
                                onChange={(e) =>
                                    handleSettingsChange("privateProfile", e.target.checked)
                                }
                            />
                            <span className="my-profile-toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;