import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import type { User } from "../types/user";
import { auth } from "./utils/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  User as FirebaseUser,
  AuthError
} from "firebase/auth";
import "./AuthPage.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUser } from "../../app/reducers/userSlice";

export const AuthPage = () => {
  const [isLogining, setIsLogining] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(state => state.user.user);
  const language = useAppSelector(state => state.language);

  const mapFirebaseUser = (user: FirebaseUser): User => ({
    id: user.uid,
    username: user.displayName || user.email || "",
    email: user.email || "",
    likedPicturesIds: [],
    listening: null
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(mapFirebaseUser(userCredential.user)));
      setIsLogining(false);
    } catch (err) {
      const error = err as AuthError;
      alert(error.message);
    }
  };

  const handleSignUp = async (email: string, password: string, username?: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;

  if (username) {
    await updateProfile(firebaseUser, { displayName: username });
  }

  const newUser: User = {
    id: firebaseUser.uid,
    username: firebaseUser.displayName || firebaseUser.email || "",
    email: firebaseUser.email || "",
    likedPicturesIds: [],
    listening: null
  };

  dispatch(setUser(newUser));
  setIsReg(false);
  return newUser;
};

const handleLogout = async () => {
  await signOut(auth);
  dispatch(setUser(null));
};

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