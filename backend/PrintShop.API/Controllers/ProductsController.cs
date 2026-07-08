using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PrintShop.Core.Services;
using PrintShop.Core.Entities;

namespace PrintShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    /// <summary>
    /// Get all active products
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(new { success = true, data = products });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting products");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Get product by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound(new { success = false, message = "Product not found" });

            return Ok(new { success = true, data = product });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting product");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Create new product
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator,Manager")]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdProduct = await _productService.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Update product
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator,Manager")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
    {
        try
        {
            if (id != product.Id)
                return BadRequest(new { success = false, message = "ID mismatch" });

            var updated = await _productService.UpdateProductAsync(product);
            return Ok(new { success = true, data = updated });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }

    /// <summary>
    /// Delete product (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            await _productService.DeleteProductAsync(id);
            return Ok(new { success = true, message = "Product deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting product");
            return StatusCode(500, new { success = false, message = "An error occurred" });
        }
    }
}
