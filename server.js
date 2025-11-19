// server.js (NO optional chaining)
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

/* ===== RAM “DB” ===== */
const users = []; // { id, username, email, passwordHash }
const resetTokens = new Map(); // email -> { token, expiresAt }

/* ===== Helpers ===== */
function norm(s) { return String(s || '').trim(); }

function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '')); }

/* (Tuỳ chọn) seed 1 user để test */
(function seed() {
    const email = 'phucduy2501@gmail.com';
    const username = 'phucduy';
    const passwordHash = bcrypt.hashSync('123', 10);
    users.push({ id: nanoid(), username, email, passwordHash });
    console.log('✅ Seeded user:', { email, password: '123' });
})();

/* ===== Health ===== */
app.get('/health', function(_req, res) { return res.send('ok'); });

/* ===== Đăng ký ===== */
app.post('/dangky', async function(req, res) {
    try {
        let username = norm(req.body && req.body.username);
        let email = norm(req.body && req.body.email).toLowerCase();
        let password = norm(req.body && req.body.password);

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Thiếu thông tin đăng ký!' });
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ!' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải ≥ 6 ký tự!' });
        }
        if (users.find(function(u) { return u.email.toLowerCase() === email; })) {
            return res.status(409).json({ message: 'Email đã tồn tại!' });
        }
        if (users.find(function(u) { return u.username === username; })) {
            return res.status(409).json({ message: 'Username đã tồn tại!' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = { id: nanoid(), username: username, email: email, passwordHash: passwordHash };
        users.push(user);

        return res.json({
            message: '🎉 Đăng ký thành công!',
            data: { id: user.id, username: user.username, email: user.email }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Lỗi server khi đăng ký!' });
    }
});

/* ===== Đăng nhập ===== */
app.post('/dangnhap', async function(req, res) {
    try {
        const rawEmail = norm(req.body && req.body.email).toLowerCase();
        const rawUsername = norm(req.body && req.body.username);
        const password = norm(req.body && req.body.password);

        const identifier = rawEmail || rawUsername;

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Thiếu tài khoản (email/username) hoặc mật khẩu!' });
        }

        const user =
            users.find(function(u) { return u.email.toLowerCase() === identifier; }) ||
            users.find(function(u) { return u.username === identifier; });

        if (!user) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ message: 'Mật khẩu không đúng!' });
        }

        return res.json({
            message: '✅ Đăng nhập thành công!',
            data: { id: user.id, username: user.username, email: user.email }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Lỗi server khi đăng nhập!' });
    }
});

/* ===== Quên mật khẩu (gửi token) ===== */
app.post('/forgot-password', function(req, res) {
    const email = norm(req.body && req.body.email).toLowerCase();
    if (!email) return res.status(400).json({ message: 'Thiếu email!' });

    const user = users.find(function(u) { return u.email.toLowerCase() === email; });
    // tránh lộ thông tin
    if (!user) {
        return res.json({ message: 'Nếu email tồn tại, hướng dẫn đã được gửi!' });
    }

    const token = nanoid(32);
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 phút
    resetTokens.set(email, { token: token, expiresAt: expiresAt });

    console.log('🔐 Token reset cho ' + email + ': ' + token + ' (hết hạn 15 phút)');

    return res.json({
        message: '📨 Đã gửi hướng dẫn đặt lại mật khẩu (xem token trong console)!'
    });
});

/* ===== Đặt lại mật khẩu ===== */
app.post('/reset-password', async function(req, res) {
    const email = norm(req.body && req.body.email).toLowerCase();
    const token = norm(req.body && req.body.token);
    const newPassword = norm(req.body && req.body.newPassword);

    if (!email || !token || !newPassword) {
        return res.status(400).json({ message: 'Thiếu email, token hoặc mật khẩu mới!' });
    }

    const entry = resetTokens.get(email);
    if (!entry || entry.token !== token || Date.now() > entry.expiresAt) {
        return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }

    const user = users.find(function(u) { return u.email.toLowerCase() === email; });
    if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản!' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    resetTokens.delete(email);

    return res.json({ message: '✅ Đổi mật khẩu thành công, vui lòng đăng nhập lại!' });
});

/* ===== Start ===== */
app.listen(PORT, function() {
    console.log('🚀 Server chạy tại http://localhost:' + PORT);
});