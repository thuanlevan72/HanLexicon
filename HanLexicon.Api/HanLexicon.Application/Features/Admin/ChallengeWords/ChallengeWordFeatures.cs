using HanLexicon.Domain.Entities;
using Application.Interfaces;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.ChallengeWords;

public record QueryGetChallengeWords(Guid lessonId) : IRequest<List<ChallengeWordDto>>;
public record CreateChallengeWordCommand(Guid LessonId, string Word, string Pinyin, string Meaning, short SortOrder) : IRequest<ChallengeWordDto>;
public record UpdateChallengeWordCommand(Guid Id, Guid LessonId, string Word, string Pinyin, string Meaning, short SortOrder) : IRequest<ChallengeWordDto>;
public record DeleteChallengeWordCommand(Guid Id) : IRequest<bool>;

public class ChallengeWordHandler : 
    IRequestHandler<QueryGetChallengeWords, List<ChallengeWordDto>>,
    IRequestHandler<CreateChallengeWordCommand, ChallengeWordDto>,
    IRequestHandler<UpdateChallengeWordCommand, ChallengeWordDto>,
    IRequestHandler<DeleteChallengeWordCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public ChallengeWordHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<ChallengeWordDto>> Handle(QueryGetChallengeWords request, CancellationToken cancellationToken)
    {
        var words = await _uow.Repository<ChallengeWord>().Query().Where(x => x.LessonId == request.lessonId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<ChallengeWordDto>>(words);
    }

    public async Task<ChallengeWordDto> Handle(CreateChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = _mapper.Map<ChallengeWord>(request);
        word.Id = Guid.NewGuid();
        _uow.Repository<ChallengeWord>().Add(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ChallengeWordDto>(word);
    }

    public async Task<ChallengeWordDto> Handle(UpdateChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = await _uow.Repository<ChallengeWord>().GetByIdAsync(request.Id);
        if (word == null) return null;
        _mapper.Map(request, word);
        _uow.Repository<ChallengeWord>().Update(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ChallengeWordDto>(word);
    }

    public async Task<bool> Handle(DeleteChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = await _uow.Repository<ChallengeWord>().GetByIdAsync(request.Id);
        if (word == null) return false;
        _uow.Repository<ChallengeWord>().Delete(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
