import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import "./AuthPage.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUser } from "../../../app/reducers/userSlice";
import { authService } from "../../../services/authService";

export const AuthPage = () => {
  const [isLogining, setIsLogining] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(state => state.user.user);
  const language = useAppSelector(state => state.language);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      authService.saveAuthData(token, user);
      dispatch(setUser(user));
      setIsLogining(false);
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const { token, user } = await authService.register(email, password, username);
      authService.saveAuthData(token, user);
      dispatch(setUser(user));
      setIsReg(false);
      return user;
    } catch (err) {
      const error = err as Error;
      alert(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(setUser(null));
  };

  if (!loggedUser) {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }

  if (!isLogining && !isReg) {
    return (
      <div className="auth-container">
        {loggedUser
          ? 
            <div className="logged-user">
              <strong>{loggedUser.username}</strong>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                {language === 'ru' ? "Выйти" : "Log Out"}
              </button>
            </div>
          :
            <>
              <button onClick={() => setIsLogining(true)}>
                {language === "ru" ? "Войти" : "Login"}
              </button>
              <button onClick={() => setIsReg(true)}>
                {language === "ru" ? "Зарегистрироваться" : "Sign Up"}
              </button>
            </>
        }
      </div>
    );
  }

  if (isLogining) return <LoginForm handleLogin={handleLogin} setIsLogining={setIsLogining} />;
  if (isReg) return <SignUpForm handleSignUp={handleSignUp} setIsReg={setIsReg} />;

  return null;
};