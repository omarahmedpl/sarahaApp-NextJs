// components/SessionManager.tsx
"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../actions/auth";
import Loading from "../ui/Loading";
import { useAuthStore } from "../zustand/store";

const SessionManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [, setSessionStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setUserData] = useState<any>(null);
  const { setSession, logout } = useAuthStore();
  useEffect(() => {
    const token = getCookie("auth-token"); // Retrieve JWT from cookies
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT token
        if (decoded) {
          setSessionStatus("Logged In");
          setUserData(decoded); // Store the decoded user data (if any)
          setSession(token, decoded); // Set the session in the store
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        logout();
      }
    } else {
      setSessionStatus("Logged Out");
      logout();
    }
    setLoading(false);
  }, [logout, setSession]);

  return <>{loading ? <Loading /> : <>{children}</>}</>;
};

export default SessionManager;
