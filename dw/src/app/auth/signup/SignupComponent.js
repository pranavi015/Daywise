"use client";

export default function SignupComponent({ onSwitchToLogin }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup Page</h1>

      <button onClick={onSwitchToLogin}>
        Already have an account? Login
      </button>
    </div>
  );
}