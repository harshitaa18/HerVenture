import { useState, useEffect } from "react";
import { X, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "./ScrollTriggeredBanner.css"; // 👈 import external CSS

const ScrollTriggeredBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`scroll-banner ${isVisible ? "visible" : "hidden"}`}
    >
      <div className="scroll-banner-wrapper">
        <div className="scroll-banner-border">
          <div className="scroll-banner-content">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="close-btn"
              aria-label="Dismiss banner"
            >
              <X className="icon" />
            </button>

            {/* Icons + Text */}
            <div className="banner-left">
              <div className="banner-icons">
                <div className="icon-circle purple">
                  <Sparkles className="icon-inner" />
                </div>
                <div className="icon-circle pink">
                  <TrendingUp className="icon-inner" />
                </div>
                <div className="icon-circle indigo">
                  <Users className="icon-inner" />
                </div>
              </div>

              <div className="banner-text">
                <h3>Ready to Boost Your Social Media?</h3>
                <p>Get expert advice and grow your online presence today!</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/social" className="banner-btn">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggeredBanner;
