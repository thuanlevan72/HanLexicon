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

namespace HanLexicon.Application.Features.Admin.HanziCards;

public record QueryGetHanziCards(Guid lessonId) : IRequest<List<HanziCardDto>>;
public record CreateHanziCardCommand(Guid LessonId, string Character, string Pinyin, string Meaning, string? Mnemonic, short? StrokeCount, string? Radical, short SortOrder) : IRequest<HanziCardDto>;
public record UpdateHanziCardCommand(Guid Id, Guid LessonId, string Character, string Pinyin, string Meaning, string? Mnemonic, short? StrokeCount, string? Radical, short SortOrder) : IRequest<HanziCardDto>;
public record DeleteHanziCardCommand(Guid Id) : IRequest<bool>;

public class HanziCardHandler : 
    IRequestHandler<QueryGetHanziCards, List<HanziCardDto>>,
    IRequestHandler<CreateHanziCardCommand, HanziCardDto>,
    IRequestHandler<UpdateHanziCardCommand, HanziCardDto>,
    IRequestHandler<DeleteHanziCardCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public HanziCardHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<HanziCardDto>> Handle(QueryGetHanziCards request, CancellationToken cancellationToken)
    {
        var cards = await _uow.Repository<HanziCard>().Query().Where(x => x.LessonId == request.lessonId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<HanziCardDto>>(cards);
    }

    public async Task<HanziCardDto> Handle(CreateHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = _mapper.Map<HanziCard>(request);
        card.Id = Guid.NewGuid();
        _uow.Repository<HanziCard>().Add(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<HanziCardDto>(card);
    }

    public async Task<HanziCardDto> Handle(UpdateHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _uow.Repository<HanziCard>().GetByIdAsync(request.Id);
        if (card == null) return null;
        _mapper.Map(request, card);
        _uow.Repository<HanziCard>().Update(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<HanziCardDto>(card);
    }

    public async Task<bool> Handle(DeleteHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _uow.Repository<HanziCard>().GetByIdAsync(request.Id);
        if (card == null) return false;
        _uow.Repository<HanziCard>().Delete(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
