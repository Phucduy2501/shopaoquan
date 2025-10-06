import React, { useState } from "react";
import "../styles/indexdn.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://68d813d82144ea3f6da74df2.mockapi.io/aoquan")
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          alert("✅ Đăng nhập thành công!");
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
        } else {
          alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
        }
      })
      .catch((err) => console.error("Lỗi đăng nhập:", err));
  };

  return (
    <div id="wrapper">
      <div className="dangnhap">
        <h1>Shop bán Áo Quần 5Men</h1>

        <div className="nhap">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="matkhau">
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="tkmk">
          <a className="quenmk" href="./dkitk.html">
            Đăng kí tài khoản
          </a>
          <a className="quenmk" href="./quenpass.html">
            Quên mật khẩu
          </a>
        </div>

        <button id="dnp" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
