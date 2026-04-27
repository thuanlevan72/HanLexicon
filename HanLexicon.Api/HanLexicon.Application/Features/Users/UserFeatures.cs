using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.docsData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace HanLexicon.Application.Features.Users;

public record QueryGetUserStats() : IRequest<VUserStat?>;

public class GetUserStatsHandler : IRequestHandler<QueryGetUserStats, VUserStat?>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUserService;

    public GetUserStatsHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
    {
        _uow = uow;
        _currentUserService = currentUserService;
    }

    public async Task<VUserStat?> Handle(QueryGetUserStats request, CancellationToken cancellationToken)
    {
        return await _uow.Repository<VUserStat>().Query()
            .FirstOrDefaultAsync(x => x.UserId == _currentUserService.UserId, cancellationToken);
    }
}

public record QueryGetUserWordProgress() : IRequest<List<UserWordMasteryDto>>;

public class UserWordMasteryDto
{
    public Guid VocabId { get; set; }
    public string Word { get; set; } = null!;
    public string Pinyin { get; set; } = null!;
    public string Meaning { get; set; } = null!;
    public string? AudioUrl { get; set; }
    public string? ImageUrl { get; set; }
    public int Proficiency { get; set; } // Tính toán từ ReviewCount
    public string Status { get; set; } = null!;
    public int TimesCorrect { get; set; } // Ánh xạ từ ReviewCount
    public DateTime? LastReviewed { get; set; }
}

public class GetUserWordProgressHandler : IRequestHandler<QueryGetUserWordProgress, List<UserWordMasteryDto>>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUserService;

    public GetUserWordProgressHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
    {
        _uow = uow;
        _currentUserService = currentUserService;
    }

    public async Task<List<UserWordMasteryDto>> Handle(QueryGetUserWordProgress request, CancellationToken cancellationToken)
    {
        var progress = await _uow.Repository<UserWordProgress>().Query()
            .Include(x => x.Vocab)
            .Where(x => x.UserId == _currentUserService.UserId)
            .OrderByDescending(x => x.ReviewCount)
            .Select(x => new UserWordMasteryDto
            {
                VocabId = x.VocabId,
                Word = x.Vocab.Word,
                Pinyin = x.Vocab.Pinyin,
                Meaning = x.Vocab.Meaning,
                AudioUrl = x.Vocab.AudioUrl,
                ImageUrl = x.Vocab.ImageUrl,
                Proficiency = Math.Min(x.ReviewCount * 20, 100), // Mỗi lần đúng được 20%, tối đa 100%
                Status = x.Status,
                TimesCorrect = x.ReviewCount,
                LastReviewed = x.LastReviewed
            })
            .ToListAsync(cancellationToken);

        return progress;
    }
}

public record QueryGetUserLearningHistory() : IRequest<List<UserLearningHistoryDto>>;

public class UserLearningHistoryDto
{
    public Guid LessonId { get; set; }
    public string LessonName { get; set; } = null!;
    public string CategoryName { get; set; } = null!;
    public short Score { get; set; }
    public bool Completed { get; set; }
    public int Attempts { get; set; }
    public DateTime LastPlayed { get; set; }
}

public class GetUserLearningHistoryHandler : IRequestHandler<QueryGetUserLearningHistory, List<UserLearningHistoryDto>>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUserService;

    public GetUserLearningHistoryHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
    {
        _uow = uow;
        _currentUserService = currentUserService;
    }

    public async Task<List<UserLearningHistoryDto>> Handle(QueryGetUserLearningHistory request, CancellationToken cancellationToken)
    {
        var history = await _uow.Repository<UserProgress>().Query()
            .Include(x => x.Lesson)
            .ThenInclude(l => l.Category)
            .Where(x => x.UserId == _currentUserService.UserId)
            .OrderByDescending(x => x.LastPlayed)
            .Select(x => new UserLearningHistoryDto
            {
                LessonId = x.LessonId,
                LessonName = x.Lesson.TitleCn + " " + x.Lesson.TitleVn,
                CategoryName = x.Lesson.Category != null ? x.Lesson.Category.Name : "N/A",
                Score = x.Score,
                Completed = x.Completed,
                Attempts = x.Attempts,
                LastPlayed = x.LastPlayed
            })
            .ToListAsync(cancellationToken);

        return history;
    }
}
