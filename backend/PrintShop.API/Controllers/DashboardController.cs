using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace PrintShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(ILogger<DashboardController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get dashboard statistics
    /// </summary>
    [HttpGet("stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        try
        {
            var stats = new
            {
                todaysSales = 45250.00m,
                weeklySales = 287500.00m,
                monthlySales = 1200000.00m,
                annualSales = 14500000.00m,
                totalProfit = 3250000.00m,
                totalExpenses = 500000.00m,
                receivables = 250000.00m,
                outstandingBalances = 180000.00m,
                inventoryValue = 750000.00m,
                lowStockItems = 12,
                pendingOrders = 8,
                completedOrders = 145,
                cancelledOrders = 3
            };

            return Ok(new { success = true, data = stats });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting dashboard stats");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get daily sales chart data
    /// </summary>
    [HttpGet("sales-chart")]
    public async Task<IActionResult> GetSalesChartData()
    {
        try
        {
            var chartData = new[]
            {
                new { name = "Monday", sales = 4000, revenue = 2400 },
                new { name = "Tuesday", sales = 3000, revenue = 1398 },
                new { name = "Wednesday", sales = 2000, revenue = 9800 },
                new { name = "Thursday", sales = 2780, revenue = 3908 },
                new { name = "Friday", sales = 1890, revenue = 4800 },
                new { name = "Saturday", sales = 2390, revenue = 3800 },
                new { name = "Sunday", sales = 3490, revenue = 4300 }
            };

            return Ok(new { success = true, data = chartData });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting sales chart data");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get best selling services
    /// </summary>
    [HttpGet("best-services")]
    public async Task<IActionResult> GetBestSellingServices()
    {
        try
        {
            var services = new[]
            {
                new { name = "Document Printing", sales = 450, revenue = 22500.00m },
                new { name = "Photocopy", sales = 380, revenue = 19000.00m },
                new { name = "Photo Printing", sales = 250, revenue = 18750.00m },
                new { name = "Tarpaulin", sales = 120, revenue = 24000.00m },
                new { name = "ID Printing", sales = 200, revenue = 10000.00m }
            };

            return Ok(new { success = true, data = services });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting best services");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get top customers
    /// </summary>
    [HttpGet("top-customers")]
    public async Task<IActionResult> GetTopCustomers()
    {
        try
        {
            var customers = new[]
            {
                new { id = 1, name = "ABC Printing Co.", totalPurchases = 450000.00m, transactions = 45 },
                new { id = 2, name = "XYZ Graphics", totalPurchases = 350000.00m, transactions = 35 },
                new { id = 3, name = "Design Studio Plus", totalPurchases = 280000.00m, transactions = 28 },
                new { id = 4, name = "Corporate Prints Ltd", totalPurchases = 220000.00m, transactions = 22 },
                new { id = 5, name = "Quick Print Services", totalPurchases = 180000.00m, transactions = 18 }
            };

            return Ok(new { success = true, data = customers });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting top customers");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }
}
