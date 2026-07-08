using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface IReportService
{
    Task<object> GenerateDailySalesReportAsync(DateTime date);
    Task<object> GenerateMonthlySalesReportAsync(int year, int month);
    Task<object> GenerateInventoryReportAsync();
    Task<object> GeneratePayrollReportAsync(int year, int month);
    Task<object> GenerateProfitLossReportAsync(int year, int month);
    Task<byte[]> ExportReportToPdfAsync(object report, string reportType);
    Task<byte[]> ExportReportToExcelAsync(object report, string reportType);
}
