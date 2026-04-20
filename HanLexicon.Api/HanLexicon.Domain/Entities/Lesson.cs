using System;
using System.Collections.Generic;

namespace Infrastructure.Postgres;

public partial class Lesson
{
    public Guid Id { get; set; }

    public short CategoryId { get; set; }

    public short? LessonNumber { get; set; }

    /// <summary>
    /// Tên file HTML gốc, dùng làm game_id khi lưu tiến độ
    /// </summary>
    public string Filename { get; set; } = null!;

    public string? TitleCn { get; set; }

    public string? TitleVn { get; set; }

    public string Icon { get; set; } = null!;

    public string? Description { get; set; }

    public string? Badge { get; set; }

    public bool IsPublished { get; set; }

    public short SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual LessonCategory Category { get; set; } = null!;

    public virtual ICollection<ChallengeWord> ChallengeWords { get; set; } = new List<ChallengeWord>();

    public virtual ICollection<HanziCard> HanziCards { get; set; } = new List<HanziCard>();

    public virtual ICollection<QuizQuestion> QuizQuestions { get; set; } = new List<QuizQuestion>();

    public virtual ICollection<RadicalSet> RadicalSets { get; set; } = new List<RadicalSet>();

    public virtual ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();

    public virtual ICollection<Vocabulary> Vocabularies { get; set; } = new List<Vocabulary>();
}
