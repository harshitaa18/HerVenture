import React, { useState } from "react";
import "./SocialMediaAdvisor.css";

export default function SocialMediaAdvisor() {
  const [productName, setProductName] = useState("");
  const [followers, setFollowers] = useState("");
  const [avgViews, setAvgViews] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !followers || !avgViews || !image) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitted(true);
  };

  const engagementRate =
    followers && avgViews ? ((avgViews / followers) * 100).toFixed(2) : 0;

  const level =
    engagementRate > 10
      ? "Excellent"
      : engagementRate > 5
      ? "Good"
      : "Needs Improvement";

  // Dynamically decide which platform to focus on
  const focusPlatform =
    engagementRate > 10
      ? "Instagram"
      : engagementRate > 5
      ? "Facebook"
      : "Twitter";

  const postFrequency =
    focusPlatform === "Instagram"
      ? "4-5 posts per week (2 reels + 2 static posts)"
      : focusPlatform === "Facebook"
      ? "3-4 posts per week (mix of stories and community posts)"
      : "Daily short updates (tweets + media)";

  const recommendations = {
    Instagram: [
      "Use trending audio and short product reels.",
      "Add hashtags like #WomenEntrepreneurs, #ShopSmall.",
      "Highlight customer testimonials in your stories.",
      "Collaborate with small creators for cross-promotion.",
    ],
    Facebook: [
      "Host giveaways or contests once a month.",
      "Post in relevant business or community groups.",
      "Respond to every comment within 24 hours.",
      "Share behind-the-scenes stories of your product journey.",
    ],
    Twitter: [
      "Engage in trending conversations with hashtags.",
      "Post polls or questions to boost interaction.",
      "Retweet industry updates to stay visible.",
      "Use short, powerful one-liners about your mission.",
    ],
  };

  const captions = {
    Instagram: `✨ Introducing ${productName}! Your new favorite companion for everyday life. #Innovation #Entrepreneurship`,
    Facebook: `Say hello to ${productName} 💫 — crafted with love, designed to inspire. Support local dreams! 💕`,
    Twitter: `${productName} is here to change the game! 🚀 #SmallBiz #WomenInBusiness`,
  };

  const generalTips = [
    "Use analytics to see which post times get the most engagement.",
    "Try boosting high-performing posts with small ad budgets.",
    "Keep your brand tone consistent across all platforms.",
    "Engage with comments within the first hour of posting.",
    "Use product-based hashtags and tag relevant accounts.",
  ];

  return (
    <div className="advisor-container">
      <h1>Social Media Advisor</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="input-form">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Eco-friendly Tote Bag"
          />

          <label>Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label>Number of Followers</label>
          <input
            type="number"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="e.g. 1500"
          />

          <label>Average Views per Post</label>
          <input
            type="number"
            value={avgViews}
            onChange={(e) => setAvgViews(e.target.value)}
            placeholder="e.g. 600"
          />

          <button type="submit">Get My Advice</button>
        </form>
      ) : (
        <div className="results">
          <div className="summary-box">
            <h2>Page Summary</h2>
            <p>
              <b>Product Name:</b> {productName}
            </p>
            <p>
              <b>Followers:</b> {followers}
            </p>
            <p>
              <b>Average Views:</b> {avgViews}
            </p>
            <p>
              <b>Engagement Rate:</b> {engagementRate}% ({level})
            </p>
            <p>
              <b>Focus Platform:</b> {focusPlatform}
            </p>
            <p>
              <b>Recommended Posting Frequency:</b> {postFrequency}
            </p>
          </div>

          {image && (
            <div className="image-preview">
              <h3>Product Image</h3>
              <img src={URL.createObjectURL(image)} alt="Product" />
            </div>
          )}

          <div className="advisor-section">
            <h2>Platform Recommendations</h2>
            {Object.keys(recommendations).map((platform) => (
              <div key={platform} className="platform-box">
                <h3>{platform}</h3>
                <ul>
                  {recommendations[platform].map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                <p>
                  <b>Suggested Caption:</b> {captions[platform]}
                </p>
              </div>
            ))}
          </div>

          <div className="extra-tips">
            <h2>Extra Growth Tips</h2>
            <ul>
              {generalTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <button className="back-btn" onClick={() => setSubmitted(false)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}
