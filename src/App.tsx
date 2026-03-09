import { useState } from 'react'
import './App.css'
import { AuthPage } from './components/auth/AuthPage'
import { ToggleLanguage } from './components/ToggleLanguage/ToggleLanguage';
import { Menu } from './components/menu/Menu';
import { User } from './components/auth/types/user';

function App() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [loggedUser, setLoggedUser] = useState<User | null>(null);


  return (
    <div className='app-container'>
      <ToggleLanguage language={language} setLanguage={setLanguage} />
      <div className='auth-page'>
        <AuthPage language={language} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      </div>
      <Menu language={language} loggedUser={loggedUser} />
    </div>
  )
}

export default App
