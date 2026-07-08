using PrintShop.Infrastructure.Data;

namespace PrintShop.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly PrintShopDbContext _context;
    private readonly Dictionary<Type, object> _repositories = new();

    public UnitOfWork(PrintShopDbContext context)
    {
        _context = context;
    }

    public IRepository<T> GetRepository<T>() where T : class
    {
        var type = typeof(T);
        if (_repositories.ContainsKey(type))
        {
            return (IRepository<T>)_repositories[type];
        }

        var repositoryType = typeof(Repository<>).MakeGenericType(type);
        var repositoryInstance = Activator.CreateInstance(repositoryType, _context);
        _repositories.Add(type, repositoryInstance!);
        return (IRepository<T>)repositoryInstance!;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context?.Dispose();
    }
}
