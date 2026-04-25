namespace HanLexicon.Application.DTOs.Admin;

public class HanziCardDto
{
    public Guid Id { get; set; }
    public Guid LessonId { get; set; }
    public short SortOrder { get; set; }
    public string Character { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public string? Mnemonic { get; set; }
    public short? StrokeCount { get; set; }
    public string? Radical { get; set; }
}

public class ChallengeWordDto
{
    public Guid Id { get; set; }
    public Guid LessonId { get; set; }
    public string Word { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public short SortOrder { get; set; }
}

public class QuizQuestionDto
{
    public Guid Id { get; set; }
    public Guid LessonId { get; set; }
    public short SortOrder { get; set; }
    public string Question { get; set; } = null!;
    public string Explanation { get; set; } = null!;
    public short Difficulty { get; set; }
}

public class QuizOptionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public short SortOrder { get; set; }
    public string OptionText { get; set; } = null!;
    public bool IsCorrect { get; set; }
}

public class RadicalSetDto
{
    public Guid Id { get; set; }
    public Guid? LessonId { get; set; }
    public short SetNumber { get; set; }
    public string Title { get; set; } = null!;
    public string Icon { get; set; } = null!;
}

public class RadicalDto
{
    public Guid Id { get; set; }
    public Guid SetId { get; set; }
    public short SortOrder { get; set; }
    public string Radical { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Meaning { get; set; }
    public string? ExampleChars { get; set; }
}

public class AdminDocumentDto
{
    public Guid Id { get; set; }
    public short CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string DownloadUrl { get; set; } = null!;
    public string DocType { get; set; } = null!;
    public short SortOrder { get; set; }
    public bool IsPublished { get; set; }
}
