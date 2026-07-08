namespace PrintShop.Core.Entities;

public class Customer
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? BusinessName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? AlternatePhoneNumber { get; set; }
    public string? TaxId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public decimal LoyaltyPoints { get; set; } = 0;
    public string? CustomerType { get; set; }
    public bool IsPWD { get; set; } = false;
    public bool IsSenior { get; set; } = false;
    public decimal OutstandingBalance { get; set; } = 0;
    public decimal CreditLimit { get; set; } = 0;
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
