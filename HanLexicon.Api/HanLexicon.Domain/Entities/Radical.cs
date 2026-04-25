using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class Radical
{
    public Guid Id { get; set; }

    public Guid SetId { get; set; }

    public short SortOrder { get; set; }

    public string Radical1 { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Meaning { get; set; }

    public string? ExampleChars { get; set; }

    public virtual RadicalSet Set { get; set; } = null!;
}
