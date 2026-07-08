using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface IWorkOrderService
{
    Task<WorkOrder?> GetWorkOrderByIdAsync(int id);
    Task<IEnumerable<WorkOrder>> GetAllWorkOrdersAsync();
    Task<WorkOrder> CreateWorkOrderAsync(WorkOrder workOrder);
    Task<WorkOrder> UpdateWorkOrderAsync(WorkOrder workOrder);
    Task UpdateWorkOrderStatusAsync(int id, string newStatus);
}
