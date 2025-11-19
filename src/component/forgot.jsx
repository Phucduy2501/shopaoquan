import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/indexdn.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        message.success(data.message || "📨 Hướng dẫn đặt lại mật khẩu đã được gửi!");
      } else {
        message.error(data.message || "Lỗi gửi yêu cầu!");
      }
    } catch (err) {
      message.error("⚠️ Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper">
      <div className="dangnhap" style={{ maxWidth: 420, width: "100%" }}>
        <Typography.Title level={3} style={{ color: "#fff", textAlign: "center", marginBottom: 16 }}>
          Quên mật khẩu
        </Typography.Title>

        <Form name="forgot" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={<span style={{ color: "#fff" }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email đã đăng ký"
              size="large"
              style={{ background: "rgba(255,255,255,0.95)" }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 16 }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ background: "rgba(129, 23, 4, 0.95)", border: "none" }}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Link to="/login" style={{ color: "#fff" }}>
              <ArrowLeftOutlined /> Quay lại đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
