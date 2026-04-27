using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.VocabulariesAdmin
{
    public record QueryGetVocabulariesAdmin(
        string? Search = null, 
        short? CategoryId = null,
        Guid? LessonId = null,
        bool? MissingAudio = null,
        bool? MissingImage = null,
        int Page = 1, 
        int PageSize = 10) : IRequest<PagedResult<VocabularyDto>>;

    public class GetVocabulariesAdminHandler : IRequestHandler<QueryGetVocabulariesAdmin, PagedResult<VocabularyDto>>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public GetVocabulariesAdminHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<PagedResult<VocabularyDto>> Handle(QueryGetVocabulariesAdmin request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<Vocabulary>().Query()
                .Include(v => v.Lesson)
                .AsNoTracking();

            // 1. Lọc theo Search (Word, Pinyin, Meaning)
            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(v => v.Word.Contains(request.Search) || v.Pinyin.Contains(request.Search) || v.Meaning.Contains(request.Search));
            }

            // 2. Lọc theo Category
            if (request.CategoryId.HasValue)
            {
                query = query.Where(v => v.Lesson.CategoryId == request.CategoryId.Value);
            }

            // 3. Lọc theo Lesson
            if (request.LessonId.HasValue)
            {
                query = query.Where(v => v.LessonId == request.LessonId.Value);
            }

            // 4. Lọc theo Media thiếu
            if (request.MissingAudio == true)
            {
                query = query.Where(v => string.IsNullOrEmpty(v.AudioUrl));
            }
            if (request.MissingImage == true)
            {
                query = query.Where(v => string.IsNullOrEmpty(v.ImageUrl));
            }

            var totalItems = await query.CountAsync(cancellationToken);
            var items = await query
                .OrderByDescending(v => v.CreatedAt)
                .ThenBy(v => v.SortOrder)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<VocabularyDto>
            {
                Items = _mapper.Map<List<VocabularyDto>>(items),
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize),
                CurrentPage = request.Page
            };
        }
    }
}
