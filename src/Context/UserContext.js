import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
    profilePicture: null,
    gender: "Female",
    startupName: "Tech Innovations",
    typeIndustry: "Technology",
    description: "Innovative solutions for modern businesses.",
    foundingDate: "2020-01-01",
    founderDetails: [{ name: "Jane Doe", role: "CEO", contact: "jane@example.com" }],
    fundingStage: "Seed",
    totalInvestment: "500000",
    annualRevenue: "200000",
    platformExpectations: ["Mentorship", "Funding Access"],
    teamSize: "10",
    coreTeam: [{ name: "John Smith", role: "CTO", contact: "john@example.com" }],
    hiringStatus: "Hiring",
    openPositions: "Software Engineer",
    country: "USA",
    cityState: "New York",
    operationType: "Remote",
    websiteURL: "https://techinnovations.com",
    linkedIn: "https://linkedin.com/in/janedoe",
    instagram: "https://instagram.com/techinnovations",
    facebook: "https://facebook.com/techinnovations",
    twitter: "https://twitter.com/techinnovations",
    personalSkills: "Leadership, Product Management",
    businessChallenges: "Scaling, Marketing",
    shortTermGoals: "Expand to new markets",
    longTermGoals: "Become an industry leader",
    targetAudience: "Tech startups and enterprises",
    sustainablePractices: "Eco-friendly packaging",
    socialImpact: "Job creation in underprivileged areas",
    verificationDocs: null,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy use
export const useUser = () => {
  return useContext(UserContext);
};
