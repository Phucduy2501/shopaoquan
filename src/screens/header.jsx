import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import "../styles/sualoi.css";

const Header = ({
  query = "",
  setQuery = () => {},
  onCartClick = () => {},
}) => {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ||
    !!localStorage.getItem("user");

  if (!isLoggedIn) {
    return null;
  }

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="site-header">
      {/* Logo */}
      <Link to="/users">
        <img src="/img/logo.png" alt="Logo" />
      </Link>

      {/* Menu chính */}
      <nav id="header">
        <ul>
          <li>
            <Link to="/users">HÀNG MỚI VỀ</Link>
          </li>
          <li>
            <Link to="/ao-so-mi">ÁO NAM</Link>
            <ul className="dropdown">
              <li>
                <Link to="/ao-so-mi">Áo sơ mi</Link>
              </li>
              <li>
                <Link to="/ao-thun">Áo thun</Link>
              </li>
              <li>
                <Link to="/ao-Polo">Áo polo</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">QUẦN NAM</Link>
            <ul className="dropdown">
              <li>
                <Link to="/quan-jeans">Quần jeans</Link>
              </li>
              <li>
                <Link to="/quan-tay">Quần tây</Link>
              </li>
              <li>
                <Link to="/quan-kaki">Quần kaki</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/phu-kien">PHỤ KIỆN</Link>
          </li>
          <li>
            <Link to="/giay-dep">GIÀY DÉP</Link>
          </li>
          <li>
            <Link to="/outlet-safe">OUTLET SAFE</Link>
          </li>
        </ul>
      </nav>

      <div className="header__lf">
        <HeaderSearch query={query} setQuery={setQuery} />

        <div className="header__lf-icon" onClick={onCartClick}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>

        {user && (
          <div className="header__account">
            <span className="header__hello">
              Xin chào,&nbsp;<b>{user.username || "User"}</b>
            </span>
            <br />
            <button className="header__logout" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
