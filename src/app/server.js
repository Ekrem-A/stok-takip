import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import dotenv from 'dotenv';

import cors from 'cors';

// .env dosyasını yükleyelim
dotenv.config();

// PostgreSQL bağlantısı
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
app.use(express.json());

// Kullanıcı kaydı (Register)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tüm alanları doldurun' });
  }

  try {
    // Şifreyi hash'leyelim
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Veritabanına kullanıcıyı ekleyelim
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
});

// Kullanıcı girişi (Login)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-posta ve şifre gereklidir' });
  }

  try {
    // Kullanıcıyı veritabanından alalım
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
    }

    const user = result.rows[0];

    // Şifreyi doğrulayalım
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz şifre' });
    }

    // JWT token oluşturalım
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Giriş başarılı', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
});

// Sunucuyu başlatalım
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

app.use(cors());
