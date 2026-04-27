using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.UsersAdmin
{
    public record QueryGetUsers(
        string? Search = null, 
        bool? IsActive = null, 
        string? SortBy = "CreatedAt", 
        bool IsDescending = true,
        int Page = 1, 
        int PageSize = 10) : IRequest<UserListResponse>;

    public class UserListResponse
    {
        public List<UserDto> Items { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }

    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GetUsersHandler : IRequestHandler<QueryGetUsers, UserListResponse>
    {
        private readonly IUnitOfWork _uow;
        public GetUsersHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<UserListResponse> Handle(QueryGetUsers request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<User>().Query().AsNoTracking();

            // 1. Lọc theo Search
            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(u => u.Username.Contains(request.Search) || (u.Email != null && u.Email.Contains(request.Search)) || (u.DisplayName != null && u.DisplayName.Contains(request.Search)));
            }

            // 2. Lọc theo Trạng thái
            if (request.IsActive.HasValue)
            {
                query = query.Where(u => u.IsActive == request.IsActive.Value);
            }

            // 3. Sắp xếp
            if (request.SortBy == "FullName")
            {
                query = request.IsDescending ? query.OrderByDescending(u => u.DisplayName) : query.OrderBy(u => u.DisplayName);
            }
            else
            {
                query = request.IsDescending ? query.OrderByDescending(u => u.CreatedAt) : query.OrderBy(u => u.CreatedAt);
            }

            var totalItems = await query.CountAsync(cancellationToken);
            var items = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email ?? "",
                    FullName = u.DisplayName ?? "",
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync(cancellationToken);

            return new UserListResponse
            {
                Items = items,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize)
            };
        }
    }

    // 2. Query lấy chi tiết người dùng
    public record QueryGetUserDetails(Guid Id) : IRequest<UserDto>;

    // 3. Command cập nhật trạng thái tài khoản
    public record CommandUpdateUserStatus(Guid Id, bool IsActive) : IRequest<bool>;

    public class UserActionHandlers : 
        IRequestHandler<QueryGetUserDetails, UserDto>,
        IRequestHandler<CommandUpdateUserStatus, bool>
    {
        private readonly IUnitOfWork _uow;
        public UserActionHandlers(IUnitOfWork uow) => _uow = uow;

        public async Task<UserDto> Handle(QueryGetUserDetails request, CancellationToken cancellationToken)
        {
            var u = await _uow.Repository<User>().GetByIdAsync(request.Id);
            if (u == null) throw new Exception("User not found");
            return new UserDto { 
                Id = u.Id, Username = u.Username, Email = u.Email ?? "", 
                FullName = u.DisplayName ?? "", IsActive = u.IsActive, CreatedAt = u.CreatedAt 
            };
        }

        public async Task<bool> Handle(CommandUpdateUserStatus request, CancellationToken cancellationToken)
        {
            var u = await _uow.Repository<User>().GetByIdAsync(request.Id);
            if (u == null) return false;
            u.IsActive = request.IsActive;
            _uow.Repository<User>().Update(u);
            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
