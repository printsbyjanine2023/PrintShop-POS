namespace PrintShop.Core.Entities;

public class Service
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string ServiceType { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public bool IsTaxable { get; set; } = true;
    public bool RequiresDesign { get; set; } = false;
    public bool RequiresApproval { get; set; } = false;
    public int? EstimatedTurnaroundDays { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
