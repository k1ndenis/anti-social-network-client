import { useState, type SetStateAction } from "react";
import type { User } from "../types/user";
import "./AuthPage.css";
import type { AuthError } from "firebase/auth";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../app/reducers/userSlice";

type SignUpFormProps = {
  handleSignUp: (email: string, password: string, username?: string) => Promise<User>;
  setIsReg: React.Dispatch<SetStateAction<boolean>>;
  language: "ru" | "en";
};

export const SignUpForm = ({ handleSignUp, setIsReg, language }: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await handleSignUp(email, password, username || undefined);
      dispatch(setUser(newUser));
      setIsReg(false);
    } catch (err) {
      const error = err as AuthError;
      alert(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>{language === "ru" ? "Регистрация" : "Sign-up"}</h2>
        <input
          className="auth-input"
          type="text"
          placeholder={language === "ru" ? "Придумайте имя" : "Choose a username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="email"
          placeholder={language === "ru" ? "Введите email" : "Enter email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder={language === "ru" ? "Придумайте пароль" : "Choose a password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">
          {language === "ru" ? "Зарегистрироваться" : "Sign Up"}
        </button>
      </form>
      <button onClick={() => setIsReg(false)}>
        {language === "ru" ? "Назад" : "Back"}
      </button>
    </div>
  );
};