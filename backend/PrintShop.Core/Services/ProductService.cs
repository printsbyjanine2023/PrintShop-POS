using PrintShop.Core.Entities;
using PrintShop.Infrastructure.Repositories;

namespace PrintShop.Core.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        var repository = _unitOfWork.GetRepository<Product>();
        return await repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        var repository = _unitOfWork.GetRepository<Product>();
        return await repository.FindAsync(p => p.IsActive && !p.IsDeleted);
    }

    public async Task<Product> CreateProductAsync(Product product)
    {
        product.Code = GenerateProductCode();
        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<Product>();
        await repository.AddAsync(product);
        await _unitOfWork.SaveChangesAsync();

        return product;
    }

    public async Task<Product> UpdateProductAsync(Product product)
    {
        product.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<Product>();
        repository.Update(product);
        await _unitOfWork.SaveChangesAsync();

        return product;
    }

    public async Task DeleteProductAsync(int id)
    {
        var product = await GetProductByIdAsync(id);
        if (product != null)
        {
            product.IsDeleted = true;
            await UpdateProductAsync(product);
        }
    }

    private string GenerateProductCode()
    {
        return "PROD-" + DateTime.Now.Ticks.ToString().Substring(0, 8);
    }
}
