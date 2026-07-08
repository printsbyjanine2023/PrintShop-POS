# Development Guide

## Getting Started

### Backend Development

#### Project Structure
```
PrintShop.API/          - ASP.NET Core Web API
PrintShop.Core/         - Domain models, DTOs, interfaces
PrintShop.Infrastructure/ - Data access, EF Core
PrintShop.Tests/        - Unit and integration tests
```

#### Adding a New Feature

1. **Create Entity** (PrintShop.Core/Entities/)
```csharp
public class MyEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    // ...
}
```

2. **Add DbSet** to PrintShopDbContext
```csharp
public DbSet<MyEntity> MyEntities { get; set; }
```

3. **Create Service Interface** (PrintShop.Core/Services/)
```csharp
public interface IMyService
{
    Task<MyEntity> GetByIdAsync(int id);
    // ...
}
```

4. **Implement Service** (PrintShop.Core/Services/)

5. **Create Controller** (PrintShop.API/Controllers/)
```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MyEntitiesController : ControllerBase
{
    // ...
}
```

6. **Register in DI** (Program.cs)
```csharp
builder.Services.AddScoped<IMyService, MyService>();
```

### Frontend Development

#### Project Structure
```
src/
  components/    - Reusable React components
  pages/         - Page components
  services/      - API client services
  stores/        - Zustand state stores
  types/         - TypeScript types
  styles/        - Global styles
```

#### Adding a New Page

1. **Create Types** (src/types/)
```typescript
export interface MyData {
  id: number;
  name: string;
  // ...
}
```

2. **Create Service** (src/services/)
```typescript
export const getMyData = async () => {
  return await apiClient.get('/my-data');
};
```

3. **Create Page Component** (src/pages/)
```typescript
export const MyPage: React.FC = () => {
  // ...
};
```

4. **Add Route** (src/App.tsx)
```typescript
<Route path="/my-page" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
```

## Coding Standards

### Backend
- Use dependency injection
- Follow SOLID principles
- Add XML documentation comments
- Use async/await for I/O operations
- Validate input in controllers
- Use appropriate HTTP status codes

### Frontend
- Use functional components with hooks
- Leverage TypeScript for type safety
- Use Zustand for state management
- Implement error boundaries
- Use React.memo for expensive components
- Follow Tailwind CSS conventions

## Testing

### Backend Unit Tests
```bash
cd backend/PrintShop.Tests
dotnet test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend/PrintShop.API
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

## Common Issues

### Database Connection Error
- Check SQL Server is running
- Verify connection string in appsettings.json
- Ensure database exists

### CORS Errors
- Check CORS policy in Program.cs
- Verify frontend URL is in allowed origins

### API 401 Unauthorized
- Check JWT token is valid
- Verify Authorization header format: `Bearer <token>`
- Check token hasn't expired

### State Not Updating
- Ensure Zustand store methods are being called
- Check React DevTools for state changes
- Verify component is subscribed to store

## Performance Tips

- Use pagination for large datasets
- Implement caching for frequently accessed data
- Optimize database queries with includes/select
- Use code splitting for frontend routes
- Implement virtual scrolling for long lists
- Use React.memo for expensive components

## Security Considerations

- Always validate user input on backend
- Use HTTPS in production
- Keep JWT secret secure
- Implement rate limiting on APIs
- Use parameterized queries (EF Core does this)
- Store sensitive data encrypted
- Implement proper CORS policies
- Use secure password hashing (bcrypt)

## Debugging

### Backend
- Use Visual Studio debugger
- Check application logs
- Use Swagger UI for API testing

### Frontend
- Use React DevTools browser extension
- Use Zustand DevTools for state debugging
- Check browser console for errors
- Use Network tab for API debugging
