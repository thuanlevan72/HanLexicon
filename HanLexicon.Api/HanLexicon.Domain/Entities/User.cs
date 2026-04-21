using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

/// <summary>
/// Tài khoản học viên và quản trị viên
/// </summary>
public partial class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    /// <summary>
    /// bcrypt hash, cost=12
    /// </summary>
    public string PasswordHash { get; set; } = null!;

    public string? DisplayName { get; set; }

    public string? Email { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public virtual ICollection<ImportJob> ImportJobs { get; set; } = new List<ImportJob>();

    public virtual ICollection<MediaFile> MediaFiles { get; set; } = new List<MediaFile>();

    public virtual ICollection<SearchHistory> SearchHistories { get; set; } = new List<SearchHistory>();

    public virtual ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    public virtual ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();

    public virtual ICollection<UserWordProgress> UserWordProgresses { get; set; } = new List<UserWordProgress>();
}
