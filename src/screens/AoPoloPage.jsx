import React, { useEffect, useMemo, useState } from "react";
import Header from "./header";
import Policy from "./policy";
import Footer from "./footer";
import "../styles/giaodien.css";
import "../styles/aosomi.css";
import "../styles/sualoi.css"
import ModalQuickView from "./ModalQuickView";

const API_URL = "https://6919f5489ccba073ee9473d3.mockapi.io/AoPoLo";

const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  const n = Number(value);
  if (Number.isNaN(n)) return "";
  return n.toLocaleString("vi-VN") + "₫";
};

const AoThunPage = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [form, setForm] = useState("");
  const [pattern, setPattern] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("Mặc định");

  const [showMore, setShowMore] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);
 // GIỎ HÀNG
const [cart, setCart] = useState(() => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Lỗi parse cart từ localStorage", e);
    return [];
  }
});
const [isCartOpen, setIsCartOpen] = useState(false);
const [isPaymentOpen, setIsPaymentOpen] = useState(false); 

const handleCartIconClick = () => {
  setIsCartOpen((prev) => !prev);
};

const handleAddToCart = (product, qty, size) => {
  setCart((prev) => {
    const idx = prev.findIndex(
      (item) => item.id === product.id && item.size === size
    );
    if (idx !== -1) {
      const newCart = [...prev];
      newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + qty };
      return newCart;
    }
    return [
      ...prev,
      {
        id: product.id,
        name: product.name,
        img: product.img,          // chú ý: dùng field img đã map ở openModal
        price: Number(product.price),
        qty,
        size,
      },
    ];
  });

  setIsCartOpen(true); // thêm xong tự mở giỏ
};

