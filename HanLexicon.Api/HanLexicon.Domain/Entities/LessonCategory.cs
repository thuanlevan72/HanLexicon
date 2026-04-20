using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class LessonCategory
{
    public short Id { get; set; }

    public string Slug { get; set; } = null!;

    public string Name { get; set; } = null!;

    public short SortOrder { get; set; }

    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
