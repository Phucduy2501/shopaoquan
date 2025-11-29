// HeaderSearch.jsx
import React, { useState, useEffect, useRef } from "react";
import ModalQuickView from "./ModalQuickView"; // sửa lại path nếu khác

const API_URLS = [
  "https://6919f5489ccba073ee9473d3.mockapi.io/AoPoLo",
  "https://68d3c6ca214be68f8c672eab.mockapi.io/anhsachaoquan",
  "https://68d813d82144ea3f6da74df2.mockapi.io/aothun",
  "https://6928813db35b4ffc5015edeb.mockapi.io/giaydep",
  "https://68dd4ec87cd1948060ad2d97.mockapi.io/outletSafe",
  "https://6928813db35b4ffc5015edeb.mockapi.io/phukien",
  "https://68d813d82144ea3f6da74df2.mockapi.io/aoquan",
  "https://6927415326e7e41498fda1a6.mockapi.io/quankaki",
  "https://6927415326e7e41498fda1a6.mockapi.io/quantay",
];

const HeaderSearch = ({ onAddToCart }) => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inputRef = useRef(null);

  // load dữ liệu 1 lần
  useEffect(() => {
    const loadAll = async () => {
      try {
        const reqs = API_URLS.map((url) => fetch(url).then((r) => r.json()));
        const dataArr = await Promise.all(reqs);
        setAllProducts(dataArr.flat());
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      }
    };
    loadAll();
  }, []);

  // lọc theo tên
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setShow(false);
      setResults([]);
      return;
    }

    const filtered = allProducts.filter((p) =>
      (p.name || "").toLowerCase().includes(q)
    );
    setResults(filtered);
    setShow(true);
  }, [query, allProducts]);

  const handleSearchClick = () => {
    if (inputRef.current) inputRef.current.focus();
    if (query.trim().length >= 2) setShow(true);
  };

  const handleResultClick = (p) => {
    const mapped = {
      ...p,
      img: p.img || p.image, // ModalQuickView dùng img
      price: Number(p.price),
    };
    setSelectedProduct(mapped);
    setShow(false);
  };

  const handleCloseModal = () => setSelectedProduct(null);

  return (
    <>
      <div className="header__lf-icon" style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShow(true);
          }}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ cursor: "pointer" }}
          onClick={handleSearchClick}
        ></i>

        {show && (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((p) => (
                <div
                  className="result-item"
                  key={`${p.id}-${p.name}`}
                  onClick={() => handleResultClick(p)}
                >
                  <img src={p.image || p.img} alt={p.name} />
                  <div>
                    <span>{p.name}</span>
                    <br />
                    <b>{Number(p.price).toLocaleString("vi-VN")}đ</b>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ padding: 8 }}>Không tìm thấy sản phẩm</p>
            )}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ModalQuickView
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={onAddToCart}  
        />
      )}
    </>
  );
};

export default HeaderSearch;
