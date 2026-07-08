namespace PrintShop.Core.Services;

public class BackupService : IBackupService
{
    public Task<bool> CreateBackupAsync(string backupName)
    {
        throw new NotImplementedException();
    }

    public Task<bool> RestoreBackupAsync(string backupName)
    {
        throw new NotImplementedException();
    }

    public Task<List<string>> GetBackupListAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteBackupAsync(string backupName)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ScheduleAutomaticBackupAsync(TimeSpan interval)
    {
        throw new NotImplementedException();
    }
}
