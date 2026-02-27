// src/app/auth/AuthDemo.js
"use client"
import React, { useState } from 'react';
import { LoginPage } from './login/page';
import { SignupPage } from './signup/page';

export default function AuthDemo() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <LoginPage onSwitchToSignup={() => setShowLogin(false)} />
      ) : (
        <SignupPage onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}