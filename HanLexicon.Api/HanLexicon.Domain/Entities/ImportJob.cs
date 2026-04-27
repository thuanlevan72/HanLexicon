using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class ImportJob
{
    public Guid Id { get; set; }

    public Guid UploadedBy { get; set; }

    public string FileName { get; set; } = null!;

    public string Status { get; set; } = null!;

    public int TotalRows { get; set; }

    public int ProcessedRows { get; set; }

    public int FailedRows { get; set; }

    public string? ErrorLog { get; set; }

    public short? CategoryId { get; set; }

    public Guid? LessonId { get; set; }

    public DateTime? StartedAt { get; set; }

    public DateTime? FinishedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual LessonCategory? Category { get; set; }

    public virtual Lesson? Lesson { get; set; }

    public virtual User UploadedByNavigation { get; set; } = null!;
}
