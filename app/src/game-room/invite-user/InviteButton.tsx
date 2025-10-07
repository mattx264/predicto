import React, { useState } from "react";
import { UserPlus, X, Copy, Mail, Check } from "lucide-react";
import "./InviteButton.css";

interface InviteButtonProps {
  roomId: string;
  inviteCode?: string;
  roomName: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ roomId, inviteCode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [email, setEmail] = useState("");

  const inviteLink = `${window.location.origin}/room/${roomId}${
    inviteCode ? `?code=${inviteCode}` : ""
  }`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wysyłam zaproszenie na:", email);
    alert(`Zaproszenie wysłane na: ${email}`);
    setEmail("");
  };

  return (
    <>
      <button
        className="my-action-btn my-invite"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPlus size={20} />
        <span>Zaproś</span>
      </button>

      {isModalOpen && (
        <div
          className="my-invite-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="my-invite-modal" onClick={(e) => e.stopPropagation()}>
            <div className="my-invite-modal-header">
              <h2>Zaproś do pokoju</h2>
              <button
                className="my-invite-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="my-invite-modal-content">
              <div className="my-invite-section">
                <h3>Link z zaproszeniem</h3>
                <p className="my-invite-description">
                  Udostępnij ten link osobom, które chcesz zaprosić
                </p>
                <div className="my-invite-input-group">
                  <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="my-invite-input"
                  />
                  <button
                    className="my-invite-copy-btn"
                    onClick={handleCopyLink}
                  >
                    {copiedLink ? (
                      <>
                        <Check size={18} />
                        <span>Skopiowano!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span>Kopiuj</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {inviteCode && (
                <div className="my-invite-section">
                  <h3>Kod zaproszenia</h3>
                  <p className="my-invite-description">
                    Użyj tego kodu w prywatnych pokojach
                  </p>
                  <div className="my-invite-input-group">
                    <input
                      type="text"
                      value={inviteCode}
                      readOnly
                      className="my-invite-input my-invite-code"
                    />
                    <button
                      className="my-invite-copy-btn"
                      onClick={handleCopyCode}
                    >
                      {copiedCode ? (
                        <>
                          <Check size={18} />
                          <span>Skopiowano!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span>Kopiuj</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="my-invite-section">
                <h3>Wyślij zaproszenie e-mailem</h3>
                <p className="my-invite-description">
                  Wpisz adres email osoby, którą chcesz zaprosić
                </p>
                <form
                  onSubmit={handleSendEmail}
                  className="my-invite-email-form"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="my-invite-input"
                    required
                  />
                  <button type="submit" className="my-invite-send-btn">
                    <Mail size={18} />
                    <span>Wyślij</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InviteButton;
