namespace PrintShop.Core.Services;

public interface ISalesService
{
    Task CreateSaleAsync(object saleData);
    Task<object?> GetSaleByIdAsync(int id);
    Task<IEnumerable<object>> GetAllSalesAsync();
    Task VoidSaleAsync(int id, string reason);
}
