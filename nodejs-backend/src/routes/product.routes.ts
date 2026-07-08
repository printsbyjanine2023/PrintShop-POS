import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { runAsync, getAsync, allAsync } from '../database/init.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().positive(),
  quantity: z.number().int().default(0),
  sku: z.string().optional(),
});

// Get all products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await allAsync('SELECT * FROM products WHERE isActive = 1 ORDER BY name');
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

// Get single product
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await getAsync('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

// Create product
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = productSchema.parse(req.body);
    const id = uuid();

    await runAsync(
      'INSERT INTO products (id, name, description, category, price, quantity, sku) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, data.name, data.description || null, data.category || null, data.price, data.quantity, data.sku || null]
    );

    res.status(201).json({
      success: true,
      message: 'Product created',
      data: { id, ...data },
    });
  } catch (error) {
    next(error);
  }
});

// Update product
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), req.params.id];

    await runAsync(
      `UPDATE products SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    const product = await getAsync('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (error) {
    next(error);
  }
});

// Delete product (soft delete)
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await runAsync('UPDATE products SET isActive = 0, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [
      req.params.id,
    ]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
