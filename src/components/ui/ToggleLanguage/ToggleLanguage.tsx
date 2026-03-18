import { useState } from 'react'
import './ToggleLanguage.css'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setLanguage } from '../../../app/reducers/languageSlice';

export const ToggleLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useAppSelector(state => state.language)
  const dispatch = useAppDispatch();

  return (
    <div className='toggle-language-container'>
      <button onClick={() => setIsOpen(!isOpen)}>{language === 'ru' ? "🇷🇺 Rus" : "🇺🇸 Eng"}</button>
      {isOpen && <ul className='languages'>
        <li className='language'
          onClick={() => {
            dispatch(setLanguage('ru'))
            setIsOpen(false);
          }}
        >
          🇷🇺 Rus
        </li>
        <li className='language'
          onClick={() => {
            dispatch(setLanguage('en'))
            setIsOpen(false);
          }}
        >
          🇺🇸 Eng
        </li>
      </ul>}
    </div>
  )
}