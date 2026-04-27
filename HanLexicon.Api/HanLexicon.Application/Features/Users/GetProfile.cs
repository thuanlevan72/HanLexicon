using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Users
{
    public record QueryGetProfile() : IRequest<UserProfileDto>;

    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Avatar { get; set; } = null!;
        public string Role { get; set; } = "student"; // Trả về role chính
    }

    public class GetProfileHandler : IRequestHandler<QueryGetProfile, UserProfileDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;

        public GetProfileHandler(IUnitOfWork uow, ICurrentUserService currentUser)
        {
            _uow = uow;
            _currentUser = currentUser;
        }

        public async Task<UserProfileDto> Handle(QueryGetProfile request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.UserId;
            
            // Lấy user kèm các roles
            var u = await _uow.Repository<User>().Query()
                .Include(x => x.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);
            
            if (u == null) throw new Exception("User not found");

            // Xác định role cao nhất (ưu tiên admin)
            string primaryRole = "student";
            var roleCodes = u.UserRoles.Select(ur => ur.Role.Code).ToList();
            Console.WriteLine($"[DEBUG] User {u.Username} has roles: {string.Join(", ", roleCodes)}");
            
            if (u.UserRoles.Any(ur => ur.Role.Code.ToLower() == "admin"))
            {
                primaryRole = "admin";
            }

            return new UserProfileDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email ?? "",
                DisplayName = u.DisplayName ?? u.Username,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={u.Username}",
                Role = primaryRole
            };
        }
    }
}
