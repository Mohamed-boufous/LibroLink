import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EmailSentPage() {
  const [timer, setTimer] = useState(6);
  const [resendClicked, setResendClicked] = useState(true);
  const [waitingText, setWaitingText] = useState(true);

  useEffect(() => {
    let interval;
    if (resendClicked && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendClicked(false);
      setTimer(6);
      setWaitingText(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendClicked, timer]);

  const handleResendClick = () => {
    setResendClicked(true);
    setWaitingText(true);
  };

  return (
    <div
      style={{
        maxWidth: "28rem",
        margin: "auto",
        marginTop: "3rem",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffa500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "1rem" }}
        >
          <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
          <polyline points="15,9 18,9 18,11"></polyline>
          <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path>
          <line x1="6" x2="7" y1="10" y2="10"></line>
        </svg>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "0" }}>
          Email Confirmation
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#636363",
            marginTop: "0.5rem",
          }}
        >
          We have sent an email to{" "}
          <span style={{ color: "#ffa500", textDecoration: "underline" }}>
            boufousmohamed@gmail.com
          </span>
          to confirm the validity of our email address. After receiving the
          email follow the link provided to complete your registration.
        </p>
      </div>
      <hr
        style={{
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
          borderColor: "#dcdcdc",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "#636363" }}>
          {waitingText
            ? "You have to wait"
            : "If you have not received any mail"}
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <button
            onClick={handleResendClick}
            disabled={resendClicked}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              color: "#ffffff",
            }}
            className="button button-primary bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed"
          >
            {waitingText ? `Resending (${timer}s)` : "Resend confirmation mail"}
          </button>
          <Link to={"/login"}>
            <button
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
                border: "1px solid #ffa500",
                color: "#ffa500",
              }}
              className="button button-secondary"
            >
              Return to login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailSentPage;
