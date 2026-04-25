using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class Document
{
    public Guid Id { get; set; }

    public short CategoryId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string DownloadUrl { get; set; } = null!;

    public string DocType { get; set; } = null!;

    public short SortOrder { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual LessonCategory Category { get; set; } = null!;
}
