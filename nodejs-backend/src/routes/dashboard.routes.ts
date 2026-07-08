import { Router, Request, Response, NextFunction } from 'express';
import { allAsync, getAsync } from '../database/init.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Dashboard stats
router.get('/stats', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalCustomers = await getAsync('SELECT COUNT(*) as count FROM customers');
    const totalProducts = await getAsync('SELECT COUNT(*) as count FROM products WHERE isActive = 1');
    const pendingOrders = await getAsync(
      'SELECT COUNT(*) as count FROM workOrders WHERE status = "pending"'
    );
    const completedOrders = await getAsync(
      'SELECT COUNT(*) as count FROM workOrders WHERE status = "completed"'
    );
    const totalRevenue = await getAsync(
      'SELECT COALESCE(SUM(totalAmount), 0) as total FROM workOrders WHERE status = "completed"'
    );

    res.json({
      success: true,
      data: {
        totalCustomers: totalCustomers?.count || 0,
        totalProducts: totalProducts?.count || 0,
        pendingOrders: pendingOrders?.count || 0,
        completedOrders: completedOrders?.count || 0,
        totalRevenue: totalRevenue?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Recent orders
router.get('/recent-orders', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await allAsync(
      'SELECT wo.*, c.name as customerName FROM workOrders wo LEFT JOIN customers c ON wo.customerId = c.id ORDER BY wo.createdAt DESC LIMIT 10'
    );
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
});

// Revenue by month
router.get('/revenue', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const revenue = await allAsync(`
      SELECT 
        strftime('%Y-%m', createdAt) as month,
        COALESCE(SUM(totalAmount), 0) as total
      FROM workOrders
      WHERE status = 'completed'
      GROUP BY strftime('%Y-%m', createdAt)
      ORDER BY month DESC
      LIMIT 12
    `);
    res.json({ success: true, data: revenue });
  } catch (error) {
    next(error);
  }
});

export default router;
