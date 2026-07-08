namespace PrintShop.Core.Services;

public class SalesService : ISalesService
{
    public Task CreateSaleAsync(object saleData)
    {
        throw new NotImplementedException();
    }

    public Task<object?> GetSaleByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<object>> GetAllSalesAsync()
    {
        throw new NotImplementedException();
    }

    public Task VoidSaleAsync(int id, string reason)
    {
        throw new NotImplementedException();
    }
}
