using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class Vocabulary
{
    public Guid Id { get; set; }

    public Guid LessonId { get; set; }

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

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual ICollection<SearchHistory> SearchHistories { get; set; } = new List<SearchHistory>();

    public virtual ICollection<UserWordProgress> UserWordProgresses { get; set; } = new List<UserWordProgress>();
}
