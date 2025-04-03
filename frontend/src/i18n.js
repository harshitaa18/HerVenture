import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "gov_policies": "Government Policies for Women Entrepreneurs",
      "search_placeholder": "Search policies...",
      "no_policies": "No policies found matching your search.",
      "eligibility": "Eligibility",
      "benefits": "Benefits",
      "mahila_udyan": "Mahila Udyam Nidhi Scheme",
      "mahila_udyan_desc": "Provides financial assistance up to ₹10 lakh to women entrepreneurs to set up new projects in small-scale industries.",
      "mahila_udyan_elig": "Women entrepreneurs planning to start small-scale industries.",
      "mahila_udyan_benefit_1": "Financial assistance up to ₹10 lakh",
      "mahila_udyan_benefit_2": "Encouragement for small-scale industries",
      "mahila_udyan_benefit_3": "Low-interest loans"
    }
  },
  hi: {
    translation: {
      "gov_policies": "महिला उद्यमियों के लिए सरकारी नीतियाँ",
      "search_placeholder": "नीतियों को खोजें...",
      "no_policies": "आपकी खोज से मेल खाने वाली कोई नीति नहीं मिली।",
      "eligibility": "पात्रता",
      "benefits": "लाभ",
      "mahila_udyan": "महिला उद्यम निधि योजना",
      "mahila_udyan_desc": "महिला उद्यमियों को ₹10 लाख तक की वित्तीय सहायता प्रदान करता है ताकि वे लघु उद्योग स्थापित कर सकें।",
      "mahila_udyan_elig": "लघु उद्योग शुरू करने की योजना बना रही महिला उद्यमी।",
      "mahila_udyan_benefit_1": "₹10 लाख तक की वित्तीय सहायता",
      "mahila_udyan_benefit_2": "लघु उद्योगों के लिए प्रोत्साहन",
      "mahila_udyan_benefit_3": "कम ब्याज दर पर ऋण"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
