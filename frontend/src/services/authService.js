const API_BASE_URL = "http://127.0.0.1:8000/api";

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.email?.[0] || data.message || "Login failed";
      throw new Error(errorMessage);
    }

    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));

    return data;
  },

  async logout() {
    const token = localStorage.getItem("auth_token");
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  },

  async sendOtp(email) {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.email?.[0] || data.message || "Failed to send OTP";
      throw new Error(errorMessage);
    }

    return data;
  },

  async resetPassword({ email, otp, password, password_confirmation }) {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, password, password_confirmation }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.otp?.[0] ||
        data.errors?.email?.[0] ||
        data.errors?.password?.[0] ||
        data.message ||
        "Failed to reset password";
      throw new Error(errorMessage);
    }

    return data;
  },

  getCurrentUser() {
    const user = localStorage.getItem("auth_user");
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },
};
