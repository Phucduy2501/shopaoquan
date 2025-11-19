import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "../styles/giaodien.css";



const API_BASE = "https://6919f5489ccba073ee9473d3.mockapi.io";
const fmt = (n) => {
  if (n === undefined || n === null || n === "") return "";
  const num = Number(n);
  return Number.isNaN(num) ? "" : num.toLocaleString("vi-VN");
};


const UserPage = () => {
  const [query, setQuery] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [hot, setHot] = useState([]);
  const [news, setNews] = useState([]);
  const [best, setBest] = useState([]);

useEffect(() => {
  fetch(`${API_BASE}/newproperty`)
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data)
        ? data.map((p) => ({ ...p, id: Number(p.id) }))
        : [];

      setHot(list.filter((p) => p.id >= 1 && p.id <= 4));
      setNews(list.filter((p) => p.id >= 5 && p.id <= 8));
      setBest(list.filter((p) => p.id >= 9 && p.id <= 12));
    })
    .catch((err) => {
      console.error(err);
      setHot([]);
      setNews([]);
      setBest([]);
    });
}, []);


  const filter = (list) =>
    !query.trim()
      ? list
      : list.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <>
    <div className="shop">
      <header className="site-header">
        <a href="/">
          <img src="/img/logo.png" alt="Logo" />
        </a>
        <nav id="header">
          <ul>
            <li><a href="#">HÀNG MỚI VỀ</a></li>
            <li>
              <a href="#">ÁO NAM</a>
              <ul className="dropdown">
                <li><a href="#">Áo sơ mi</a></li>
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

      <div className="home-banner">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>

      <div className="thoitranghot">
        <Section title="THỜI TRANG HOT NHẤT" products={filter(hot)} onOpen={setModalProduct} />
      </div>
      <div className="thoitrangmoi">
        <Section title="THỜI TRANG MỚI NHẤT" products={filter(news)} onOpen={setModalProduct} />
      </div>
      <hr />
      <div className="thoitrangban"> 
        <Section title="THỜI TRANG BÁN CHẠY" products={filter(best)} onOpen={setModalProduct} />
      </div>
      <hr />
    <section id="policy">
      <div className="policy__item">
        <div className="policy__icon">
          <i className="fa-solid fa-plane"></i>
          <h3>THANH TOÁN & GIAO HÀNG</h3>
        </div>
        <p>Miễn phí vận chuyển cho đơn hàng trên 399.000 VNĐ</p>
        <ul>
          <li>Giao hàng và thu tiền tận nơi</li>
          <li>Chuyển khoản và giao hàng</li>
          <li>Mua hàng tại shop</li>
        </ul>
      </div>

      <div className="policy__item">
        <div className="policy__icon">
          <i className="fa-regular fa-credit-card"></i>
          <h3>THẺ THÀNH VIÊN</h3>
        </div>
        <p>Chế độ ưu đãi thành viên VIP:</p>
        <ul>
          <li>5% cho thành viên Bạc</li>
          <li>10% cho thành viên Vàng</li>
          <li>15% cho thành viên Kim cương</li>
        </ul>
      </div>

      <div className="policy__item">
        <div className="policy__icon">
          <i className="fa-solid fa-clock"></i>
          <h3>GIỜ MỞ CỬA</h3>
        </div>
        <p>8h30 đến 22:00</p>
        <ul>
          <li>Tất cả các ngày trong tuần</li>
          <li>Áp dụng cho tất cả chi nhánh</li>
        </ul>
      </div>

      <div className="policy__item">
        <div className="policy__icon">
          <i className="fa-solid fa-phone"></i>
          <h3>HỖ TRỢ 24/7</h3>
        </div>
        <p>Gọi ngay khi bạn cần hỗ trợ</p>
        <ul>
          <li>0868.444.644</li>
        </ul>
      </div>
    </section>

      <footer>  
        <div className="footer__lf">
          <img src="/img/logo-footer.png" alt="Logo" />
          <ul>
            <li><a href="#">Giới Thiệu</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Tin tức</a></li>
          </ul>
          <div className="footer__em">
            <i className="fa-solid fa-envelope"></i> info@4menshop.com
          </div>
          <div className="footer__em">
            <i className="fa-solid fa-phone"></i> 0868.444.644
          </div>
        </div>

        <div className="footer__bt">
          <h5>HỖ TRỢ KHÁCH HÀNG</h5>
          <ul>
            <li><a href="#">Hướng dẫn đặt hàng</a></li>
            <li><a href="#">Hướng dẫn chọn size</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer__ht">
          <h5>HỆ THỐNG CỬA HÀNG</h5>
          <img
            src="https://4menshop.com/images/footer-map.jpg"
            alt="map"
          />
        </div>
      </footer>
      {modalProduct && (
        <Modal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
      
    </>
  );
};

const ProductItem = ({ product, onOpen }) => {
  const [mainImg, setMainImg] = useState(product.img);
  const [thumbs, setThumbs] = useState(
    Array.isArray(product.thumbs) ? product.thumbs : []
  );

  const handleThumbClick = (index) => {
    setThumbs((prevThumbs) => {
      const newThumbs = [...prevThumbs];

      const clicked = newThumbs[index];
      newThumbs[index] = mainImg;
      setMainImg(clicked);

      return newThumbs;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setThumbs((prev) => {
        if (prev.length === 0) return prev;

        const newThumbs = [...prev];
        const nextImg = newThumbs[0];

        newThumbs[0] = mainImg;
        setMainImg(nextImg);

        return newThumbs;
      });
    }, 5000); // 5s

    return () => clearInterval(interval);
  }, [mainImg]);
  const p = product;

  return (
    <div className="carousel__item" key={p.id}>
      <img
        className="product-img"
        src={mainImg}
        alt={p.name}
        onClick={() => onOpen(p)}
      />

      {p.badge && (
        <div className={p.badge === "New" ? "carousel__textt" : "carousel__text"}>
          <span>{p.badge}</span>
        </div>
      )}

      <div className="carousel__icon add-to-cart" onClick={() => onOpen(p)}>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>

      {thumbs.length > 0 && (
        <div className="carousel__small">
          {thumbs.map((t, i) => (
            <div className="carousel__small-q1" key={i}>
              <img
                className="thumb-img"
                src={t}
                alt=""
                onClick={() => handleThumbClick(i)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="product" onClick={() => onOpen(p)}>
        <a>{p.name}</a>
        <p className="price">
          <span className="discounted_price">{fmt(p.price)}₫</span>
          {p.original && <span className="original_price">{fmt(p.original)}₫</span>}
        </p>
      </div>
    </div>
  );
};


const Section = ({ title, products = [], onOpen }) => (
  <section id="carousel">
    <h2>{title}</h2>
    <div className="carousel__bg">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onOpen={onOpen} />
      ))}
    </div>
  </section>
);



const Modal = ({ product, onClose }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>

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
                    color: "#888"
                  }}
                >
                  {fmt(product.original)}₫
                </span>
              )}
            </p>

            {/* Tình trạng */}
            <p>
              <b>Tình trạng: </b>
              <span style={{ color: "green", fontWeight: "600" }}>
                {product.status || "Còn hàng"}
              </span>
            </p>

            {/* Size + Số lượng */}
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

              <button
                className="cart-btn"
                onClick={() => {
                  alert(`+${qty} ${product.name} (size ${size})`);
                  onClose();
                }}
              >
                + Thêm vào giỏ hàng
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};



export default UserPage;