namespace HanLexicon.Application.DTOs.Admin;

public class LessonCategoryDto
{
    public short Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public short SortOrder { get; set; }
}
