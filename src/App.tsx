import { useEffect } from 'react'
import './App.css'
import { ToggleLanguage } from './components/ui/ToggleLanguage/ToggleLanguage';
import { Menu } from './components/menu/Menu';
import { auth } from './components/auth/utils/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from './hooks/redux';
import { setUser } from './app/reducers/userSlice';
import { SiteMenu } from './components/ui/SiteMenu/SiteMenu';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          id: firebaseUser.uid,
          username: firebaseUser.displayName || "unknown",
          email: firebaseUser.email || "",
          likedPicturesIds: [],
          listening: null
        }))
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch])

  return (
    <>
      <SiteMenu />
      <ToggleLanguage />
      <Menu />
    </>
  )
}

export default App
