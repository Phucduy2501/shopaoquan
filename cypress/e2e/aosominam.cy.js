describe("E2E – Trang Áo Sơ Mi Nam & Giỏ hàng", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/ao-so-mi", {
      onBeforeLoad(win) {
        win.localStorage.setItem("isLoggedIn", "true");
        win.localStorage.setItem(
          "user",
          JSON.stringify({ username: "phucduy" })
        );
      },
    });
  });

  // TC01
  it("TC01 - Mở trang Áo sơ mi thành công", () => {
    cy.contains("ÁO SƠ MI NAM").should("exist");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC02
  it("TC02 - Header hiển thị tên user và nút Đăng xuất", () => {
    cy.contains("Xin chào").should("exist");
    cy.contains("phucduy").should("exist");
    cy.contains("ĐĂNG XUẤT", { matchCase: false }).should("exist");
  });
  //TC03
  it("TC03 - Menu ÁO NAM hiển thị đúng dropdown", () => {
  cy.visit("http://localhost:5173/ao-so-mi");

  cy.contains("ÁO NAM")
    .parent("li")          
    .within(() => {
      cy.get("ul.dropdown").should("exist");

      cy.get("ul.dropdown li").should("have.length", 3);

      cy.contains("Áo sơ mi").should("exist");
      cy.contains("Áo thun").should("exist");
      cy.contains("Áo polo").should("exist");
    });
});



  // TC04
  it("TC04 - Tab TẤT CẢ hiển thị sản phẩm", () => {
    cy.contains("TẤT CẢ").click();
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC05
  it("TC05 - Tab ÁO SƠ MI NAM HỌA TIẾT lọc đúng họa tiết", () => {
    cy.contains("ÁO SƠ MI NAM HỌA TIẾT").click();
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC06
  it("TC06 - Tab KHUYẾN MÃI chỉ hiển thị sản phẩm khuyến mãi", () => {
    cy.contains("KHUYẾN MÃI").click();
    cy.get(".product-card").each(($card) => {
      cy.wrap($card).find(".badge").should("exist");
    });
  });

  // TC07
  it("TC07 - Lọc theo Size M", () => {
    cy.get("select").contains("Size");
    cy.get("select").eq(1).select("M"); // chỉnh index/selector cho đúng
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC08
  it("TC08 - Lọc theo Màu Trắng", () => {
    cy.get("select").eq(2).select("Trắng");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC09
  it("TC09 - Lọc theo Form Ôm", () => {
    cy.get("select").eq(3).select("Ôm");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC10
  it("TC10 - Lọc theo Họa tiết Kẻ sọc", () => {
    cy.get("select").eq(4).select("Kẻ sọc");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC11
  it("TC11 - Lọc theo Kiểu tay Tay dài", () => {
    cy.get("select").eq(5).select("Tay dài");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC12
  it("TC12 - Lọc theo khoảng giá Dưới 200k", () => {
    cy.get("select").eq(6).select("Dưới 200k");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC13
  it("TC13 - Lọc theo khoảng giá 200k - 500k", () => {
    cy.get("select").eq(6).select("200k - 500k");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC14
  it("TC14 - Lọc theo khoảng giá Trên 500k", () => {
    cy.get("select").eq(6).select("Trên 500k");
    cy.get(".product-card").should("have.length.at.least", 1);
  });

  // TC15
  it("TC15 - Nút XÓA LỌC reset filter", () => {
    cy.get("select").eq(1).select("M");
    cy.get("select").eq(2).select("Trắng");
    cy.contains("XÓA LỌC").click();
    cy.get("select").eq(1).should("have.value", "");
    cy.get("select").eq(2).should("have.value", "");
  });

  // TC16
  it("TC16 - Sắp xếp Mới nhất", () => {
    cy.get("select").first().select("Mới nhất");
    cy.get(".product-card").its("length").should("be.gte", 2);
  });

  // TC17
  it("TC17 - Sắp xếp Bán chạy", () => {
    cy.get("select").first().select("Bán chạy");
    cy.get(".product-card").its("length").should("be.gte", 2);
  });

 // TC18 - Không tìm thấy sản phẩm phù hợp
it("TC18 - Không tìm thấy sản phẩm phù hợp", () => {
  cy.visit("http://localhost:5173/ao-so-mi");

  cy.get("select").eq(1).select("XXL");        
  cy.get("select").eq(2).select("Đen");      
  cy.get("select").eq(3).select("Ôm");        
  cy.get("select").eq(4).select("Hoa");       
  cy.get("select").eq(5).select("Tay dài");    
  cy.get("select").eq(6).select("Trên 500k"); 

  cy.get(".product-card").should("have.length", 0);

});




// TC19 - Mở Quick View và thêm sản phẩm vào giỏ hàng
it("TC19 - Mở Quick View và thêm sản phẩm vào giỏ hàng", () => {
  cy.visit("http://localhost:5173/ao-so-mi");

  cy.get(".product-card").first().as("firstProduct");

  cy.get("@firstProduct").find("h4").invoke("text").then((name) => {
    const productName = name.trim();

    cy.get("@firstProduct").find(".quick-cart-btn").click();

    cy.contains("button", "Thêm vào giỏ hàng").click();

    cy.get(".header__lf-icon").first().click();

    cy.get(".cart-panel").should("be.visible");
    cy.get(".cart-item").should("exist");
    cy.get(".cart-item").first().contains(productName).should("exist");
  });
});



// TC20 - Tăng/giảm số lượng trong giỏ và mở thanh toán
it("TC20 - Tăng/giảm số lượng trong giỏ và mở thanh toán", () => {
  cy.visit("http://localhost:5173/ao-so-mi");
  cy.get(".product-card").first().find(".quick-cart-btn").click();
  cy.contains("button", "Thêm vào giỏ hàng").click();
  cy.get(".header__lf-icon").first().click();
  cy.get(".cart-panel").should("be.visible");

  cy.get(".cart-item").first().as("item");
  cy.get("@item")
    .find(".cart-qty-controls span")
    .invoke("text")
    .then((qtyText) => {
      const qtyBefore = Number(qtyText.trim());
      cy.contains("p", "Tổng")
        .invoke("text")
        .then((totalText1) => {
          const totalBefore = totalText1.trim();
          cy.get("@item")
            .find(".cart-qty-controls button")
            .last()
            .click();
          cy.get("@item")
            .find(".cart-qty-controls span")
            .invoke("text")
            .then((qtyAfterPlusText) => {
              const qtyAfterPlus = Number(qtyAfterPlusText.trim());
              expect(qtyAfterPlus).to.be.greaterThan(qtyBefore);
            });
          cy.contains("p", "Tổng")
            .invoke("text")
            .then((totalText2) => {
              const totalAfterPlus = totalText2.trim();
              expect(totalAfterPlus).to.not.equal(totalBefore);
            });
          cy.get("@item")
            .find(".cart-qty-controls button")
            .first()
            .click();

          cy.get("@item")
            .find(".cart-qty-controls span")
            .invoke("text")
            .then((qtyAfterMinusText) => {
              const qtyAfterMinus = Number(qtyAfterMinusText.trim());
              expect(qtyAfterMinus).to.be.at.least(1);
            });
          cy.get(".checkout-btn").first().click();
          cy.get(".payment-modal").should("be.visible");
          cy.get(".payment-modal")
            .contains("Tổng tiền")
            .should("be.visible");
        });
    });
});




});
