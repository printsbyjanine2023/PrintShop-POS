namespace PrintShop.Core.Entities;

public class WorkOrder
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public int? QuotationId { get; set; }
    public int? AssignedDesignerId { get; set; }
    public int? AssignedProductionStaffId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public DateTime? DeadlineDate { get; set; }
    public DateTime? PickupDate { get; set; }
    public string Priority { get; set; } = "Normal";
    public string? Description { get; set; }
    public string Status { get; set; } = "Pending";
    public decimal? EstimatedAmount { get; set; }
    public decimal? FinalAmount { get; set; }
    public string PaymentStatus { get; set; } = "Pending";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
