import React, { useEffect, useMemo, useState } from "react";
import Header from "./header";
import Policy from "./policy";
import Footer from "./footer";
import "../styles/giaodien.css";
import "../styles/aosomi.css";
import "../styles/sualoi.css"

const API_URL = "https://6927415326e7e41498fda1a6.mockapi.io/quantay";

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
      <Header />
      <main className="shop-main" id="shop-main">
        <section id="carousel1" className="aosomi-section">
          <h2 className="title">PHỤ KIỆN NAM</h2>
          <div className="description">
            <strong>Thắt lưng nam</strong> đẹp, kiểu dây lưng Hàn Quốc 2025, được 4MEN(R) thiết kế chuyên biệt theo style Hàn Quốc.&nbsp;<strong>Thắt lưng nam</strong>&nbsp;tại 4MEN luôn được may với chất liệu da bò thật 100%, đa dạng kiểu dáng từ lịch lãm, cổ điển đến thời trang, sang trọ.Thắt lưng là phụ kiện đóng vai trò quan trọng đối với nam giới. Chọn được một chiếc thắt lưng đẹp và phù hợp với trang phục, phong cách bản thân sẽ khiến bạn trông nam tính và lịch lãm hơn rất nhiều. Không những thế thắt lưng còn giúp việc xử lý kiểu dáng, màu sắc và kích cỡ của trang phục.&nbsp;<span class="show-more-2 active">...</span>
          </div>
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
                  PHỤ KIỆN HỌA TIẾT
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
              <option value="">Kiểu phụ kiện</option>
              <option value="Tay ngắn">kiểu ngắn</option>
              <option value="Tay dài">kiểu dài</option>
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

                    <a href={p.image} target="_blank" rel="noreferrer">
                      <img src={p.image} alt={p.name} />
                    </a>

                    <div className="ovrs">
                      MUA NHANH
                      <br />
                      <span>S</span>
                      <span>M</span>
                      <span>L</span>
                      <span>XL</span>
                      <span>XXL</span>
                    </div>
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

        <Policy />
        <Footer />
      </main>
    </div>
  );
};

export default AoThunPage;
