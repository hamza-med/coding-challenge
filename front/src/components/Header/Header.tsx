import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="header">
      <span className="logo">Joke App</span>
      <ul className="nav-links" role="list">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/new">New Joke</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
