import { useState } from "react";
import { set } from "idb-keyval"
import './AuthPage.css'

export const LoginForm = (props) => {
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const loginHandleChange = (e) => {
    setCurrentLogin(e.target.value)
  }

  const passwordHandleChange = (e) => {
    setCurrentPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const currentUser = props.users.find(user => user.login === currentLogin && user.password === currentPassword);
    if (currentUser) {
      props.setIsAuthenticated(true)
      await set("loggedUser", currentUser)
    } else alert("Аккаунт не найден")
  }

  const form = (
    <form
      className="auth-form-container"
      onSubmit={(e) => handleLogin(e)}
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
  )

  return (
    <>
      {form}
      <button
        onClick={() => props.setIsLogining(false)}
      >
        Назад
      </button>
    </>
  )
}