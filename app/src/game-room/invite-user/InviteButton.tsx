import React, { useState, useRef, useEffect } from "react";
import { UserPlus, X, Copy, Mail, Check, Link, Hash } from "lucide-react";
import "./InviteButton.css";

interface InviteButtonProps {
  roomId: string;
  inviteCode?: string;
  roomName: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({ roomId, inviteCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [email, setEmail] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const inviteLink = `${window.location.origin}/room/${roomId}${inviteCode ? `?code=${inviteCode}` : ""
    }`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    setIsOpen(false);
  };

  return (
    <div className="invite-wrapper" ref={containerRef}>
      <button
        className={`my-action-btn my-invite ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserPlus size={20} />
        <span>Zaproś</span>
      </button>

      {isOpen && (
        <div className="invite-popover">
          <div className="popover-header">
            <h3>Zaproś znajomych</h3>
            <button className="close-btn-mini" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="popover-content">
            <div className="invite-group">
              <label className="invite-label">
                <Link size={14} /> Link do pokoju
              </label>
              <div className="input-row">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="popover-input"
                />
                <button
                  className={`copy-btn-mini ${copiedLink ? "success" : ""}`}
                  onClick={handleCopyLink}
                  title="Kopiuj link"
                >
                  {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {inviteCode && (
              <div className="invite-group">
                <label className="invite-label">
                  <Hash size={14} /> Kod wejścia
                </label>
                <div className="input-row">
                  <input
                    type="text"
                    value={inviteCode}
                    readOnly
                    className="popover-input code-font"
                  />
                  <button
                    className={`copy-btn-mini ${copiedCode ? "success" : ""}`}
                    onClick={handleCopyCode}
                    title="Kopiuj kod"
                  >
                    {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}

            <div className="popover-divider" />

            <form onSubmit={handleSendEmail} className="invite-group">
              <label className="invite-label">
                <Mail size={14} /> Wyślij e-mail
              </label>
              <div className="input-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="popover-input"
                  required
                />
                <button type="submit" className="send-btn-mini">
                  <UserPlus size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteButton;