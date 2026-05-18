
// Middleware kiểm tra JWT token trước khi vào route
// Dùng cho các route cần đăng nhập

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../routes/auth');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Header phải có dạng: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Chưa đăng nhập' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify() giải mã và xác thực token
    // Nếu token hết hạn hoặc bị sửa → throw error
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

module.exports = authMiddleware;
