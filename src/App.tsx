import { useEffect, useState } from 'react'
import './App.css'
import { AuthPage } from './components/auth/AuthPage'
import { ToggleLanguage } from './components/ui/ToggleLanguage/ToggleLanguage';
import { Menu } from './components/menu/Menu';
import { auth } from './components/auth/utils/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from './hooks/redux';
import { setUser } from './app/reducers/userSlice';

function App() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          id: firebaseUser.uid,
          username: firebaseUser.displayName || "unknown",
          email: firebaseUser.email || ""
        }))
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch])

  return (
    <>
      <ToggleLanguage language={language} setLanguage={setLanguage} />
      <AuthPage language={language} />
      <Menu language={language} />
    </>
  )
}

export default App
