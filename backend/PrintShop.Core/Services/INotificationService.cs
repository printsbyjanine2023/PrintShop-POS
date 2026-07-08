using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface INotificationService
{
    Task SendLowStockAlertAsync(Product product);
    Task SendOrderReadyNotificationAsync(WorkOrder workOrder);
    Task SendPaymentReminderAsync(int customerId);
    Task SendPickupReminderAsync(WorkOrder workOrder);
    Task<bool> SendEmailAsync(string email, string subject, string body);
    Task<bool> SendSMSAsync(string phoneNumber, string message);
}
