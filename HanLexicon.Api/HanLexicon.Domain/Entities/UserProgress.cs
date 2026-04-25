using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class UserProgress
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid LessonId { get; set; }

    public short Score { get; set; }

    public bool Completed { get; set; }

    public short Attempts { get; set; }

    public int TimeSpentS { get; set; }

    public DateTime LastPlayed { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
