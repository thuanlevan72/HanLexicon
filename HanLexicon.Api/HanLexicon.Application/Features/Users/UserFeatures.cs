using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.docsData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;

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

public record QueryGetUserWordProgress() : IRequest<List<UserWordProgress>>;

public class GetUserWordProgressHandler : IRequestHandler<QueryGetUserWordProgress, List<UserWordProgress>>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUserService;

    public GetUserWordProgressHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
    {
        _uow = uow;
        _currentUserService = currentUserService;
    }

    public async Task<List<UserWordProgress>> Handle(QueryGetUserWordProgress request, CancellationToken cancellationToken)
    {
        return await _uow.Repository<UserWordProgress>().Query()
            .Include(x => x.Vocab)
            .Where(x => x.UserId == _currentUserService.UserId)
            .OrderByDescending(x => x.LastReviewed)
            .ToListAsync(cancellationToken);
    }
}
