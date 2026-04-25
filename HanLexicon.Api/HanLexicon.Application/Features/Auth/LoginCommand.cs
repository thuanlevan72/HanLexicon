using HanLexicon.Domain.Entities;
using Application.Features.Auth;
using Application.Interfaces;
using FluentValidation;
using HanLexicon.Application.DTOs.authDto;
using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Services;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Auth;

#region Record
public record LoginCommand(string? Email, string? UserName, string Password, string ipAddress) : IRequest<AuthResultDto>;
#endregion



#region Validator
public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        // ?? Rule chính: ph?i có Email ho?c Username
        RuleFor(x => x)
            .Must(x => !string.IsNullOrWhiteSpace(x.Email)
                    || !string.IsNullOrWhiteSpace(x.UserName))
            .WithMessage("Ph?i nh?p Email ho?c Username");

        // Password
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6)
            .MaximumLength(100);

        // Email (n?u có thì ph?i dúng format)
        RuleFor(x => x.Email)
            .EmailAddress()
            .When(x => !string.IsNullOrWhiteSpace(x.Email));

        // Username (n?u có thì validate)
        RuleFor(x => x.UserName)
            .MinimumLength(4)
            .MaximumLength(50)
            .When(x => !string.IsNullOrWhiteSpace(x.UserName));
    }
}
#endregion


#region Command
public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResultDto>
{
    private readonly IAuthService _authService;

    public LoginCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthResultDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        return await _authService.LoginAsync(request.Email, request.UserName, request.Password, request.ipAddress);
    }
}
#endregion
