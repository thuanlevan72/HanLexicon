using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class SearchHistory
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Query { get; set; } = null!;

    public Guid? VocabId { get; set; }

    public DateTime SearchedAt { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Vocabulary? Vocab { get; set; }
}
