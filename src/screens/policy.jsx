import React from "react";

const Policy = () => {
  return (
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
  );
};

export default Policy;
