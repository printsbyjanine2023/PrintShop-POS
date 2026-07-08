namespace PrintShop.Core.Services;

public class InventoryService : IInventoryService
{
    public Task<object?> GetInventoryByProductIdAsync(int productId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateStockAsync(int productId, decimal quantity, string transactionType)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<object>> GetLowStockItemsAsync()
    {
        throw new NotImplementedException();
    }
}
