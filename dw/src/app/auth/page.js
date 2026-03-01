"use client";

import { useState } from "react";
import LoginComponent from "./login/LoginComponent";
import SignupComponent from "./signup/SignupComponent";

export default function AuthDemo() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <LoginComponent onSwitchToSignup={() => setShowLogin(false)} />
      ) : (
        <SignupComponent onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}