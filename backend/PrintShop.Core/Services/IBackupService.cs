using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface IBackupService
{
    Task<bool> CreateBackupAsync(string backupName);
    Task<bool> RestoreBackupAsync(string backupName);
    Task<List<string>> GetBackupListAsync();
    Task<bool> DeleteBackupAsync(string backupName);
    Task<bool> ScheduleAutomaticBackupAsync(TimeSpan interval);
}
