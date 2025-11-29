import React from "react";
import HeaderSearch from "./HeaderSearch"; 
import "../styles/sualoi.css"

const Header = ({
  query = "",
  setQuery = () => {},
  onCartClick = () => {},
}) => {
  return (
    <header className="site-header">
      <a href="/">
        <img src="/img/logo.png" alt="Logo" />
      </a>

      <nav id="header">
        <ul>
          <li><a href="/users">HÀNG MỚI VỀ</a></li>
          <li>
            <a href="/ao-so-mi">ÁO NAM</a>
            <ul className="dropdown">
              <li><a href="/ao-so-mi">Áo sơ mi</a></li>
              <li><a href="/ao-thun">Áo thun</a></li>
              <li><a href="/ao-Polo">Áo polo</a></li>
            </ul>
          </li>
          <li>
            <a href="#">QUẦN NAM</a>
            <ul className="dropdown">
              <li><a href="/quan-jeans">Quần jeans</a></li>
              <li><a href="/quan-tay">Quần tây</a></li>
              <li><a href="/quan-kaki">Quần kaki</a></li>
            </ul>
          </li>
          <li><a href="/phu-kien">PHỤ KIỆN</a></li>
          <li><a href="/giay-dep">GIÀY DÉP</a></li>
          <li><a href="/outlet-safe">OUTLET SAFE</a></li>
        </ul>
      </nav>

      <div className="header__lf">
        <HeaderSearch />

        <div className="header__lf-icon" onClick={onCartClick}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
