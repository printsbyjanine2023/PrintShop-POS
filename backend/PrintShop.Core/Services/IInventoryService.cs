namespace PrintShop.Core.Services;

public interface IInventoryService
{
    Task<object?> GetInventoryByProductIdAsync(int productId);
    Task UpdateStockAsync(int productId, decimal quantity, string transactionType);
    Task<IEnumerable<object>> GetLowStockItemsAsync();
}
