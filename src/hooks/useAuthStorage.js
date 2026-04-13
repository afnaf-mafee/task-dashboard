import { useCallback } from "react";

const USER_KEY = "user";
const TOKEN_KEY = "accessToken";

export const useAuthStorage = () => {
  // ✅ Save auth data
  const setAuth = useCallback((user, token) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }, []);

  // ✅ Get auth data
  const getAuth = useCallback(() => {
    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);

    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  }, []);

  // ✅ Remove auth data (logout)
  const clearAuth = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  return {
    setAuth,
    getAuth,
    clearAuth,
  };
};