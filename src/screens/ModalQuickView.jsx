import React, { useState } from "react";

const fmt = (n) => Number(n).toLocaleString("vi-VN");

const ModalQuickView = ({ product, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  if (!product) return null; 

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, qty, size);
    }
    onClose(); 
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <div className="modal-body">
          <div className="modal-image">
            <img src={product.img} alt={product.name} />
          </div>

          <div className="modal-info">
            <h2>{product.name}</h2>

            <p>
              <b>Giá: </b>
              <span style={{ color: "#b7312c", fontWeight: "700" }}>
                {fmt(product.price)}₫
              </span>
              {product.original && (
                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: "line-through",
                    color: "#888",
                  }}
                >
                  {fmt(product.original)}₫
                </span>
              )}
            </p>

            <p>
              <b>Tình trạng: </b>
              <span style={{ color: "green", fontWeight: 600 }}>
                {product.status || "Còn hàng"}
              </span>
            </p>

            <div className="modal-options">
              <label>Size:</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>

              <label>Số lượng:</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(+e.target.value || 1)}
              />
            </div>

            <div className="modal-actions">
              <button className="buy-btn">🛒 Đăng ký mua</button>

              <button className="cart-btn" onClick={handleAddToCart}>
                + Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQuickView;
