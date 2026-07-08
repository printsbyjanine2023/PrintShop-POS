using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface IPaymentService
{
    Task<bool> ProcessCashPaymentAsync(int saleId, decimal amount);
    Task<bool> ProcessGCashPaymentAsync(int saleId, decimal amount, string referenceNumber);
    Task<bool> ProcessMayaPaymentAsync(int saleId, decimal amount, string referenceNumber);
    Task<bool> ProcessBankTransferAsync(int saleId, decimal amount, string referenceNumber);
    Task<bool> ProcessCreditCardAsync(int saleId, decimal amount, string cardNumber);
}
