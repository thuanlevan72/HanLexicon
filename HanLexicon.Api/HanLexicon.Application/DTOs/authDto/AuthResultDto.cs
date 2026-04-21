namespace HanLexicon.Application.DTOs.authDto;

public record AuthResultDto
{
    public bool IsSuccess { get; init; }
    public string? RefreshToken { get; init; }
    public string? AccessToken { get; init; }
    public string? Message { get; init; }
    public IEnumerable<string>? Errors { get; init; }
}