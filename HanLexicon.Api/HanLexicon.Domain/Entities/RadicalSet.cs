using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class RadicalSet
{
    public Guid Id { get; set; }

    public short SetNumber { get; set; }

    public string Title { get; set; } = null!;

    public string Icon { get; set; } = null!;

    public Guid? LessonId { get; set; }

    public virtual Lesson? Lesson { get; set; }

    public virtual ICollection<Radical> Radicals { get; set; } = new List<Radical>();
}
