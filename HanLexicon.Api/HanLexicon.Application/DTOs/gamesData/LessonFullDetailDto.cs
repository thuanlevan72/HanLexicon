namespace HanLexicon.Application.DTOs.gamesData;

public class HanziCardDto
{
    public Guid Id { get; set; }
    public string Character { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public string? Mnemonic { get; set; }
    public short? StrokeCount { get; set; }
    public string? Radical { get; set; }
    public short SortOrder { get; set; }
}

public class RadicalDto
{
    public Guid Id { get; set; }
    public string Radical { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Meaning { get; set; }
    public string? ExampleChars { get; set; }
    public short SortOrder { get; set; }
}

public class RadicalSetDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public short SetNumber { get; set; }
    public List<RadicalDto> Radicals { get; set; } = new();
}

public class QuizOptionDto
{
    public Guid Id { get; set; }
    public string OptionText { get; set; } = null!;
    public bool IsCorrect { get; set; }
    public short SortOrder { get; set; }
}

public class QuizQuestionDto
{
    public Guid Id { get; set; }
    public string Question { get; set; } = null!;
    public string Explanation { get; set; } = null!;
    public short Difficulty { get; set; }
    public short SortOrder { get; set; }
    public List<QuizOptionDto> Options { get; set; } = new();
}

public class LessonFullDetailDto
{
    public Guid Id { get; set; }
    public string? TitleCn { get; set; }
    public string? TitleVn { get; set; }
    public string Filename { get; set; } = null!;
    public string? Description { get; set; }
    public List<HanziCardDto> HanziCards { get; set; } = new();
    public List<RadicalSetDto> RadicalSets { get; set; } = new();
    public List<QuizQuestionDto> Quizzes { get; set; } = new();
}
