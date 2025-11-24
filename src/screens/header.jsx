import React from "react";

const Header = ({ query, setQuery }) => {
  return (
    <header className="site-header">
      <a href="/">
        <img src="/img/logo.png" alt="Logo" />
      </a>
      <nav id="header">
        <ul>
          <li><a href="/">HÀNG MỚI VỀ</a></li>
          <li>
            <a href="/ao-so-mi">ÁO NAM</a>
            <ul className="dropdown">
              <li><a href="/ao-so-mi">Áo sơ mi</a></li>
              <li><a href="#">Áo thun</a></li>
              <li><a href="#">Áo polo</a></li>
            </ul>
          </li>
          <li>
            <a href="#">QUẦN NAM</a>
            <ul className="dropdown">
              <li><a href="#">Quần jeans</a></li>
              <li><a href="#">Quần tây</a></li>
              <li><a href="#">Quần kaki</a></li>
            </ul>
          </li>
          <li><a href="#">PHỤ KIỆN</a></li>
          <li><a href="#">GIÀY DÉP</a></li>
          <li><a href="#">OUTLET SAFE</a></li>
        </ul>
      </nav>

      <div className="header__lf">
        <div className="header__lf-icon">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="header__lf-icon">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
