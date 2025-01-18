import React, { useState } from "react";
import "./Profile.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePicture: null,
    gender: "",
    startupName: "",
    typeIndustry: "",
    description: "",
    foundingDate: "",
    founderDetails: [{ name: "", role: "", contact: "" }],
    fundingStage: "",
    totalInvestment: "",
    annualRevenue: "",
    platformExpectations: [],
    teamSize: "",
    coreTeam: [{ name: "", role: "", contact: "" }],
    hiringStatus: "",
    openPositions: "",
    country: "",
    cityState: "",
    operationType: "",
    websiteURL: "",
    linkedIn: "",
    instagram: "",
    facebook: "",
    twitter: "",
    personalSkills: "",
    businessChallenges: "",
    shortTermGoals: "",
    longTermGoals: "",
    targetAudience: "",
    sustainablePractices: "",
    socialImpact: "",
    verificationDocs: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Basic Profile Information */}
        <section>
          <h2>Basic Profile Information</h2>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} />
          
          <label className="file-upload">
            Profile Picture
            <input type="file" name="profilePicture" onChange={handleInputChange} />
          </label>
          <select name="gender" onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </section>

        {/* Startup Details */}
        <section>
          <h2>Startup Details</h2>
          <input type="text" name="startupName" placeholder="Startup Name" onChange={handleInputChange} />
          <select name="typeIndustry" onChange={handleInputChange}>
            <option value="">Select Type/Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="E-commerce">E-commerce</option>
          </select>
          <textarea name="description" placeholder="Description" onChange={handleInputChange}></textarea>
          <input type="date" name="foundingDate" onChange={handleInputChange} />
          <div className="founder-details">
            <h3>Founder Details</h3>
            <input type="text" placeholder="Name" onChange={(e) => handleInputChange(e)} />
            <input type="text" placeholder="Role" onChange={(e) => handleInputChange(e)} />
            <input type="email" placeholder="Contact Info" onChange={(e) => handleInputChange(e)} />
          </div>
          <input type="text" name="fundingStage" placeholder="Funding Stage" onChange={handleInputChange} />
          <input type="number" name="totalInvestment" placeholder="Total Investment Raised" onChange={handleInputChange} />
          <input type="number" name="annualRevenue" placeholder="Annual Revenue" onChange={handleInputChange} />
        </section>

        {/* Expectations from the Platform */}
        <section>
          <h2>Expectations from the Platform</h2>
          {["Mentorship", "Funding Access", "Networking", "Skill Exchange"].map((goal) => (
            <label key={goal}>
              <input
                type="checkbox"
                name="platformExpectations"
                value={goal}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prevState) => ({
                    ...prevState,
                    platformExpectations: checked
                      ? [...prevState.platformExpectations, value]
                      : prevState.platformExpectations.filter((item) => item !== value),
                  }));
                }}
              />
              {goal}
            </label>
          ))}
        </section>

        {/* Business Location */}
        <section>
          <h2>Business Location</h2>
          <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />
          <input type="text" name="cityState" placeholder="City/State" onChange={handleInputChange} />
          <select name="operationType" onChange={handleInputChange}>
            <option value="">Select Operation Type</option>
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
          </select>
        </section>

        {/* Social Links */}
        <section>
          <h2>Social Links</h2>
          <input type="url" name="websiteURL" placeholder="Website URL" onChange={handleInputChange} />
          <input type="url" name="linkedIn" placeholder="LinkedIn" onChange={handleInputChange} />
          <input type="url" name="instagram" placeholder="Instagram" onChange={handleInputChange} />
          <input type="url" name="facebook" placeholder="Facebook" onChange={handleInputChange} />
          <input type="url" name="twitter" placeholder="Twitter" onChange={handleInputChange} />
        </section>

        {/* Verification */}
        <section>
          <h2>Verification</h2>
          <label className="file-upload">
            Upload Verification Documents
            <input type="file" name="verificationDocs" onChange={handleInputChange} />
          </label>
        </section>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
