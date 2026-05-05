using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class UserStudyProgress
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid LessonId { get; set; }

    public int CurrentIndex { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime LastStudiedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
