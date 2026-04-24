namespace HanLexicon.Application.DTOs.Admin;

public class VocabularyDto
{
    public Guid Id { get; set; }
    public Guid LessonId { get; set; }
    public string LessonTitle { get; set; } = null!;
    public short SortOrder { get; set; }
    public string Word { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public string? ExampleCn { get; set; }
    public string? ExamplePy { get; set; }
    public string? ExampleVn { get; set; }
    public string? AudioUrl { get; set; }
    public string? MeaningEn { get; set; }
    public string? ImageUrl { get; set; }
}
