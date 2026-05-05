using System;
using System.Collections.Generic;

namespace HanLexicon.Domain.Entities;

public partial class Lesson
{
    public Guid Id { get; set; }

    public short CategoryId { get; set; }

    public short? LessonNumber { get; set; }

    /// <summary>
    /// T�n file HTML g?c, d�ng l�m game_id khi luu ti?n d?
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

    public virtual ICollection<UserStudyProgress> UserStudyProgresses { get; set; } = new List<UserStudyProgress>();

    public virtual ICollection<ReviewHistory> ReviewHistories { get; set; } = new List<ReviewHistory>();

    public virtual ICollection<Vocabulary> Vocabularies { get; set; } = new List<Vocabulary>();
}
