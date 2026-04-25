using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class VUserStat
{
    public Guid? UserId { get; set; }

    public string? Username { get; set; }

    public string? DisplayName { get; set; }

    public long? LessonsStarted { get; set; }

    public long? LessonsCompleted { get; set; }

    public decimal? AvgScore { get; set; }

    public long? TotalTimeSeconds { get; set; }
}
