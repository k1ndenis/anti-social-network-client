import { useState } from "react";
import "./AuthPage.css";
import type { AuthError } from "firebase/auth";

type LoginFormProps = {
  handleLogin: (email: string, password: string) => Promise<void>;
  setIsLogining: React.Dispatch<React.SetStateAction<boolean>>;
  language: "ru" | "en";
};

export const LoginForm = ({ handleLogin, setIsLogining, language }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (err) {
      const error = err as AuthError;
      alert(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>{language === "ru" ? "Вход" : "Login"}</h2>
        <input
          className="auth-input"
          type="email"
          placeholder={language === "ru" ? "Введите email" : "Enter email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder={language === "ru" ? "Введите пароль" : "Enter password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">
          {language === "ru" ? "Войти" : "Log In"}
        </button>
      </form>
      <button onClick={() => setIsLogining(false)}>
        {language === "ru" ? "Назад" : "Back"}
      </button>
    </div>
  );
};