using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

/// <summary>
/// Lưu lịch sử học tập/tra cứu của từng từ vựng riêng biệt
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
