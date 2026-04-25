using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class VLessonsSummary
{
    public Guid? Id { get; set; }

    public string? Category { get; set; }

    public short? LessonNumber { get; set; }

    public string? Filename { get; set; }

    public string? TitleCn { get; set; }

    public string? TitleVn { get; set; }

    public string? Icon { get; set; }

    public string? Badge { get; set; }

    public long? HanziCount { get; set; }

    public long? VocabCount { get; set; }

    public long? QuizCount { get; set; }
}
