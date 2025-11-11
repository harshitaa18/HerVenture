import React, { useState } from "react";
import jsPDF from "jspdf";
import "./SocialMediaAdvisor.css";

export default function SocialMediaAdvisor() {
  const [productName, setProductName] = useState("");
  const [followers, setFollowers] = useState({ instagram: "", facebook: "", twitter: "" });
  const [avgViews, setAvgViews] = useState({ instagram: "", facebook: "", twitter: "" });
  const [image, setImage] = useState(null);
  const [tone, setTone] = useState("friendly");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const calcEngagement = (platform) => {
    const f = followers[platform];
    const v = avgViews[platform];
    return f && v ? ((v / f) * 100).toFixed(2) : 0;
  };

  const engagements = {
    instagram: calcEngagement("instagram"),
    facebook: calcEngagement("facebook"),
    twitter: calcEngagement("twitter"),
  };

  const bestPlatform = Object.keys(engagements).reduce((a, b) =>
    parseFloat(engagements[a]) > parseFloat(engagements[b]) ? a : b
  );

  // Caption suggestions per tone
  const captions = {
    professional: `Presenting ${productName} — designed for excellence and crafted for impact. #Innovation #Quality`,
    friendly: `Meet ${productName}! 💖 Crafted with love and passion just for you. #ShopSmall #WomenEntrepreneurs`,
    trendy: `🚀 ${productName} is taking over the internet! Don't miss the vibe 💫 #ViralTrend #SmallBiz`,
    emotional: `${productName} isn’t just a product — it’s a dream made real. 🌸 Support local talent today!`,
  };

  // Platform captions
  const platformCaptions = {
    instagram: `📸 ${productName}: Show your personality with creative Reels! #BehindTheScenes`,
    facebook: `💬 Discover ${productName} — perfect for everyday moments! #Connect #Community`,
    twitter: `🔥 Just dropped: ${productName}! Join the buzz 🐦 #NowTrending`,
  };

  // Platform recommendations
  const recommendations = {
    instagram: [
      "Use trending Reels audio and keep videos under 15 seconds.",
      "Highlight customer testimonials in Stories.",
      "Show your creative process to build authenticity.",
      "Focus on product detail shots and before/after visuals.",
    ],
    facebook: [
      "Create engaging community posts or live sessions weekly.",
      "Use carousel posts to showcase multiple product benefits.",
      "Encourage customers to share their experiences.",
      "Keep captions conversational and story-like.",
    ],
    twitter: [
      "Use engaging one-liners with emojis.",
      "Participate in relevant trending hashtags.",
      "Retweet satisfied customer comments.",
      "Maintain a fun, approachable tone.",
    ],
  };

  // General marketing tips
  const generalTips = [
    "Maintain consistent color schemes and fonts across platforms.",
    "Engage with your audience in the first hour of posting.",
    "Reuse top-performing content in new formats (reels, tweets, stories).",
    "Collaborate with small creators for cross-promotion.",
    "Keep product videos short, focused, and visually consistent.",
    "Experiment with polls and questions to boost interaction.",
  ];

  // Mocked Image Analysis
  const imageTips = [
    "Image looks slightly dark — try increasing brightness 🌞",
    "Add a soft logo watermark for brand consistency.",
    "Include your product in real-world use scenes.",
    "Try a neutral or pastel background for clarity.",
  ];

  // Mocked Content Calendar
  const calendarSuggestions = [
    { day: "Monday", idea: "Motivational Quote + Product Flatlay" },
    { day: "Wednesday", idea: "Behind the Scenes of Making " + productName },
    { day: "Friday", idea: "Customer Story + Giveaway" },
    { day: "Sunday", idea: "Weekly Recap with Product in Action" },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("📊 Social Media Report", 40, 50);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 80;

    doc.text(`Product Name: ${productName}`, 40, y);
    y += 20;
    doc.text(`Best Performing Platform: ${bestPlatform.toUpperCase()}`, 40, y);
    y += 30;

    Object.keys(engagements).forEach((p) => {
      doc.text(`${p.toUpperCase()} Engagement: ${engagements[p]}%`, 40, y);
      y += 20;
    });

    y += 30;
    doc.setFont("helvetica", "bold");
    doc.text("Caption Suggestions", 40, y);
    y += 20;
    Object.keys(platformCaptions).forEach((p) => {
      doc.text(`${p.toUpperCase()}: ${platformCaptions[p]}`, 50, y, { maxWidth: 500 });
      y += 40;
    });

    y += 20;
    doc.text("General Tips:", 40, y);
    y += 20;
    generalTips.forEach((tip) => {
      doc.text(`- ${tip}`, 50, y, { maxWidth: 500 });
      y += 18;
    });

    y += 20;
    doc.text("🖼️ Image Analysis (Mocked):", 40, y);
    y += 20;
    imageTips.forEach((tip) => {
      doc.text(`• ${tip}`, 50, y);
      y += 18;
    });

    y += 20;
    doc.text("📅 Content Calendar:", 40, y);
    y += 20;
    calendarSuggestions.forEach((c) => {
      doc.text(`${c.day}: ${c.idea}`, 50, y);
      y += 18;
    });

    doc.save(`${productName}_SocialMediaReport.pdf`);
  };

  return (
    <div className="advisor-container">
      <h1>✨ Social Media Advisor ✨</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="advisor-form">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Eco-friendly Tote Bag"
          />

          <label>Upload Product Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          {["instagram", "facebook", "twitter"].map((platform) => (
            <div key={platform} className="platform-inputs">
              <h3>{platform.toUpperCase()}</h3>
              <input
                type="number"
                placeholder="Followers"
                value={followers[platform]}
                onChange={(e) => setFollowers({ ...followers, [platform]: e.target.value })}
              />
              <input
                type="number"
                placeholder="Average Views per Post"
                value={avgViews[platform]}
                onChange={(e) => setAvgViews({ ...avgViews, [platform]: e.target.value })}
              />
            </div>
          ))}

          <label>Choose Caption Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="trendy">Trendy</option>
            <option value="emotional">Emotional</option>
          </select>

          <button type="submit" className="submit-btn">Get My Advice</button>
        </form>
      ) : (
        <div className="results">
          <div className="summary-card">
            <h2>📈 Overview</h2>
            <p><b>Product:</b> {productName}</p>
            <p><b>Top Platform:</b> {bestPlatform.toUpperCase()}</p>
          </div>

          {image && (
            <div className="image-preview">
              <img src={URL.createObjectURL(image)} alt="Product" />
            </div>
          )}

          <div className="engagement-chart">
            {Object.keys(engagements).map((p) => (
              <div key={p} className="bar">
                <span>{p.toUpperCase()}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${engagements[p]}%` }}></div>
                </div>
                <span>{engagements[p]}%</span>
              </div>
            ))}
          </div>

          <div className="caption-box">
            <h3>📝 Recommended Caption ({tone})</h3>
            <p>{captions[tone]}</p>
          </div>

          <div className="recommendations">
            <h3>💡 Platform Growth Advice</h3>
            <div className="platform-tips">
              {Object.keys(recommendations).map((p) => (
                <div key={p} className="platform-card">
                  <h4>{p.toUpperCase()}</h4>
                  {recommendations[p].map((tip, i) => (
                    <p key={i}>{tip}</p>
                  ))}
                  <p className="platform-caption"><i><b>Suggested Caption:</b> {platformCaptions[p]}</i></p>
                </div>
              ))}
            </div>
          </div>

          <div className="image-analysis">
            <h3>🖼️ Image Analysis Tips</h3>
            <ul>{imageTips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>

          <div className="calendar">
            <h3>📅 Content Calendar Suggestions</h3>
            <div className="calendar-grid">
              {calendarSuggestions.map((c, i) => (
                <div key={i} className="calendar-card">
                  <h4>{c.day}</h4>
                  <p>{c.idea}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="extra-tips">
            <h3>🌟 General Growth Tips</h3>
            <ul>{generalTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
          </div>

          <div className="action-buttons">
            <button onClick={() => setSubmitted(false)} className="back-btn">🔙 Back</button>
            <button onClick={handleExportPDF} className="export-btn">📄 Download Report</button>
          </div>
        </div>
      )}
    </div>
  );
}
