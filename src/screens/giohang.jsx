import React, { useState } from "react";

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  const n = Number(value);
  if (Number.isNaN(n)) return "";
  return n.toLocaleString("vi-VN") + "₫";
};

const CartPanel = ({
  isOpen,
  cart,
  cartTotal,
  onClose,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h3>🛒 Giỏ Hàng</h3>
        <button className="cart-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          cart.map((item) => (
            <div
              className="cart-item"
              key={`${item.id}-${item.size}`}
            >
              <img src={item.img} alt={item.name} />

              <div className="cart-item-info">
                <p>
                  <b>{item.name}</b> ({item.size})
                </p>

                <div className="cart-item-row">
                  <div className="cart-qty-controls">
                    <button
                      onClick={() => onDecreaseQty(item.id, item.size)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => onIncreaseQty(item.id, item.size)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-line-price">
                    {item.qty} x {formatCurrency(item.price)}
                  </span>
                </div>
              </div>

              <button
                className="cart-remove-btn"
                onClick={() => onRemoveItem(item.id, item.size)}
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>

      <p>
        <b>Tổng:</b> {formatCurrency(cartTotal)}
      </p>

      <button
        className="checkout-btn"
        disabled={cart.length === 0}
        onClick={onCheckout}
      >
        Thanh toán
      </button>
    </div>
  );
};


export const PaymentModal = ({ amount, onClose }) => {
  const [method, setMethod] = useState("bank");
  const [confirmed, setConfirmed] = useState(false);

  // const handleConfirmPayment = () => {
  //   // Mở widget chat
  //   if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
  //     window.Tawk_API.maximize();
  //   }

  //   setConfirmed(true);
  // };

  const handleConfirmPayment = () => {
  if (window.Tawk_API) {
    if (typeof window.Tawk_API.addEvent === "function") {
      window.Tawk_API.addEvent(
        "payment-done",
        { amount },
        function (error) {
          if (error) console.log("Tawk event error: ", error);
        }
      );
    }

    if (typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    }
  }

  onClose && onClose();
};




  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose}>
          ✕
        </button>

        <h2>Thanh toán</h2>
        <p>
          Tổng tiền:&nbsp;
          <b style={{ color: "#b7312c" }}>
            {amount.toLocaleString("vi-VN")}đ
          </b>
        </p>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="bank"
              checked={method === "bank"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Chuyển khoản (QR)
          </label>
          <label>
            <input
              type="radio"
              value="cash"
              checked={method === "cash"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Thanh toán tiền mặt
          </label>
        </div>

        {method === "bank" ? (
          <div className="payment-content">
            <p>Quét mã QR để chuyển khoản đúng số tiền:</p>

            <img
              src={`https://img.vietqr.io/image/VCB-0123456789-compact.png?amount=${amount}&addInfo=Thanh%20toan%20don%20hang`}
              alt="QR chuyển khoản"
              className="payment-qr"
            />

            <ul className="payment-info">
              <li>Ngân hàng: mb bank</li>
              <li>Số TK: 012387</li>
              <li>Chủ TK: TRAN VAN PHUC DUY</li>
              <li>Nội dung: Thanh toán đơn hàng 4MEN</li>
            </ul>

            <button
              className="confirm-payment-btn"
              onClick={handleConfirmPayment}
            >
              Tôi đã chuyển khoản
            </button>

            {confirmed && (
              <p className="payment-note">
                ✅ Shop đã nhận thông tin thanh toán. Nếu cần hỗ trợ thêm, hãy
                chat với shop ở góc dưới bên phải nhé.
              </p>
            )}
          </div>
        ) : (
          <div className="payment-content">
            <p>
              Khách thanh toán <b>{amount.toLocaleString("vi-VN")}đ</b> tiền mặt.
            </p>
            <p>Vui lòng thu đúng số tiền và xác nhận đơn hàng trong hệ thống.</p>
            <button
              className="confirm-payment-btn"
              onClick={handleConfirmPayment}
            >
              xác nhận
            </button>

            {confirmed && (
              <p className="payment-note">
                ✅ Shop đã nhận thông tin xác nhận đơn hàng. Nếu cần hỗ trợ thêm, hãy
                chat với shop ở góc dưới bên phải nhé.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default CartPanel;
