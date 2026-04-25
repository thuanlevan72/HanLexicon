using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class HanziCard
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

    public virtual Lesson Lesson { get; set; } = null!;
}
