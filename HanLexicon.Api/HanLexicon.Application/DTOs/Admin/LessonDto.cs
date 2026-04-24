namespace HanLexicon.Application.DTOs.Admin;

public class LessonDto
{
    public Guid Id { get; set; }
    public short CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public short? LessonNumber { get; set; }
    public string Filename { get; set; } = null!;
    public string? TitleCn { get; set; }
    public string? TitleVn { get; set; }
    public string Icon { get; set; } = null!;
    public string? Description { get; set; }
    public string? Badge { get; set; }
    public bool IsPublished { get; set; }
    public short SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }
}
