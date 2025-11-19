import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../styles/indexdn.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/dangky`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        // server có thể trả 409 cho email/username trùng
        throw new Error(data?.message || "Đăng ký thất bại!");
      }

      message.success(data?.message || "🎉 Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      message.error("❌ " + (err.message || "Lỗi kết nối server!"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper">
      <div className="dangnhap" style={{ maxWidth: 480, width: "100%" }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Typography.Title level={3} style={{ color: "#fff", textAlign: "center", margin: 0 }}>
            Tạo tài khoản
          </Typography.Title>

          <Form name="register" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              label={<span style={{ color: "#fff" }}>Tên đăng nhập</span>}
              rules={[
                { required: true, message: "Nhập tên đăng nhập!" },
                { min: 3, message: "Ít nhất 3 ký tự" },
                { whitespace: true, message: "Không để toàn khoảng trắng" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span style={{ color: "#fff" }}>Email</span>}
              rules={[
                { required: true, message: "Nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ color: "#fff" }}>Mật khẩu</span>}
              rules={[
                { required: true, message: "Nhập mật khẩu!" },
                { min: 6, message: "Tối thiểu 6 ký tự" },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<span style={{ color: "#fff" }}>Xác nhận mật khẩu</span>}
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" />
            </Form.Item>

            <Form.Item style={{ marginTop: 12 }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "rgba(129, 23, 4, 0.95)", border: "none" }}
              >
                Đăng ký
              </Button>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/login" style={{ color: "#fff" }}>
                <ArrowLeftOutlined /> Đã có tài khoản? Đăng nhập
              </Link>
              <Link to="/forgot-password" style={{ color: "#fff" }}>
                Quên mật khẩu
              </Link>
            </div>
          </Form>
        </Space>
      </div>
    </div>
  );
}
