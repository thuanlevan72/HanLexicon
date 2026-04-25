using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class MediaFile
{
    public Guid Id { get; set; }

    public string OwnerType { get; set; } = null!;

    public Guid OwnerId { get; set; }

    public string MediaType { get; set; } = null!;

    public string FileName { get; set; } = null!;

    public string StorageKey { get; set; } = null!;

    public string CdnUrl { get; set; } = null!;

    public string? MimeType { get; set; }

    public int? FileSizeKb { get; set; }

    public Guid? UploadedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User? UploadedByNavigation { get; set; }
}
