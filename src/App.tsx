import { useState } from 'react'
import './App.css'
import { AuthPage } from './components/auth/AuthPage'
import { ToggleLanguage } from './components/ToggleLanguage/ToggleLanguage';
import { Menu } from './components/menu/Menu';

function App() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');


  return (
    <div className='app-container'>
      <ToggleLanguage language={language} setLanguage={setLanguage} />
      <div className='auth-page'>
        <AuthPage language={language} />
      </div>
      <Menu language={language} />
    </div>
  )
}

export default App
