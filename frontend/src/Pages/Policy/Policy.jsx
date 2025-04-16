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
        {
          id: 3,
          name: "Stand-Up India Scheme",
          description:
            "Facilitates bank loans between ₹10 lakh to ₹1 crore for women and SC/ST entrepreneurs to start Greenfield enterprises.",
          eligibility: "Women entrepreneurs above 18 years planning to start a new manufacturing, service, or trading business.",
          benefits: [
            "Loans between ₹10 lakh to ₹1 crore",
            "Support for Greenfield projects",
            "Inclusive support for SC/ST and women",
          ],
        },
        {
          id: 4,
          name: "TREAD Scheme for Women",
          description:
            "Provides credit, training, and information to women through NGOs for non-farm activities.",
          eligibility: "Women entrepreneurs supported by NGOs involved in non-farm activities.",
          benefits: [
            "Government grant up to 30% of project cost",
            "Credit and training via NGOs",
            "Empowerment through capacity building",
          ],
        },
        {
          id: 5,
          name: "Annapurna Scheme",
          description:
            "Provides loans to women entrepreneurs in the food catering sector to set up their own kitchens or catering units.",
          eligibility: "Women planning to start or expand a small food catering business.",
          benefits: [
            "Loan up to ₹50,000",
            "Working capital support",
            "Repayment period of up to 3 years",
          ],
        },
        {
          id: 6,
          name: "Women Entrepreneurship Platform (WEP)",
          description:
            "A NITI Aayog initiative that brings together women from various backgrounds to support and promote entrepreneurship.",
          eligibility: "Aspiring and existing women entrepreneurs across India.",
          benefits: [
            "Access to mentorship and funding",
            "Incubation support",
            "Resource sharing and networking",
          ],
        },
        {
          id: 7,
          name: "Bhartiya Mahila Bank Business Loan",
          description:
            "Provides financial services to women and offers business loans up to ₹20 crore for manufacturing and service enterprises.",
          eligibility: "Women entrepreneurs in manufacturing, services, or retail sectors.",
          benefits: [
            "Loans up to ₹20 crore",
            "Lower interest rates for women",
            "No collateral for smaller amounts",
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
            "यह योजना महिला उद्यमियों को लघु उद्योगों में नए प्रोजेक्ट शुरू करने के लिए ₹10 लाख तक की वित्तीय सहायता प्रदान करती है।",
          eligibility: "लघु उद्योग शुरू करने की योजना बना रही महिला उद्यमी।",
          benefits: [
            "₹10 लाख तक की वित्तीय सहायता",
            "लघु उद्योगों को प्रोत्साहन",
            "कम ब्याज दर पर ऋण",
            "5 से 10 वर्षों तक की ऋण चुकाने की अवधि",
          ],
        },
        {
          id: 2,
          name: "महिला मुद्रा योजना",
          description:
            "यह योजना महिला उद्यमियों को छोटे व्यवसाय शुरू करने के लिए ₹50,000 से ₹10 लाख तक के ऋण प्रदान करती है।",
          eligibility: "छोटे व्यवसाय क्षेत्रों में कार्यरत या नया व्यवसाय शुरू करने की इच्छुक महिला उद्यमी।",
          benefits: [
            "₹50,000 से ₹10 लाख तक का ऋण",
            "बिना गारंटी के ऋण सुविधा",
            "कम ब्याज दरें",
            "12 महीने से 5 वर्षों तक की ऋण अवधि",
          ],
        },
        {
          id: 3,
          name: "स्टैंड-अप इंडिया योजना",
          description:
            "यह योजना महिला और अनुसूचित जाति/जनजाति के उद्यमियों को ₹10 लाख से ₹1 करोड़ तक का ऋण प्रदान करती है।",
          eligibility: "18 वर्ष से अधिक आयु की महिला उद्यमी जो विनिर्माण, सेवा या व्यापार में नया व्यवसाय शुरू करना चाहती हैं।",
          benefits: [
            "₹10 लाख से ₹1 करोड़ तक का ऋण",
            "ग्रीनफील्ड परियोजनाओं के लिए समर्थन",
            "महिलाओं के लिए समावेशी वित्तीय सहायता",
          ],
        },
        {
          id: 4,
          name: "ट्रेड योजना (TREAD)",
          description:
            "यह योजना महिला उद्यमियों को गैर-कृषि गतिविधियों के लिए एनजीओ के माध्यम से प्रशिक्षण, क्रेडिट और सहायता प्रदान करती है।",
          eligibility: "एनजीओ के सहयोग से गैर-कृषि गतिविधियों में संलग्न महिला उद्यमी।",
          benefits: [
            "परियोजना लागत का 30% तक अनुदान",
            "एनजीओ के माध्यम से ऋण और प्रशिक्षण",
            "सक्षमता विकास द्वारा सशक्तिकरण",
          ],
        },
        {
          id: 5,
          name: "अन्नपूर्णा योजना",
          description:
            "खाद्य सेवा से जुड़ी महिला उद्यमियों को अपने कैटरिंग व्यवसाय को शुरू करने या विस्तार करने के लिए ऋण प्रदान करती है।",
          eligibility: "खाद्य कैटरिंग व्यवसाय शुरू करने की इच्छुक महिला उद्यमी।",
          benefits: [
            "₹50,000 तक का ऋण",
            "कार्यशील पूंजी के लिए सहायता",
            "3 वर्षों तक की ऋण चुकाने की अवधि",
          ],
        },
        {
          id: 6,
          name: "वुमन एंटरप्रेन्योरशिप प्लेटफॉर्म (WEP)",
          description:
            "नीति आयोग की यह पहल महिला उद्यमियों को मार्गदर्शन, नेटवर्किंग और फंडिंग के अवसर उपलब्ध कराती है।",
          eligibility: "सभी क्षेत्रों की इच्छुक और वर्तमान महिला उद्यमी।",
          benefits: [
            "मेंटोरशिप और फंडिंग एक्सेस",
            "इनक्यूबेशन समर्थन",
            "नेटवर्किंग और संसाधन साझा करना",
          ],
        },
        {
          id: 7,
          name: "भारतीय महिला बैंक व्यवसाय ऋण योजना",
          description:
            "यह योजना महिला उद्यमियों को ₹20 करोड़ तक का व्यवसायिक ऋण उपलब्ध कराती है।",
          eligibility: "विनिर्माण, सेवा या खुदरा क्षेत्र में कार्यरत महिला उद्यमी।",
          benefits: [
            "₹20 करोड़ तक का व्यवसायिक ऋण",
            "कम ब्याज दरें",
            "कम राशि के लिए बिना गारंटी ऋण",
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
