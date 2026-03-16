import { useState } from "react"
import { AuthPage } from "../../auth/AuthPage";
import './SiteMenu.css'

interface SiteMenuProps {
  language: 'ru' | 'en';
}

export const SiteMenu = ({ language }: SiteMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? "site-menu-overlay" : ""}>
      <div className="site-menu-container">
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        {open && 
          <nav>
            <AuthPage language={language} open={open} setOpen={setOpen} />
          </nav>
        }
      </div>
    </div>
  )
}