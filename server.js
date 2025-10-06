import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Route đăng ký
app.post("/dangnhap", (req, res) => {
    const { username, email, password } = req.body;
    console.log("📩 Dữ liệu nhận được:", req.body);

    res.json({
        message: "✅ Đăng ký thành công!",
        data: { username, email, password },
    });
});

app.get("/", (req, res) => {
    res.send("Server đang chạy ngon lành 🚀");
});

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});