import { useState, useEffect, useRef } from "react";
import "./../assets/login.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN_SECONDS = 30;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState("email"); // "email" | "otp"

  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // stops the form from reloading the page
    setError("");

    if (!email || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const resetModalState = () => {
    setForgotStep("email");
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setResetError("");
    setResetSuccess("");
    setCooldown(0);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
  };

  const openForgotModal = () => {
    resetModalState();
    setResetEmail(email); // prefill with whatever they typed in the username field, if anything
    setShowForgotModal(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    resetModalState();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setResetError("");

    if (!resetEmail) {
      setResetError("Please enter your email address");
      return;
    }

    setResetLoading(true);
    try {
      await authService.sendOtp(resetEmail);
      setForgotStep("otp");
      startCooldown();
    } catch (err) {
      setResetError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setResetError("");
    setResetLoading(true);
    try {
      await authService.sendOtp(resetEmail);
      startCooldown();
    } catch (err) {
      setResetError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (otp.length !== OTP_LENGTH) {
      setResetError(`Please enter the ${OTP_LENGTH}-digit OTP`);
      return;
    }
    if (!newPassword || !confirmPassword) {
      setResetError("Please enter and confirm your new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setResetError("Password must be at least 8 characters");
      return;
    }

    setResetLoading(true);
    try {
      await authService.resetPassword({
        email: resetEmail,
        otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setResetSuccess("Password reset successful. You can now log in with your new password.");
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    } catch (err) {
      setResetError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setForgotStep("email");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setResetError("");
    setResetSuccess("");
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setCooldown(0);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">
          Pakka Complaint Portal
        </h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          className="forgot-password-link"
          onClick={openForgotModal}
          style={{
            background: "none",
            border: "none",
            color: "#9E1B32",
            fontSize: "13px",
            marginTop: "12px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot password?
        </button>

      </div>

      {showForgotModal && (
        <div
          className="forgot-modal-overlay"
          onClick={closeForgotModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="forgot-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "28px",
              width: "90%",
              maxWidth: "380px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={closeForgotModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "12px",
                right: "14px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>

            {forgotStep === "email" && (
              <>
                <h3 style={{ marginTop: 0, marginBottom: "8px", color: "#9E1B32" }}>
                  Reset your password
                </h3>
                <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                  Enter the email associated with your account and we'll send you a 4-digit OTP.
                </p>

                {resetError && (
                  <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
                    {resetError}
                  </p>
                )}

                <form onSubmit={handleSendOtp}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="login-btn"
                    disabled={resetLoading}
                    style={{ marginTop: "8px" }}
                  >
                    {resetLoading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              </>
            )}

            {forgotStep === "otp" && (
              <>
                <h3 style={{ marginTop: 0, marginBottom: "8px", color: "#9E1B32" }}>
                  Enter OTP & new password
                </h3>
                <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                  We sent a {OTP_LENGTH}-digit code to <strong>{resetEmail}</strong>.
                </p>

                {resetError && (
                  <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
                    {resetError}
                  </p>
                )}
                {resetSuccess && (
                  <p style={{ color: "green", fontSize: "14px", marginBottom: "8px" }}>
                    {resetSuccess}
                  </p>
                )}

                {!resetSuccess && (
                  <form onSubmit={handleResetPassword}>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      placeholder={`${OTP_LENGTH}-digit OTP`}
                      value={otp}
                      maxLength={OTP_LENGTH}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
                      }
                      autoFocus
                    />

                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="login-btn"
                      disabled={resetLoading}
                      style={{ marginTop: "8px" }}
                    >
                      {resetLoading ? "Resetting..." : "Reset Password"}
                    </button>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleBackToEmail}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#666",
                          fontSize: "12px",
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: 0,
                        }}
                      >
                        Change email
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={cooldown > 0 || resetLoading}
                        style={{
                          background: "none",
                          border: "none",
                          color: cooldown > 0 ? "#aaa" : "#9E1B32",
                          fontSize: "12px",
                          cursor: cooldown > 0 ? "default" : "pointer",
                          textDecoration: cooldown > 0 ? "none" : "underline",
                          padding: 0,
                        }}
                      >
                        {cooldown > 0 ? `Resend OTP (${cooldown}s)` : "Resend OTP"}
                      </button>
                    </div>
                  </form>
                )}

                {resetSuccess && (
                  <button
                    type="button"
                    className="login-btn"
                    onClick={closeForgotModal}
                    style={{ marginTop: "8px" }}
                  >
                    Back to Login
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
