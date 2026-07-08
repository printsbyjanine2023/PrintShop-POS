namespace PrintShop.Core.Services;

public class ReportService : IReportService
{
    public Task<object> GenerateDailySalesReportAsync(DateTime date)
    {
        throw new NotImplementedException();
    }

    public Task<object> GenerateMonthlySalesReportAsync(int year, int month)
    {
        throw new NotImplementedException();
    }

    public Task<object> GenerateInventoryReportAsync()
    {
        throw new NotImplementedException();
    }

    public Task<object> GeneratePayrollReportAsync(int year, int month)
    {
        throw new NotImplementedException();
    }

    public Task<object> GenerateProfitLossReportAsync(int year, int month)
    {
        throw new NotImplementedException();
    }

    public Task<byte[]> ExportReportToPdfAsync(object report, string reportType)
    {
        throw new NotImplementedException();
    }

    public Task<byte[]> ExportReportToExcelAsync(object report, string reportType)
    {
        throw new NotImplementedException();
    }
}
