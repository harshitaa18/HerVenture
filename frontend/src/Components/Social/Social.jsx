import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Social.css";

const Social = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle Esc to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div
        className={`hv-chat-bubble ${open ? "open" : ""}`}
        role="button"
        aria-label={open ? "Close assistant" : "Open social assistant"}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
        }}
      >
        {/* Chat icon + small notification dot */}
        <svg
          className="hv-chat-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path
            d="M2 12a10 10 0 0 1 17.32-7.32A10 10 0 1 1 2 12z"
            fill="currentColor"
            opacity="0.08"
          />
          <path
            d="M12 2a10 10 0 0 1 9.95 9.17A9.98 9.98 0 0 1 4 21l1.64-3.28A7.5 7.5 0 1 1 12 2z"
            fill="currentColor"
          />
        </svg>

      </div>

      <div
        ref={panelRef}
        className={`hv-assistant-panel ${open ? "visible" : ""}`}
        aria-hidden={!open}
      >
        <div className="hv-panel-header">
          <div>
            <strong>Hi! Need help growing online?</strong>
            <div className="hv-sub">Let me suggest strategies & ideas 👩‍💻</div>
          </div>
          <button
            className="hv-close-btn"
            aria-label="Close assistant panel"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="hv-panel-body">
          <p className="hv-panel-text">
            Choose a quick path — personalized help or price-check tools.
          </p>

          <div className="hv-cta-row">
            <Link to="" className="hv-cta hv-cta-primary" onClick={() => setOpen(false)}>
              Get Social Media Advice
            </Link>
          </div>

          <div className="hv-help-links">
            <button
              type="button"
              className="hv-text-link"
              onClick={() => {
                // quick action example: open social-advisor in a new tab
                window.open("/social-advisor", "_blank");
              }}
            >
              Quick: generate a 7-day content plan
            </button>
          </div>
        </div>

        <div className="hv-panel-footer">
          <small>Powered by HerVenture Advisor • Privacy-friendly</small>
        </div>
      </div>
    </>
  );
};

export default Social;
