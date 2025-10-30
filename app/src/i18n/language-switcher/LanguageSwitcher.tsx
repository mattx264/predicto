import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
import "./LanguageSwitcher.css";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const languages: Language[] = [
    { code: "pl", name: "Polski", flag: "pl" },
    { code: "en", name: "English", flag: "gb" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    if (isOpen) {
      setShouldAnimate(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    } else {
      setShouldAnimate(false);
    }
  }, [isOpen]);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className={`fi fi-${currentLanguage.flag} flag-icon`}></span>
      </button>

      {isOpen && (
        <>
          <div className="language-overlay" onClick={() => setIsOpen(false)} />
          <div className={`language-dropdown ${shouldAnimate ? "show" : ""}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${
                  i18n.language === lang.code ? "active" : ""
                }`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span className={`fi fi-${lang.flag} flag-icon`}></span>
                <span className="lang-name">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="check-mark">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
