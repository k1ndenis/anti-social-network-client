import { useState } from "react";
import { set } from "idb-keyval"
import type { User } from './types/user'
import './AuthPage.css'

type LoginFormProps = {
  users: User[];
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLogining: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm = ({ users, setLoggedUser, setIsLogining }: LoginFormProps) => {
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const loginHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLogin(e.target.value);
  }

  const passwordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const currentUser = users.find(user => user.login === currentLogin && user.password === currentPassword);
    if (currentUser) {
      setLoggedUser(currentUser);
      await set("loggedUser", currentUser);
    } else {
      alert("Аккаунт не найден");
    }
  }

  return (
    <>
      <form
        className="auth-form-container"
        onSubmit={handleLogin}
      >
        <h2>Вход</h2>
        <input
          className="auth-input"
          type="text"
          placeholder="Введите логин"
          value={currentLogin}
          onChange={loginHandleChange}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Введите пароль"
          value={currentPassword}
          onChange={passwordHandleChange}
        />
        <button
          className="auth-button"
          type="submit"
        >
          Войти
        </button>
      </form>
      <button
        onClick={() => setIsLogining(false)}
      >
        Назад
      </button>
    </>
  )
}