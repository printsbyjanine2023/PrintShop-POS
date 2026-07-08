import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { runAsync, getAsync, allAsync } from '../database/init.js';
import { ApiError } from '../middleware/errorHandler.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

// Register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userId = uuid();

    await runAsync(
      'INSERT INTO users (id, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)',
      [userId, data.email, hashedPassword, data.fullName, 'user']
    );

    const token = jwt.sign(
      { id: userId, email: data.email, role: 'user' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: userId, email: data.email, fullName: data.fullName },
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await getAsync('SELECT * FROM users WHERE email = ?', [data.email]);

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authMiddleware, async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await getAsync('SELECT id, email, fullName, role FROM users WHERE id = ?', [
      req.user.id,
    ]);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// Default admin user
router.post('/seed-admin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingAdmin = await getAsync('SELECT * FROM users WHERE email = ?', ['admin@printshop.com']);
    if (existingAdmin) {
      return res.json({ success: true, message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminId = uuid();

    await runAsync(
      'INSERT INTO users (id, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)',
      [adminId, 'admin@printshop.com', hashedPassword, 'Admin User', 'admin']
    );

    res.json({ success: true, message: 'Admin user created' });
  } catch (error) {
    next(error);
  }
});

export default router;
