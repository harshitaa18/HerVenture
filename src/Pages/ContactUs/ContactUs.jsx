import { useState } from "react";
import "./ContactUs.css"; // Import the updated CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    features: [],
    experience: "",
    improvements: "",
    challenges: "",
    recommend: "",
    contactConsent: false,
    mentorshipInterest: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "features") {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((item) => item !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="contact-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Name */}
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        {/* Email */}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        {/* How did you hear about us? */}
        <label>
          How did you hear about us?
          <select name="source" value={formData.source} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="google">Google</option>
            <option value="social-media">Social Media</option>
            <option value="word-of-mouth">Word of Mouth</option>
            <option value="event">Event</option>
            <option value="other">Other</option>
          </select>
        </label>

        {/* Most useful features */}
        {/* Most useful features */}
<fieldset>
  <legend>What features do you find most useful?</legend>
  <div className="checkbox-group">
    {["Networking", "Funding Info", "Mentorship", "Events", "Success Stories"].map((feature) => (
      <label key={feature} className="checkbox-label">
        <input type="checkbox" name="features" value={feature} onChange={handleChange} />
        {feature}
      </label>
    ))}
  </div>
</fieldset>


        {/* Experience rating */}
        <label>
          How was your experience with our website?
          <input type="number" name="experience" min="1" max="5" value={formData.experience} onChange={handleChange} required />
        </label>

        {/* Suggestions for improvement */}
        <label>
          What improvements would you suggest?
          <textarea name="improvements" value={formData.improvements} onChange={handleChange} rows="3" />
        </label>

        {/* Challenges faced */}
        <label>
          What challenges do you face as a woman entrepreneur?
          <textarea name="challenges" value={formData.challenges} onChange={handleChange} rows="3" />
        </label>

        {/* Would you recommend us? */}
        <fieldset>
          <legend>Would you recommend us to others?</legend>
          <div className="shift-right">
          <label>
            <input type="radio" name="recommend" value="yes" onChange={handleChange} required />
            Yes
          </label>
          <label>
            <input type="radio" name="recommend" value="no" onChange={handleChange} required />
            No
          </label>
          </div>
        </fieldset>

        {/* Contact Consent */}
        <div className="shift-right">
        <label className="checkbox-label">
          <input type="checkbox" name="contactConsent" checked={formData.contactConsent} onChange={handleChange} />
          Would you like to be contacted for further discussion?
        </label>
        </div>

        {/* Mentorship Interest */}
        <div className="shift-right">
        <label className="checkbox-label">
          <input type="checkbox" name="mentorshipInterest" checked={formData.mentorshipInterest} onChange={handleChange} />
          Would you be interested in joining our mentorship program?
        </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default ContactUs;
