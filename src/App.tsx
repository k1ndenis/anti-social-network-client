import { useState } from 'react'
import './App.css'
import { AuthPage } from './components/auth/AuthPage'
import { ToggleLanguage } from './components/ToggleLanguage/ToggleLanguage';

function App() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  return (
    <>
      <ToggleLanguage language={language} setLanguage={setLanguage} />
      <AuthPage language={language} />
    </>
  )
}

export default App
