namespace HanLexicon.Application.DTOs.gamesData;

public class VocabularyItemDto
{
    public Guid Id { get; set; }
    public string Word { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public string? MeaningEn { get; set; }
    public string? ExampleCn { get; set; }
    public string? ExamplePy { get; set; }
    public string? ExampleVn { get; set; }
    public string? AudioUrl { get; set; }
    public string? ImageUrl { get; set; }
    public short SortOrder { get; set; }
}
