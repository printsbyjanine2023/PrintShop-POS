using PrintShop.Core.Entities;
using PrintShop.Infrastructure.Repositories;

namespace PrintShop.Core.Services;

public class CustomerService : ICustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public CustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Customer?> GetCustomerByIdAsync(int id)
    {
        var repository = _unitOfWork.GetRepository<Customer>();
        return await repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
    {
        var repository = _unitOfWork.GetRepository<Customer>();
        return await repository.FindAsync(c => !c.IsDeleted);
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        customer.Code = GenerateCustomerCode();
        customer.CreatedAt = DateTime.UtcNow;
        customer.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<Customer>();
        await repository.AddAsync(customer);
        await _unitOfWork.SaveChangesAsync();

        return customer;
    }

    public async Task<Customer> UpdateCustomerAsync(Customer customer)
    {
        customer.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<Customer>();
        repository.Update(customer);
        await _unitOfWork.SaveChangesAsync();

        return customer;
    }

    public async Task DeleteCustomerAsync(int id)
    {
        var customer = await GetCustomerByIdAsync(id);
        if (customer != null)
        {
            customer.IsDeleted = true;
            await UpdateCustomerAsync(customer);
        }
    }

    private string GenerateCustomerCode()
    {
        return "CUST-" + DateTime.Now.Ticks.ToString().Substring(0, 8);
    }
}
