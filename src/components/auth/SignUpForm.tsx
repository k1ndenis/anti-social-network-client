import { useState } from "react";
import { set } from "idb-keyval"
import './AuthPage.css'

export const SignUpForm = (props) => {
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const loginHandleChange = (e) => {
    setCurrentLogin(e.target.value);
  }

  const passwordHandleChange = (e) => {
    setCurrentPassword(e.target.value);
  }

  const handleSignUp = async (e, log, pas) => {
    e.preventDefault();
    const newUser = {
      login: log,
      password: pas
    }
    if (props.users.find(user => user.login == newUser.login)) {
      alert("Логин занят")
    } else {
      const updatedUsers = [...props.users, newUser];
      props.setUsers(updatedUsers);
      await set("users", updatedUsers);
      props.setIsAuthenticated(true);
      await set("loggedUser", newUser);
    }
  }

  const form = (
    <form
      className="auth-form-container"
      onSubmit={(e) => handleSignUp(e, currentLogin, currentPassword)}
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
  )

  return (
    <>
      {form}
      <button
        onClick={() => props.setIsReg(false)}
      >
        Назад
      </button>
    </>
  )
}