import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.svg";
import { FaChevronLeft } from "react-icons/fa";

import "./styles.css";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Github Explorer" />
      {pathname !== "/" && (
        <Link to="/" className="back-link">
          <FaChevronLeft size={16} color="#A8A8B3" />
          Voltar
        </Link>
      )}
    </header>
  );
}
