import { useState, type SetStateAction } from "react";
import { set } from "idb-keyval"
import type { User } from './types/user'
import './AuthPage.css'

type SignUpFormProps = {
  users: User[];
  setUsers: React.Dispatch<SetStateAction<User[]>>;
  setLoggedUser: React.Dispatch<SetStateAction<User | null>>;
  setIsReg: React.Dispatch<SetStateAction<boolean>>;
}

export const SignUpForm = ({ users, setUsers, setLoggedUser, setIsReg }: SignUpFormProps) => {
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
        <h2>Регистрация</h2>
        <input
          className="auth-input"
          type="text"
          placeholder="Придумайте логин"
          value={currentLogin}
          onChange={loginHandleChange}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Придумайте пароль"
          value={currentPassword}
          onChange={passwordHandleChange}
        />
        <button
          className="auth-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <button
        onClick={() => setIsReg(false)}
      >
        Назад
      </button>
    </>
  )
}