using PrintShop.Core.DTOs.Auth;
using PrintShop.Core.Entities;

namespace PrintShop.Core.Services;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(string username, string password);
    Task<LoginResponseDto> RefreshTokenAsync(string refreshToken);
    Task LogoutAsync(int userId);
    Task<bool> ValidateTokenAsync(string token);
}
