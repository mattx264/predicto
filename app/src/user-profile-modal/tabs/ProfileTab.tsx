import React, { useState } from "react";
import { Mail, Phone, MapPin, User, Save } from "lucide-react";
import Achievements from "../achievements/Achievements";
import type { UserData } from "../UserProfileModal";


interface ProfileTabProps {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData, setUserData }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        console.log("Saving user data:", userData);
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
                                onClick={() => setIsEditing(false)}
                            >
                                Anuluj
                            </button>
                            <button className="my-profile-btn-save" onClick={handleSave}>
                                <Save size={16} />
                                Zapisz
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
                        {isEditing ? (
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData({ ...userData, email: e.target.value })
                                }
                            />
                        ) : (
                            <span>{userData.email}</span>
                        )}
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
                            />
                        ) : (
                            <span>{userData.phone}</span>
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
                            />
                        ) : (
                            <span>{userData.location}</span>
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
                            />
                        ) : (
                            <span>{userData.bio}</span>
                        )}
                    </div>
                </div>
            </div>
            <Achievements />
        </div>
    );
};

export default ProfileTab;