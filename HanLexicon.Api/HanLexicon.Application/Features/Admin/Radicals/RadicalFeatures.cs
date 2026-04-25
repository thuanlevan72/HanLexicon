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

namespace HanLexicon.Application.Features.Admin.Radicals;

public record QueryGetRadicalSets(Guid? lessonId) : IRequest<List<RadicalSetDto>>;
public record CreateRadicalSetCommand(Guid? LessonId, short SetNumber, string Title, string Icon) : IRequest<RadicalSetDto>;
public record UpdateRadicalSetCommand(Guid Id, Guid? LessonId, short SetNumber, string Title, string Icon) : IRequest<RadicalSetDto>;
public record DeleteRadicalSetCommand(Guid Id) : IRequest<bool>;

public record QueryGetRadicals(Guid setId) : IRequest<List<RadicalDto>>;
public record CreateRadicalCommand(Guid SetId, short SortOrder, string Radical, string Name, string? Meaning, string? ExampleChars) : IRequest<RadicalDto>;
public record UpdateRadicalCommand(Guid Id, Guid SetId, short SortOrder, string Radical, string Name, string? Meaning, string? ExampleChars) : IRequest<RadicalDto>;
public record DeleteRadicalCommand(Guid Id) : IRequest<bool>;

public class RadicalHandler : 
    IRequestHandler<QueryGetRadicalSets, List<RadicalSetDto>>,
    IRequestHandler<CreateRadicalSetCommand, RadicalSetDto>,
    IRequestHandler<UpdateRadicalSetCommand, RadicalSetDto>,
    IRequestHandler<DeleteRadicalSetCommand, bool>,
    IRequestHandler<QueryGetRadicals, List<RadicalDto>>,
    IRequestHandler<CreateRadicalCommand, RadicalDto>,
    IRequestHandler<UpdateRadicalCommand, RadicalDto>,
    IRequestHandler<DeleteRadicalCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public RadicalHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<RadicalSetDto>> Handle(QueryGetRadicalSets request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<RadicalSet>().Query();
        if (request.lessonId.HasValue) query = query.Where(x => x.LessonId == request.lessonId);
        var sets = await query.OrderBy(x => x.SetNumber).ToListAsync(cancellationToken);
        return _mapper.Map<List<RadicalSetDto>>(sets);
    }

    public async Task<RadicalSetDto> Handle(CreateRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = _mapper.Map<RadicalSet>(request);
        set.Id = Guid.NewGuid();
        _uow.Repository<RadicalSet>().Add(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalSetDto>(set);
    }

    public async Task<RadicalSetDto> Handle(UpdateRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = await _uow.Repository<RadicalSet>().GetByIdAsync(request.Id);
        if (set == null) return null;
        _mapper.Map(request, set);
        _uow.Repository<RadicalSet>().Update(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalSetDto>(set);
    }

    public async Task<bool> Handle(DeleteRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = await _uow.Repository<RadicalSet>().GetByIdAsync(request.Id);
        if (set == null) return false;
        _uow.Repository<RadicalSet>().Delete(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<List<RadicalDto>> Handle(QueryGetRadicals request, CancellationToken cancellationToken)
    {
        var radicals = await _uow.Repository<Radical>().Query().Where(x => x.SetId == request.setId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<RadicalDto>>(radicals);
    }

    public async Task<RadicalDto> Handle(CreateRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = _mapper.Map<Radical>(request);
        radical.Id = Guid.NewGuid();
        _uow.Repository<Radical>().Add(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalDto>(radical);
    }

    public async Task<RadicalDto> Handle(UpdateRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = await _uow.Repository<Radical>().GetByIdAsync(request.Id);
        if (radical == null) return null;
        _mapper.Map(request, radical);
        _uow.Repository<Radical>().Update(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalDto>(radical);
    }

    public async Task<bool> Handle(DeleteRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = await _uow.Repository<Radical>().GetByIdAsync(request.Id);
        if (radical == null) return false;
        _uow.Repository<Radical>().Delete(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
