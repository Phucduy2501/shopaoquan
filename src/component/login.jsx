import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/indexdn.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/dangnhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại!");

      localStorage.setItem("user", JSON.stringify(data.data || { username }));
      alert(data.message || "✅ Đăng nhập thành công!");
      navigate("/users");
    } catch (err) {
      alert(`⚠️ ${err.message || "Lỗi kết nối tới server!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper">
      <div className="dangnhap">
        <h1>Shop bán Áo Quần 5Men</h1>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          style={{ maxWidth: 420, margin: "0 auto" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập / Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <div className="tkmk" style={{ marginTop: 4, marginBottom: 12 }}>
            <Link className="quenmk" to="/register">Đăng kí tài khoản</Link>
            <Link className="quenmk" to="/forgot">Quên mật khẩu</Link>
          </div>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ background: "rgba(129, 23, 4, 0.95)", border: "none" }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
