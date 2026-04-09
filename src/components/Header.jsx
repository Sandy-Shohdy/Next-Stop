import { NavLink } from "react-router-dom";
import "./Header.css";
import "../global.css";

export default function Header() {
  // REVIEW: Use a semantic <header> element instead of <div className="header"> for accessibility and SEO.
  return (
    <div className="header">
      <NavLink to="/" className="navbar-logo">
        ✈️ Next-Stop
      </NavLink>

      <div className="left-section">
        {/* REVIEW: Class name "Nav-Bar" uses inconsistent casing (PascalCase-with-hyphen). Rest of the project uses lowercase-hyphen (e.g. "card-grid", "home-page"). Use "nav-bar" for consistency. */}
        <nav className="Nav-Bar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/visited">Visited</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </div>
  );
}
