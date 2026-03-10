"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface PiUser {
  uid: string;
  username: string;
  role: "user" | "admin" | "driver";
}

interface PiAuthContextType {
  user: PiUser | null;
  loading: boolean;
  connected: boolean;
  paymentAuthorized: boolean;
  error: string | null;
  connect: () => Promise<void>;
  authorizePayments: () => Promise<void>;
  sandboxLogin: () => Promise<void>;
  disconnect: () => void;
  isPiBrowser: boolean;
  isSandboxMode: boolean;
}

const PiAuthContext = createContext<PiAuthContextType>({
  user: null,
  loading: false,
  connected: false,
  paymentAuthorized: false,
  error: null,
  connect: async () => {},
  authorizePayments: async () => {},
  sandboxLogin: async () => {},
  disconnect: () => {},
  isPiBrowser: false,
  isSandboxMode: false,
});

export function usePiAuth() {
  return useContext(PiAuthContext);
}

export function PiAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const isSandboxMode = process.env.NEXT_PUBLIC_PI_SANDBOX === "true";

  // Detect Pi Browser & init SDK
  useEffect(() => {
    const inPiBrowser = typeof window !== "undefined" && !!window.Pi;
    setIsPiBrowser(inPiBrowser);

    if (inPiBrowser && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: isSandboxMode });
      setSdkReady(true);
    }
  }, [isSandboxMode]);

  const authenticateWithScopes = useCallback(async (scopes: string[]) => {
    if (!window.Pi) {
      setError("Please open this app in Pi Browser");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const authResult = await window.Pi.authenticate(
        scopes,
        function onIncompletePaymentFound(payment: unknown) {
          console.log("Incomplete payment found:", payment);
        }
      );

      // Verify token on our server
      const verifyRes = await fetch("/api/auth/pi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: authResult.accessToken }),
      });

      if (!verifyRes.ok) {
        throw new Error("Server verification failed");
      }

      const { user: verifiedUser } = await verifyRes.json();

      setUser(verifiedUser);
      sessionStorage.setItem("pi_uid", verifiedUser.uid);
      sessionStorage.setItem("pi_username", verifiedUser.username);
      sessionStorage.setItem("pi_role", verifiedUser.role || "user");

      const hasPaymentsScope = scopes.includes("payments");
      if (hasPaymentsScope) {
        setPaymentAuthorized(true);
        sessionStorage.setItem("pi_payments_authorized", "true");
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const connect = useCallback(async () => {
    // Login-only flow: do not request payment permissions here.
    await authenticateWithScopes(["username"]);
  }, [authenticateWithScopes]);

  const authorizePayments = useCallback(async () => {
    if (paymentAuthorized) {
      return;
    }

    const ok = await authenticateWithScopes(["username", "payments"]);
    if (!ok) {
      throw new Error("Payment authorization failed");
    }
  }, [authenticateWithScopes, paymentAuthorized]);

  const sandboxLogin = useCallback(async () => {
    if (!isSandboxMode) {
      setError("Sandbox login is only available when NEXT_PUBLIC_PI_SANDBOX=true");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/pi/sandbox-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "admin" }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Sandbox test login failed");
      }

      const { user: sandboxUser } = await res.json();
      setUser(sandboxUser);
      sessionStorage.setItem("pi_uid", sandboxUser.uid);
      sessionStorage.setItem("pi_username", sandboxUser.username);
      sessionStorage.setItem("pi_role", sandboxUser.role || "user");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sandbox login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isSandboxMode]);

  // Auto-connect: restore session or auto-login in Pi Browser
  useEffect(() => {
    if (sdkReady && !user) {
      const savedUid = sessionStorage.getItem("pi_uid");
      const savedUsername = sessionStorage.getItem("pi_username");
      const savedRole = sessionStorage.getItem("pi_role") as "user" | "admin" | "driver" | null;
      const savedPaymentAuth = sessionStorage.getItem("pi_payments_authorized") === "true";
      if (savedUid && savedUsername) {
        setUser({ uid: savedUid, username: savedUsername, role: savedRole || "user" });
        setPaymentAuthorized(savedPaymentAuth);
      } else {
        // Auto-login: authenticate automatically when in Pi Browser
        connect();
      }
    }
  }, [sdkReady, user, connect]);

  const disconnect = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("pi_uid");
    sessionStorage.removeItem("pi_username");
    sessionStorage.removeItem("pi_role");
    sessionStorage.removeItem("pi_payments_authorized");
    setPaymentAuthorized(false);
    fetch("/api/auth/pi/logout", { method: "POST" }).catch(() => {
      // Ignore logout sync errors; local session is already cleared.
    });
  }, []);

  return (
    <PiAuthContext.Provider
      value={{
        user,
        loading,
        connected: !!user,
        paymentAuthorized,
        error,
        connect,
        authorizePayments,
        sandboxLogin,
        disconnect,
        isPiBrowser,
        isSandboxMode,
      }}
    >
      {children}
    </PiAuthContext.Provider>
  );
}
