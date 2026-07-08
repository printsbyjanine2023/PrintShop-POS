using PrintShop.Core.Entities;
using PrintShop.Infrastructure.Repositories;

namespace PrintShop.Core.Services;

public class WorkOrderService : IWorkOrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public WorkOrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<WorkOrder?> GetWorkOrderByIdAsync(int id)
    {
        var repository = _unitOfWork.GetRepository<WorkOrder>();
        return await repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<WorkOrder>> GetAllWorkOrdersAsync()
    {
        var repository = _unitOfWork.GetRepository<WorkOrder>();
        return await repository.GetAllAsync();
    }

    public async Task<WorkOrder> CreateWorkOrderAsync(WorkOrder workOrder)
    {
        workOrder.OrderNumber = GenerateOrderNumber();
        workOrder.OrderDate = DateTime.UtcNow;
        workOrder.CreatedAt = DateTime.UtcNow;
        workOrder.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<WorkOrder>();
        await repository.AddAsync(workOrder);
        await _unitOfWork.SaveChangesAsync();

        return workOrder;
    }

    public async Task<WorkOrder> UpdateWorkOrderAsync(WorkOrder workOrder)
    {
        workOrder.UpdatedAt = DateTime.UtcNow;

        var repository = _unitOfWork.GetRepository<WorkOrder>();
        repository.Update(workOrder);
        await _unitOfWork.SaveChangesAsync();

        return workOrder;
    }

    public async Task UpdateWorkOrderStatusAsync(int id, string newStatus)
    {
        var workOrder = await GetWorkOrderByIdAsync(id);
        if (workOrder != null)
        {
            workOrder.Status = newStatus;
            workOrder.UpdatedAt = DateTime.UtcNow;
            await UpdateWorkOrderAsync(workOrder);
        }
    }

    private string GenerateOrderNumber()
    {
        return "ORD-" + DateTime.Now.ToString("yyyyMMdd") + "-" + DateTime.Now.Ticks.ToString().Substring(0, 6);
    }
}
