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

namespace HanLexicon.Application.Features.Admin.Documents;

public record QueryGetAdminDocuments(short? categoryId) : IRequest<List<AdminDocumentDto>>;
public record CreateDocumentCommand(short CategoryId, string Title, string? Description, string DownloadUrl, string DocType, short SortOrder, bool IsPublished) : IRequest<AdminDocumentDto>;
public record UpdateDocumentCommand(Guid Id, short CategoryId, string Title, string? Description, string DownloadUrl, string DocType, short SortOrder, bool IsPublished) : IRequest<AdminDocumentDto>;
public record DeleteDocumentCommand(Guid Id) : IRequest<bool>;

public class DocumentHandler : 
    IRequestHandler<QueryGetAdminDocuments, List<AdminDocumentDto>>,
    IRequestHandler<CreateDocumentCommand, AdminDocumentDto>,
    IRequestHandler<UpdateDocumentCommand, AdminDocumentDto>,
    IRequestHandler<DeleteDocumentCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public DocumentHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<AdminDocumentDto>> Handle(QueryGetAdminDocuments request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<Document>().Query();
        if (request.categoryId.HasValue) query = query.Where(x => x.CategoryId == request.categoryId);
        var docs = await query.OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<AdminDocumentDto>>(docs);
    }

    public async Task<AdminDocumentDto> Handle(CreateDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = _mapper.Map<Document>(request);
        doc.Id = Guid.NewGuid();
        doc.CreatedAt = DateTime.UtcNow;
        _uow.Repository<Document>().Add(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<AdminDocumentDto>(doc);
    }

    public async Task<AdminDocumentDto> Handle(UpdateDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = await _uow.Repository<Document>().GetByIdAsync(request.Id);
        if (doc == null) return null;
        _mapper.Map(request, doc);
        _uow.Repository<Document>().Update(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<AdminDocumentDto>(doc);
    }

    public async Task<bool> Handle(DeleteDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = await _uow.Repository<Document>().GetByIdAsync(request.Id);
        if (doc == null) return false;
        _uow.Repository<Document>().Delete(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
