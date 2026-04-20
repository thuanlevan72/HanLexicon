using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class QuizOption
{
    public Guid Id { get; set; }

    public Guid QuestionId { get; set; }

    public short SortOrder { get; set; }

    public string OptionText { get; set; } = null!;

    public bool IsCorrect { get; set; }

    public virtual QuizQuestion Question { get; set; } = null!;
}
