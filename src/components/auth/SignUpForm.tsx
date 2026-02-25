import { useState, type SetStateAction } from "react";
import { set } from "idb-keyval"
import type { User } from './types/user'
import './AuthPage.css'

type SignUpFormProps = {
  users: User[];
  setUsers: React.Dispatch<SetStateAction<User[]>>;
  setLoggedUser: React.Dispatch<SetStateAction<User | null>>;
  setIsReg: React.Dispatch<SetStateAction<boolean>>;
  language: 'ru' | 'en'
}

export const SignUpForm = ({ users, setUsers, setLoggedUser, setIsReg, language }: SignUpFormProps) => {
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const loginHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLogin(e.target.value);
  }

  const passwordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newUser: User = {
      id: crypto.randomUUID(),
      login: currentLogin,
      password: currentPassword
    }
    if (users.find(user => user.login === newUser.login)) {
      alert("Логин занят")
    } else {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await set("users", updatedUsers);
      setLoggedUser(newUser);
      await set("loggedUser", newUser);
    }
  }

  return (
    <>
      <form
        className="auth-form-container"
        onSubmit={handleSignUp}
      >
        <h2>{language === 'ru' ? "Регистрация" :  "Sign-up"}</h2>
        <input
          className="auth-input"
          type="text"
          placeholder={language === 'ru' ? "Придумайте логин" :  "Choose a username"}
          value={currentLogin}
          onChange={loginHandleChange}
        />
        <input
          className="auth-input"
          type="password"
          placeholder={language === 'ru' ? "Придумайте пароль" :  "Choose a password"}
          value={currentPassword}
          onChange={passwordHandleChange}
        />
        <button
          className="auth-button"
          type="submit"
        >
          {language === 'ru' ? "Зарегистрироваться" :  "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setIsReg(false)}
      >
        {language === 'ru' ? "Назад" :  "Back"}
      </button>
    </>
  )
}