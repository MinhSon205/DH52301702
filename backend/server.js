const express          = require('express');
const cors             = require('cors');
const gameRouter       = require('./routes/game');
const lbRouter         = require('./routes/leaderboard');
const authRouter       = require('./routes/auth');
const statsRouter      = require('./routes/stats');
const achievRouter     = require('./routes/achievements');
const profileRouter    = require('./routes/profile');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/auth',         authRouter);
app.use('/game',         gameRouter);
app.use('/leaderboard',  lbRouter);
app.use('/stats',        statsRouter);
app.use('/achievements', achievRouter);
app.use('/profile',      profileRouter);  // ← thêm mới

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Minesweeper server đang chạy 🚀' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Lỗi server nội bộ' });
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});

