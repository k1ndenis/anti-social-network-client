import { useEffect, useState } from "react"
import { get, set } from "idb-keyval"
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import { Menu } from "./../menu/Menu";
import type { User } from './types/user'
import './AuthPage.css'

interface AuthPageProps {
  language: 'ru' | 'en'
}

export const AuthPage = ({ language }: AuthPageProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLogining, setIsLogining] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadLoggedUser = async (): Promise<void> => {
      const user = await get<User | null>("loggedUser");
      setLoggedUser(user ?? null);
    }
    loadLoggedUser();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      const savedUsers = await get<User[]>("users");
      setUsers(savedUsers ?? []);
    }
    loadUsers();
  }, []);

  const handleLogout = async (): Promise<void> => {
    await set("loggedUser", null);
    setLoggedUser(null);
  }

  if (loggedUser) return (
    <Menu
      handleLogout={handleLogout}
      language={language}
    />
  )

  if (!isLogining && !isReg) return (
    <div className="auth-container">
      <button
        onClick={() => setIsLogining(true)}
      >
        {language === 'ru' ? "Войти" : "Login"}
      </button>
      <button
        onClick={() => setIsReg(true)}
      >
        {language === 'ru' ? "Зарегистрироваться" : "Sign Up"}
      </button>
    </div>
  )

  if (isLogining) return (
    <LoginForm
      setLoggedUser={setLoggedUser}
      users={users}
      setIsLogining={setIsLogining}
      language={language}
    />
  )

  if (isReg) return (
    <SignUpForm
      setLoggedUser={setLoggedUser}
      users={users}
      setUsers={setUsers}
      setIsReg={setIsReg}
      language={language}
    />
  )
}

