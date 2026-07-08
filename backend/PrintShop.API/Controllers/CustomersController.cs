using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PrintShop.Core.Services;
using PrintShop.Core.Entities;

namespace PrintShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(ICustomerService customerService, ILogger<CustomersController> logger)
    {
        _customerService = customerService;
        _logger = logger;
    }

    /// <summary>
    /// Get all customers
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllCustomers()
    {
        try
        {
            var customers = await _customerService.GetAllCustomersAsync();
            return Ok(new { success = true, data = customers });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting customers");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get customer by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomerById(int id)
    {
        try
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            if (customer == null)
                return NotFound(new { success = false, message = "Customer not found" });

            return Ok(new { success = true, data = customer });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting customer");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Create new customer
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator,Manager,Encoder")]
    public async Task<IActionResult> CreateCustomer([FromBody] Customer customer)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdCustomer = await _customerService.CreateCustomerAsync(customer);
            return CreatedAtAction(nameof(GetCustomerById), new { id = createdCustomer.Id }, createdCustomer);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating customer");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Update customer
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator,Manager,Encoder")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer customer)
    {
        try
        {
            if (id != customer.Id)
                return BadRequest(new { success = false, message = "ID mismatch" });

            var existing = await _customerService.GetCustomerByIdAsync(id);
            if (existing == null)
                return NotFound(new { success = false, message = "Customer not found" });

            var updated = await _customerService.UpdateCustomerAsync(customer);
            return Ok(new { success = true, data = updated });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating customer");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Delete customer (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator,Manager")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        try
        {
            await _customerService.DeleteCustomerAsync(id);
            return Ok(new { success = true, message = "Customer deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting customer");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }
}
