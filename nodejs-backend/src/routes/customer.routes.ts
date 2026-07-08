import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { runAsync, getAsync, allAsync } from '../database/init.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const customerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
});

// Get all customers
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await allAsync('SELECT * FROM customers ORDER BY createdAt DESC');
    res.json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
});

// Get single customer
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await getAsync('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
});

// Create customer
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = customerSchema.parse(req.body);
    const id = uuid();

    await runAsync(
      'INSERT INTO customers (id, name, email, phone, address, city, postalCode, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, data.name, data.email || null, data.phone || null, data.address || null, data.city || null, data.postalCode || null, data.notes || null]
    );

    res.status(201).json({
      success: true,
      message: 'Customer created',
      data: { id, ...data },
    });
  } catch (error) {
    next(error);
  }
});

// Update customer
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = customerSchema.partial().parse(req.body);
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), req.params.id];

    await runAsync(
      `UPDATE customers SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    const customer = await getAsync('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Customer updated', data: customer });
  } catch (error) {
    next(error);
  }
});

// Delete customer
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await runAsync('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Customer deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
