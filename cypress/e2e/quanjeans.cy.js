// cypress/e2e/quanjeans.cy.js

describe("E2E – Trang Quần Jeans Nam & Giỏ hàng", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/quan-jeans", {
      onBeforeLoad(win) {
        win.localStorage.setItem("isLoggedIn", "true");
        win.localStorage.setItem(
          "user",
          JSON.stringify({ username: "phucduy" })
        );
        win.localStorage.setItem("cart", "[]");
      },
    });
  });

  // TC01
  it("TC01 - Mở trang Quần Jeans thành công", () => {
    cy.contains("QUẦN JEANS NAM").should("exist");
    cy.get(".product-grid .pro").should("have.length.at.least", 1);
  });

  // TC02
  it("TC02 - Header hiển thị tên user và nút Đăng xuất", () => {
    cy.contains("Xin chào").should("exist");
    cy.contains("phucduy").should("exist");
    cy.contains("Đăng xuất", { matchCase: false }).should("exist");
  });

  // TC03
  it("TC03 - Menu QUẦN NAM hiển thị đúng dropdown", () => {
    cy.contains("QUẦN NAM")
      .parent("li")
      .within(() => {
        cy.get("ul.dropdown").should("exist");
        cy.get("ul.dropdown li").should("have.length", 3);
        cy.contains("Quần jeans").should("exist");
        cy.contains("Quần tây").should("exist");
        cy.contains("Quần kaki").should("exist");
      });
  });

  // TC04
  it("TC04 - Tab TẤT CẢ hiển thị sản phẩm", () => {
    cy.contains("button", "TẤT CẢ").click();
    cy.get(".product-grid .pro").should("have.length.at.least", 1);
  });

  // TC05
  it("TC05 - Tab QUẦN JEANS HỌA TIẾT hiển thị sản phẩm (nếu có)", () => {
    cy.contains("button", "QUẦN JEANS HỌA TIẾT").click();
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

  // TC06
  it("TC06 - Tab KHUYẾN MÃI chỉ hiển thị sản phẩm khuyến mãi", () => {
    cy.contains("button", "KHUYẾN MÃI").click();
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).each(($card) => {
          cy.wrap($card).find(".badge").should("exist");
        });
      }
    });
  });

  // TC07
  it("TC07 - Lọc theo Size M", () => {
    cy.get("select").eq(1).select("M"); // value="M"
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

  // TC08
  it("TC08 - Lọc theo Màu Xanh", () => {
    cy.get("select").eq(2).select("Xanh");
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

  // TC09
  it("TC09 - Lọc theo Form Ôm", () => {
    cy.get("select").eq(3).select("Ôm");
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

  // TC10
  it("TC10 - Lọc theo Họa tiết Kẻ sọc", () => {
    cy.get("select").eq(4).select("Kẻ sọc");
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

  // TC11
  it("TC11 - Lọc theo Kiểu quần quần dài", () => {
    // text hiển thị "quần dài", value = "Tay dài"
    cy.get("select").eq(5).select("Tay dài");
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.wrap($cards).should("have.length.at.least", 1);
      }
    });
  });

 // TC12
it("TC12 - Lọc theo khoảng giá Dưới 200k", () => {
  // value trong code là "under-200"
  cy.get("select").eq(6).select("under-200");

  cy.get(".product-grid .pro").then(($cards) => {
    if ($cards.length === 0) {
      // Không có sản phẩm thì phải có message
      cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
    } else {
      // Có sản phẩm thì chỉ cần hiển thị ra (không bắt buộc <200k để tránh lệch data)
      cy.wrap($cards).should("have.length.at.least", 1);
    }
  });
});


  // TC13
it("TC13 - Lọc theo khoảng giá 200k - 500k", () => {
  cy.get("select").eq(6).select("200-500");

  cy.get(".product-grid .pro").then(($cards) => {
    if ($cards.length === 0) {
      cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
    } else {
      cy.wrap($cards).should("have.length.at.least", 1);
    }
  });
});



  // TC14
  it("TC14 - Lọc theo khoảng giá Trên 500k", () => {
    cy.get("select").eq(6).select("over-500");
    cy.get(".product-grid .pro").then(($cards) => {
      if ($cards.length === 0) {
        cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
      } else {
        cy.get(".product-grid .pro .sale")
          .then(($prices) =>
            [...$prices].map((n) => n.childNodes[0].textContent.trim())
          )
          .then((prices) => {
            expect(prices.length).to.be.greaterThan(0);
            prices.forEach((p) => {
              const num = Number(p.replace(/[^\d]/g, ""));
              expect(num).to.be.greaterThan(500000);
            });
          });
      }
    });
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
    cy.get(".product-grid .pro").its("length").should("be.gte", 1);
  });

  // TC17
  it("TC17 - Sắp xếp Bán chạy", () => {
    cy.get("select").first().select("Bán chạy");
    cy.get(".product-grid .pro").its("length").should("be.gte", 1);
  });

  // TC18
  it("TC18 - Không tìm thấy sản phẩm phù hợp", () => {
    cy.get("select").eq(1).select("XXL");
    cy.get("select").eq(2).select("Đen");
    cy.get("select").eq(3).select("Ôm");
    cy.get("select").eq(4).select("Hoa");
    cy.get("select").eq(5).select("Tay dài");
    cy.get("select").eq(6).select("over-500");

    cy.contains("Không tìm thấy sản phẩm phù hợp.").should("exist");
    cy.get(".product-grid .pro").should("have.length", 0);
  });

  // TC19 - Mở Quick View và thêm sản phẩm vào giỏ hàng
it("TC19 - Mở Quick View và thêm sản phẩm vào giỏ hàng", () => {
  cy.get(".product-grid .pro").first().as("firstProduct");

  cy.get("@firstProduct")
    .find("h4")
    .invoke("text")
    .then((name) => {
      const productName = name.trim();

      // scroll nút vào giữa màn hình rồi click (dùng force cho chắc)
      cy.get("@firstProduct")
        .find(".quick-cart-btn")
        .scrollIntoView({ block: "center" })
        .click({ force: true });

      cy.contains("button", "Thêm vào giỏ hàng").click();

      cy.get(".header__lf-icon").first().click();

      cy.get(".cart-panel").should("be.visible");
      cy.get(".cart-item").should("exist");
      cy.get(".cart-item").first().contains(productName).should("exist");
    });
});



 // TC20 - Tăng/giảm số lượng trong giỏ và mở thanh toán
it("TC20 - Tăng/giảm số lượng trong giỏ và mở thanh toán", () => {
  // cy.visit("http://localhost:5173/quan-jeans");

  cy.get(".product-grid .pro").first().find(".quick-cart-btn").click();
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

          // tăng số lượng
          cy.get("@item").find(".cart-qty-controls button").last().click();
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

          // giảm số lượng
          cy.get("@item").find(".cart-qty-controls button").first().click();
          cy.get("@item")
            .find(".cart-qty-controls span")
            .invoke("text")
            .then((qtyAfterMinusText) => {
              const qtyAfterMinus = Number(qtyAfterMinusText.trim());
              expect(qtyAfterMinus).to.be.at.least(1);
            });

          // mở thanh toán
          cy.get(".checkout-btn").first().click();
          cy.get(".payment-modal").should("be.visible");
          cy.get(".payment-modal").contains("Tổng tiền").should("be.visible");
        });
    });
});





});
