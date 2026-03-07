import { useState } from 'react'
import './ToggleLanguage.css'

interface ToggleLanguageProps {
  language: 'ru' | 'en';
  setLanguage: React.Dispatch<React.SetStateAction<'ru' | 'en'>>
}

export const ToggleLanguage = ({ language, setLanguage }: ToggleLanguageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='toggle-language-container'>
      <button onClick={() => setIsOpen(!isOpen)}>{language === 'ru' ? "🇷🇺 Rus" : "🇺🇸 Eng"}</button>
      {isOpen && <ul className='languages'>
        <li className='language'
          onClick={() => {
            setLanguage('ru');
            setIsOpen(false);
          }}
        >
          🇷🇺 Rus
        </li>
        <li className='language'
          onClick={() => {
            setLanguage('en');
            setIsOpen(false);
          }}
        >
          🇺🇸 Eng
        </li>
      </ul>}
    </div>
  )
}