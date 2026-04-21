using Application.Interfaces;
using FluentValidation;
using HanLexicon.Application.DTOs.authDto;
using HanLexicon.Application.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Application.Features.Auth;

#region Command
public record RegisterCommand(
    string Username,
    string Password,
    string ConfirmPassword,
    string? DisplayName,
    string? Email
) : IRequest<AuthResultDto>;
#endregion

#region Validator
public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .MinimumLength(4)
            .MaximumLength(50);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6)
            .MaximumLength(100);

        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password)
            .WithMessage("Password confirmation does not match");

        RuleFor(x => x.Email)
            .EmailAddress()
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.DisplayName)
            .MaximumLength(100);
    }
}
#endregion

#region Handler
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResultDto>
{
    private readonly IAuthService _authService;

    public RegisterCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthResultDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        return await _authService.RegisterAsync(
            request.Username,
            request.Password,
            request.DisplayName,
            request.Email
        );
    }
}
#endregion