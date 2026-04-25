using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class ChallengeWord
{
    public Guid Id { get; set; }

    public Guid LessonId { get; set; }

    public short SortOrder { get; set; }

    public string Hanzi { get; set; } = null!;

    public string Pinyin { get; set; } = null!;

    public string MeaningVn { get; set; } = null!;

    public string? ExampleZh { get; set; }

    public string? ExampleVn { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;
}
