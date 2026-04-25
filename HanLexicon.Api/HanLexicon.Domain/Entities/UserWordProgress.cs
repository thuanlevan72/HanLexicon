using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

/// <summary>
/// Luu l?ch s? h?c t?p/tra c?u c?a t?ng t? v?ng riêng bi?t
/// </summary>
public partial class UserWordProgress
{
    public Guid UserId { get; set; }

    public Guid VocabId { get; set; }

    public string Status { get; set; } = null!;

    public short ReviewCount { get; set; }

    public DateTime LastReviewed { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Vocabulary Vocab { get; set; } = null!;
}
