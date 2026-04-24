namespace HanLexicon.Application.DTOs.docsData;

public class DocumentItemDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string DownloadUrl { get; set; } = null!;
    public string DocType { get; set; } = null!;
}
