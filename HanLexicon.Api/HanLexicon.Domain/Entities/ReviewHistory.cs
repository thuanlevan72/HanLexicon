using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class ReviewHistory
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid LessonId { get; set; }

    public short Score { get; set; }

    public short TotalQuestions { get; set; }

    public short CorrectCount { get; set; }

    public string? DetailsJson { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
