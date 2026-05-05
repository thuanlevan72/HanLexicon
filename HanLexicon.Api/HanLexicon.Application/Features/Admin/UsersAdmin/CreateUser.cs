using Application.Interfaces;
using FluentValidation;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Common;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.UsersAdmin
{
    #region Command
    public record CommandCreateUser(
        string Username,
        string Password,
        string? FullName,
        string? Email,
        string? Role = "student"
    ) : IRequest<Result>;
    #endregion

    #region Validator
    public class CommandCreateUserValidator : AbstractValidator<CommandCreateUser>
    {
        public CommandCreateUserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().MinimumLength(4).MaximumLength(50);
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
            RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrEmpty(x.Email));
        }
    }
    #endregion

    #region Handler
    public class CommandCreateUserHandler : IRequestHandler<CommandCreateUser, Result>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CommandCreateUserHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(CommandCreateUser request, CancellationToken cancellationToken)
        {
            var userRepo = _unitOfWork.Repository<User>();
            
            if (await userRepo.Query().AnyAsync(u => u.Username == request.Username, cancellationToken))
                return Result.Failure("Tên đăng nhập đã tồn tại.");

            if (!string.IsNullOrEmpty(request.Email) && await userRepo.Query().AnyAsync(u => u.Email == request.Email, cancellationToken))
                return Result.Failure("Email đã được sử dụng.");

            string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, 13);
            var userId = Guid.NewGuid();

            var user = new User
            {
                Id = userId,
                Username = request.Username,
                PasswordHash = hashedPassword,
                DisplayName = request.FullName ?? request.Username,
                Email = request.Email,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            // Xác định Role
            short roleId = (short)RoleEnum.Student;
            if (request.Role?.ToLower() == "admin") roleId = (short)RoleEnum.Admin;

            var userRole = new UserRole
            {
                UserId = userId,
                RoleId = roleId,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.BeginTransactionAsync();
            try
            {
                userRepo.Add(user);
                _unitOfWork.Repository<UserRole>().Add(userRole);
                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
                return Result.Success("Tạo người dùng thành công.");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                return Result.Failure("Lỗi khi tạo người dùng: " + ex.Message);
            }
        }
    }
    #endregion

    #region Result
    public record Result(bool IsSuccess, string Message)
    {
        public static Result Success(string message) => new Result(true, message);
        public static Result Failure(string message) => new Result(false, message);
    }
    #endregion
}
