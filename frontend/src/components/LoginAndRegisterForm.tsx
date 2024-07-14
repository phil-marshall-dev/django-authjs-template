"use client"

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useEffect, useState } from "react";

const LoginAndRegisterForm: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const form = showLogin ? <LoginForm /> : <RegisterForm />;
  const switchText = showLogin
    ? "New to our site?"
    : "Already have an account?";
  const switchLinkText = showLogin ? "Register an account" : "Login";
  const switchLinkAction = showLogin
    ? (e) => {
      e.preventDefault();
      setShowLogin(false);
      return false;
    }
    : (e) => {
      e.preventDefault();
      setShowLogin(true);
      return false;
    }

  return (
    <div className="container">
      {form}
      <p className="mt-3">
        {switchText}{" "}
        <a href="#" onClick={switchLinkAction}>
          {switchLinkText}
        </a>
      </p>
    </div>
  );
};

export default LoginAndRegisterForm;
