using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class QuizQuestion
{
    public Guid Id { get; set; }

    public Guid LessonId { get; set; }

    public short SortOrder { get; set; }

    public string Question { get; set; } = null!;

    public string Explanation { get; set; } = null!;

    public short Difficulty { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual ICollection<QuizOption> QuizOptions { get; set; } = new List<QuizOption>();
}
