import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./Policy.css";
import w1 from "../../Components/Assets/w1.png";
import w2 from "../../Components/Assets/w2.png";
import w3 from "../../Components/Assets/w3.jpeg";
import w4 from "../../Components/Assets/w4.jpeg";
import w5 from "../../Components/Assets/w5.jpeg";
import w6 from "../../Components/Assets/w6.webp";

// Initialize translations
const resources = {
  en: {
    translation: {
      title: "Government Policies for Women Entrepreneurs",
      searchPlaceholder: "Search policies...",
      noPolicies: "No policies found matching your search.",
      eligibility: "Eligibility",
      benefits: "Benefits",
      policies: [
        {
          id: 1,
          name: "Mahila Udyam Nidhi Scheme",
          description:
            "Provides financial assistance up to ₹10 lakh to women entrepreneurs to set up new projects in small-scale industries.",
          eligibility: "Women entrepreneurs planning to start small-scale industries.",
          benefits: [
            "Financial assistance up to ₹10 lakh",
            "Encouragement for small-scale industries",
            "Low-interest loans",
          ],
        },
        {
          id: 2,
          name: "Mudra Yojana for Women",
          description:
            "Offers loans to women entrepreneurs to start small businesses with loans ranging from ₹50,000 to ₹10 lakh.",
          eligibility: "Women entrepreneurs in small business sectors.",
          benefits: [
            "Loans for small businesses",
            "Low-interest rates",
            "Support for women-led enterprises",
          ],
        },
      ],
    },
  },
  hi: {
    translation: {
      title: "महिला उद्यमियों के लिए सरकारी नीतियां",
      searchPlaceholder: "नीतियों को खोजें...",
      noPolicies: "कोई नीति नहीं मिली।",
      eligibility: "पात्रता",
      benefits: "लाभ",
      policies: [
        {
          id: 1,
          name: "महिला उद्यम निधि योजना",
          description:
            "महिला उद्यमियों को लघु उद्योगों में नए प्रोजेक्ट शुरू करने के लिए ₹10 लाख तक की वित्तीय सहायता प्रदान करता है।",
          eligibility: "लघु उद्योग शुरू करने की योजना बना रही महिला उद्यमी।",
          benefits: [
            "₹10 लाख तक की वित्तीय सहायता",
            "लघु उद्योगों को प्रोत्साहन",
            "कम ब्याज दर पर ऋण",
          ],
        },
        {
          id: 2,
          name: "महिला मुद्रा योजना",
          description:
            "महिला उद्यमियों को छोटे व्यवसाय शुरू करने के लिए ₹50,000 से ₹10 लाख तक के ऋण प्रदान करता है।",
          eligibility: "छोटे व्यवसाय क्षेत्रों में महिला उद्यमी।",
          benefits: [
            "छोटे व्यवसायों के लिए ऋण",
            "कम ब्याज दरें",
            "महिला-नेतृत्व वाले उद्यमों के लिए सहायता",
          ],
        },
      ],
    },
  },
};

// Initialize i18next
i18next.init({
  lng: "en",
  resources,
});

const GovernmentPolicies = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");

  // Change Language
  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  const policies = t("policies", { returnObjects: true });

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="fixed-images left-side">
        <img src={w1} alt="Policy" />
        <img src={w2} alt="Policy" />
        <img src={w6} alt="Policy" />
      </div>

      <div className="policies-container">
        <h1>{t("title")}</h1>

        {/* Language Toggle */}
        <div className="language-toggle">
          <button onClick={() => changeLanguage("en")} className={language === "en" ? "active" : ""}>
            English
          </button>
          <button onClick={() => changeLanguage("hi")} className={language === "hi" ? "active" : ""}>
            हिंदी
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Policies List */}
        <div className="policies-list">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <div key={policy.id} className="policy-card">
                <h2 className="policy-name">{policy.name}</h2>
                <p className="policy-description">{policy.description}</p>
                <hr />
                <p>
                  <strong>{t("eligibility")}:</strong> {policy.eligibility}
                </p>
                <hr />
                <p>
                  <strong>{t("benefits")}:</strong>
                </p>
                <ul className="policy-benefits">
                  {policy.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="no-policies">{t("noPolicies")}</p>
          )}
        </div>
      </div>

      <div className="fixed-images right-side">
        <img src={w5} alt="Policy" />
        <img src={w4} alt="Policy" />
        <img src={w3} alt="Policy" />
      </div>
    </div>
  );
};

export default GovernmentPolicies;
