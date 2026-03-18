import { useState } from "react"
import { AuthPage } from "../../auth/AuthPage";
import './SiteMenu.css'

export const SiteMenu = () => {
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
            <AuthPage />
          </nav>
        }
      </div>
    </div>
  )
}