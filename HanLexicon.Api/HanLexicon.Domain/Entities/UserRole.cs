using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class UserRole
{
    public Guid UserId { get; set; }

    public short RoleId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
