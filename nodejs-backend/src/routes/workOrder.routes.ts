import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { runAsync, getAsync, allAsync } from '../database/init.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const workOrderSchema = z.object({
  customerId: z.string(),
  description: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  dueDate: z.string().optional(),
});

const workOrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
});

// Get all work orders
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workOrders = await allAsync(
      'SELECT wo.*, c.name as customerName FROM workOrders wo LEFT JOIN customers c ON wo.customerId = c.id ORDER BY wo.createdAt DESC'
    );
    res.json({ success: true, data: workOrders });
  } catch (error) {
    next(error);
  }
});

// Get single work order with items
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workOrder = await getAsync('SELECT * FROM workOrders WHERE id = ?', [req.params.id]);
    if (!workOrder)
      return res.status(404).json({ success: false, message: 'Work order not found' });

    const items = await allAsync(
      'SELECT woi.*, p.name as productName FROM workOrderItems woi LEFT JOIN products p ON woi.productId = p.id WHERE woi.workOrderId = ?',
      [req.params.id]
    );

    res.json({ success: true, data: { ...workOrder, items } });
  } catch (error) {
    next(error);
  }
});

// Create work order
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = workOrderSchema.parse(req.body);
    const id = uuid();

    await runAsync(
      'INSERT INTO workOrders (id, customerId, description, priority, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)',
      [id, data.customerId, data.description || null, data.priority, data.dueDate || null, 'pending']
    );

    res.status(201).json({
      success: true,
      message: 'Work order created',
      data: { id, ...data, status: 'pending' },
    });
  } catch (error) {
    next(error);
  }
});

// Add item to work order
router.post('/:id/items', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = workOrderItemSchema.parse(req.body);
    const itemId = uuid();
    const totalPrice = data.quantity * data.unitPrice;

    await runAsync(
      'INSERT INTO workOrderItems (id, workOrderId, productId, quantity, unitPrice, totalPrice) VALUES (?, ?, ?, ?, ?, ?)',
      [itemId, req.params.id, data.productId, data.quantity, data.unitPrice, totalPrice]
    );

    // Update work order total
    const items = await allAsync(
      'SELECT SUM(totalPrice) as total FROM workOrderItems WHERE workOrderId = ?',
      [req.params.id]
    );
    const total = items[0]?.total || 0;
    await runAsync('UPDATE workOrders SET totalAmount = ? WHERE id = ?', [total, req.params.id]);

    res.status(201).json({
      success: true,
      message: 'Item added',
      data: { id: itemId, ...data, totalPrice },
    });
  } catch (error) {
    next(error);
  }
});

// Update work order status
router.patch('/:id/status', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const completedDate = status === 'completed' ? new Date().toISOString() : null;

    await runAsync(
      'UPDATE workOrders SET status = ?, completedDate = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [status, completedDate, req.params.id]
    );

    const workOrder = await getAsync('SELECT * FROM workOrders WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Status updated', data: workOrder });
  } catch (error) {
    next(error);
  }
});

// Delete work order
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await runAsync('DELETE FROM workOrderItems WHERE workOrderId = ?', [req.params.id]);
    await runAsync('DELETE FROM workOrders WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Work order deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
