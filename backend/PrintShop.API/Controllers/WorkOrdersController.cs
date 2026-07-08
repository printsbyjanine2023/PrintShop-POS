using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PrintShop.Core.Services;

namespace PrintShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkOrdersController : ControllerBase
{
    private readonly IWorkOrderService _workOrderService;
    private readonly ILogger<WorkOrdersController> _logger;

    public WorkOrdersController(IWorkOrderService workOrderService, ILogger<WorkOrdersController> logger)
    {
        _workOrderService = workOrderService;
        _logger = logger;
    }

    /// <summary>
    /// Get all work orders
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllWorkOrders()
    {
        try
        {
            var orders = await _workOrderService.GetAllWorkOrdersAsync();
            return Ok(new { success = true, data = orders });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting work orders");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get work order by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetWorkOrderById(int id)
    {
        try
        {
            var order = await _workOrderService.GetWorkOrderByIdAsync(id);
            if (order == null)
                return NotFound(new { success = false, message = "Work order not found" });

            return Ok(new { success = true, data = order });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting work order");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Create new work order
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator,Manager,Encoder")]
    public async Task<IActionResult> CreateWorkOrder([FromBody] object orderData)
    {
        try
        {
            // Implementation will parse orderData and create work order
            return Ok(new { success = true, message = "Work order created successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating work order");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Update work order status
    /// </summary>
    [HttpPut("{id}/status")]
    [Authorize(Roles = "Administrator,Manager,ProductionStaff")]
    public async Task<IActionResult> UpdateWorkOrderStatus(int id, [FromBody] dynamic statusUpdate)
    {
        try
        {
            string newStatus = statusUpdate.status;
            await _workOrderService.UpdateWorkOrderStatusAsync(id, newStatus);
            return Ok(new { success = true, message = "Status updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating work order status");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }
}
