import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User, Save } from "lucide-react";
import Achievements from "../achievements/Achievements";
import type { UserData } from "../UserProfileModal";

interface ProfileTabProps {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface LocalProfileData {
    phone: string;
    location: string;
    bio: string;
    avatar: string;
}

const PROFILE_STORAGE_KEY = "userProfileData";

const ProfileTab: React.FC<ProfileTabProps> = ({ userData, setUserData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadLocalProfileData = () => {
            try {
                const savedData = localStorage.getItem(PROFILE_STORAGE_KEY);
                if (savedData) {
                    const parsedData: LocalProfileData = JSON.parse(savedData);
                    setUserData((prev) => ({
                        ...prev,
                        phone: parsedData.phone || prev.phone,
                        location: parsedData.location || prev.location,
                        bio: parsedData.bio || prev.bio,
                        avatar: parsedData.avatar || prev.avatar,
                    }));
                }
            } catch (error) {
                console.error("Błąd wczytywania danych profilu:", error);
            }
        };

        loadLocalProfileData();
    }, [setUserData]);

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const profileData: LocalProfileData = {
                phone: userData.phone,
                location: userData.location,
                bio: userData.bio,
                avatar: userData.avatar,
            };

            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));



            console.log("Dane profilu zapisane:", profileData);
            setIsEditing(false);
        } catch (error) {
            console.error("Błąd podczas zapisywania profilu:", error);
            alert("Wystąpił błąd podczas zapisywania. Spróbuj ponownie.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        try {
            const savedData = localStorage.getItem(PROFILE_STORAGE_KEY);
            if (savedData) {
                const parsedData: LocalProfileData = JSON.parse(savedData);
                setUserData((prev) => ({
                    ...prev,
                    phone: parsedData.phone,
                    location: parsedData.location,
                    bio: parsedData.bio,
                    avatar: parsedData.avatar,
                }));
            }
        } catch (error) {
            console.error("Błąd przywracania danych:", error);
        }
        setIsEditing(false);
    };

    return (
        <div className="my-profile-tab-content">
            <div className="my-profile-section">
                <div className="my-profile-section-header">
                    <h3>Informacje osobiste</h3>
                    {!isEditing ? (
                        <button
                            className="my-profile-btn-edit"
                            onClick={() => setIsEditing(true)}
                        >
                            Edytuj
                        </button>
                    ) : (
                        <div className="my-profile-edit-actions">
                            <button
                                className="my-profile-btn-cancel"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                Anuluj
                            </button>
                            <button
                                className="my-profile-btn-save"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                <Save size={16} />
                                {isSaving ? "Zapisywanie..." : "Zapisz"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="my-profile-fields">
                    <div className="my-profile-field">
                        <label>
                            <Mail size={16} />
                            Email
                        </label>
                        <span className="readonly">{userData.email}</span>
                    </div>

                    <div className="my-profile-field">
                        <label>
                            <Phone size={16} />
                            Telefon
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) =>
                                    setUserData({ ...userData, phone: e.target.value })
                                }
                                placeholder="np. +48 123 456 789"
                                disabled={isSaving}
                            />
                        ) : (
                            <span>{userData.phone || "Nie podano"}</span>
                        )}
                    </div>

                    <div className="my-profile-field">
                        <label>
                            <MapPin size={16} />
                            Lokalizacja
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userData.location}
                                onChange={(e) =>
                                    setUserData({ ...userData, location: e.target.value })
                                }
                                placeholder="np. Kraków, Polska"
                                disabled={isSaving}
                            />
                        ) : (
                            <span>{userData.location || "Nie podano"}</span>
                        )}
                    </div>

                    <div className="my-profile-field full-width">
                        <label>
                            <User size={16} />
                            Bio
                        </label>
                        {isEditing ? (
                            <textarea
                                value={userData.bio}
                                onChange={(e) =>
                                    setUserData({ ...userData, bio: e.target.value })
                                }
                                rows={3}
                                placeholder="Opowiedz coś o sobie..."
                                disabled={isSaving}
                                maxLength={500}
                            />
                        ) : (
                            <span>{userData.bio || "Brak opisu"}</span>
                        )}
                        {isEditing && (
                            <small className="char-count">
                                {userData.bio.length}/500 znaków
                            </small>
                        )}
                    </div>
                </div>
            </div>

            <Achievements />
        </div>
    );
};

export default ProfileTab;