const cartTotal = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);
  /*******************************************/ 

  const PaymentModal = ({ amount, onClose }) => {
  const [method, setMethod] = useState("bank"); // bank | cash

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

            {/* TODO: thay link này bằng QR thật của bạn */}
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
          </div>
        ) : (
          <div className="payment-content">
            <p>
              Khách thanh toán <b>{amount.toLocaleString("vi-VN")}đ</b> tiền mặt.
            </p>
            <p>Vui lòng thu đúng số tiền và xác nhận đơn hàng trong hệ thống.</p>
          </div>
        )}
      </div>
    </div>
  );
};

  /***************************************/ 
  // LƯU GIỎ HÀNG VÀO LOCALSTORAGE MỖI KHI THAY ĐỔI
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Lỗi lưu cart vào localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi load sản phẩm:", err);
        setError("Không tải được danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const resetFilters = () => {
    setSize("");
    setColor("");
    setForm("");
    setPattern("");
    setSleeve("");
    setPrice("");
    setCategory("all");
    setSort("Mặc định");
  };

   const openModal = (p) => {
  setSelectedProduct({
    ...p,
    img: p.image,       
    price: p.price,
    original: p.oldPrice,
    status: p.status,
  });
};


  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category === "hoatiet") {
      filtered = filtered.filter((p) => p.pattern !== "Trơn");
    } else if (category === "khuyenmai") {
      filtered = filtered.filter((p) => p.tag === "khuyenmai");
    }

    if (size) {
      filtered = filtered.filter((p) => p.size === size);
    }

    if (color) {
      filtered = filtered.filter((p) => p.color === color);
    }

    if (form) {
      filtered = filtered.filter((p) => p.form === form);
    }

    if (pattern) {
      filtered = filtered.filter((p) => p.pattern === pattern);
    }

    if (sleeve) {
      filtered = filtered.filter((p) => p.sleeve === sleeve);
    }

    if (price) {
      if (price === "under-200") {
        filtered = filtered.filter((p) => Number(p.price) < 200000);
      } else if (price === "200-500") {
        filtered = filtered.filter(
          (p) => Number(p.price) >= 200000 && Number(p.price) <= 500000
        );
      } else if (price === "over-500") {
        filtered = filtered.filter((p) => Number(p.price) > 500000);
      }
    }

    if (sort === "Mới nhất") {
      filtered.sort((a, b) => {
        const isNewA = a.tag === "new" ? 1 : 0;
        const isNewB = b.tag === "new" ? 1 : 0;
        if (isNewB !== isNewA) return isNewB - isNewA;
        return Number(b.id) - Number(a.id);
      });
    } else if (sort === "Bán chạy") {
      filtered.sort(
        (a, b) => Number(b.sold || 0) - Number(a.sold || 0)
      );
    }

    return filtered;
  }, [products, category, size, color, form, pattern, sleeve, price, sort]);

  return (
    <div className="shop">
      <Header onCartClick={handleCartIconClick} />
      <main className="shop-main" id="shop-main">
        <section id="carousel1" className="aosomi-section">
          <h2 className="title">ÁO POLO NAM</h2>
          <div className="cat-filter-catalogue">
            <ul>
              <li>
                <button
                  className={category === "all" ? "active" : ""}
                  onClick={() => setCategory("all")}
                >
                  TẤT CẢ
                </button>
              </li>
              <li>
                <button
                  className={category === "hoatiet" ? "active" : ""}
                  onClick={() => setCategory("hoatiet")}
                >
                  ÁO POLO HỌA TIẾT
                </button>
              </li>
              <li>
                <button
                  className={category === "khuyenmai" ? "active" : ""}
                  onClick={() => setCategory("khuyenmai")}
                >
                  KHUYẾN MÃI
                </button>
              </li>
            </ul>
          </div>
          <div className="filter-container">
            <label>
              <b>Sắp xếp</b>
            </label>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="Mặc định">Mặc định</option>
              <option value="Mới nhất">Mới nhất</option>
              <option value="Bán chạy">Bán chạy</option>
            </select>

            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Màu</option>
              <option value="Trắng">Trắng</option>
              <option value="Xanh">Xanh</option>
              <option value="Đen">Đen</option>
              <option value="Xám">Xám</option>
            </select>

            <select value={form} onChange={(e) => setForm(e.target.value)}>
              <option value="">Form</option>
              <option value="Ôm">Ôm</option>
              <option value="Rộng">Rộng</option>
            </select>

            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            >
              <option value="">Họa tiết</option>
              <option value="Trơn">Trơn</option>
              <option value="Kẻ sọc">Kẻ sọc</option>
              <option value="Hoa">Hoa</option>
            </select>

            <select value={sleeve} onChange={(e) => setSleeve(e.target.value)}>
              <option value="">Kiểu tay</option>
              <option value="Tay ngắn">Tay ngắn</option>
              <option value="Tay dài">Tay dài</option>
            </select>

            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="">Chọn khoảng giá</option>
              <option value="under-200">Dưới 200k</option>
              <option value="200-500">200k - 500k</option>
              <option value="over-500">Trên 500k</option>
            </select>

            <button className="reset-filter-btn" onClick={resetFilters}>
              XÓA LỌC
            </button>
          </div>

          <div className="product-grid">
            {loading && <p>Đang tải sản phẩm...</p>}
            {error && !loading && <p className="error">{error}</p>}

            {!loading && !error && filteredProducts.length === 0 && (
              <p>Không tìm thấy sản phẩm phù hợp.</p>
            )}

            {!loading &&
              !error &&
              filteredProducts.map((p) => (
                 <div className="pro" key={p.id}>
                    <div className="item-thumbs">
                        {p.tag && (
                        <span className="badge">
                            <span className="offer">
                            {p.tag === "khuyenmai"
                                ? `SALE ${p.sale || ""}`
                                : String(p.tag).toUpperCase()}
                            </span>
                        </span>
                        )}

                        <img src={p.image} alt={p.name} />

                        <button
                        type="button"
                        className="quick-cart-btn"
                        onClick={() => openModal(p)}
                        >
                        <i className="fa-solid fa-cart-shopping" />
                        </button>
                    </div>

                    <div className="proi">
                        <h4>{p.name}</h4>
                        <div className="sale">
                        {formatCurrency(p.price)}
                        {p.oldPrice && <em>{formatCurrency(p.oldPrice)}</em>}
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </section>

        <div className="content-box">
          <h3>ÁO THUN NAM HÀNG HIỆU, ÁO THUN NAM CAO CẤP</h3>
          <p>
            Thời trang nam 4MEN(R) là thương hiệu độc quyền <br />
            Sản phẩm chất lượng từ sợi vải đến đường may.
          </p>

          <div className={`extra-text ${showMore ? "open" : ""}`}>
            <h3>ÁO THUN NAM GIÁ RẺ</h3>
            <p>
              Ngoài dòng áo thun cao cấp, 4MEN(R) còn sản xuất các mẫu áo thun
              giá rẻ, phù hợp với sinh viên và người đi làm.
            </p>

            <h3>ÁO THUN NAM ĐẸP, KIỂU MỚI 2025</h3>
            <p>
              Các mẫu áo thun 2025 được 4MEN(R) nghiên cứu theo phong cách Hàn
              Quốc, trẻ trung và dễ phối đồ...
            </p>

            <h3>MUA ÁO THUN NAM</h3>
            <p>
              Đến với 4MEN(R) chắc chắn bạn sẽ chọn được mẫu áo thun nam đẹp và
              ưng ý.
            </p>
          </div>

          <button id="toggleBtn" onClick={() => setShowMore((prev) => !prev)}>
            {showMore ? "THU GỌN -" : "XEM THÊM +"}
          </button>
        </div>

                {selectedProduct && (
          <ModalQuickView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}   // 👈 quan trọng
          />
        )}

        {isCartOpen && (
          <div className="cart-panel">
            <h3>🛒 Giỏ Hàng</h3>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Giỏ hàng trống</p>
              ) : (
                cart.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <img src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                      <p>
                        <b>{item.name}</b> ({item.size})
                      </p>
                      <p>
                        {item.qty} x {formatCurrency(item.price)}
                      </p>
                    </div>
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
              onClick={() => setIsPaymentOpen(true)}
            >
              Thanh toán
            </button>
          </div>
        )}

        {isPaymentOpen && cartTotal > 0 && (
          <PaymentModal
            amount={cartTotal}
            onClose={() => setIsPaymentOpen(false)}
          />
        )}
        <Policy />
        <Footer />
      </main>
    </div>
  );
};

export default AoThunPage;
