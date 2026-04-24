using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonCategory;

public record CreateLessonCategoryCommand(string Name, string Slug, short SortOrder) : IRequest<LessonCategoryDto>;

public class CreateLessonCategoryHandler : IRequestHandler<CreateLessonCategoryCommand, LessonCategoryDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public CreateLessonCategoryHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<LessonCategoryDto> Handle(CreateLessonCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = new Infrastructure.Postgres.LessonCategory
        {
            Name = request.Name,
            Slug = request.Slug,
            SortOrder = request.SortOrder
        };

        _uow.Repository<Infrastructure.Postgres.LessonCategory>().Add(category);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<LessonCategoryDto>(category);
    }
}
