import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
