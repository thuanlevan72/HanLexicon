namespace HanLexicon.Application.DTOs.docsData;

public class DocumentCategoryResponseDto
{
    public short CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public List<DocumentItemDto> Documents { get; set; } = new();
}
