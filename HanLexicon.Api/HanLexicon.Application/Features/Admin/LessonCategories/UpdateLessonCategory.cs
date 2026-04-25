using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonCategories;

public record UpdateLessonCategoryCommand(short Id, string Name, string Slug, short SortOrder) : IRequest<LessonCategoryDto>;

public class UpdateLessonCategoryHandler : IRequestHandler<UpdateLessonCategoryCommand, LessonCategoryDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public UpdateLessonCategoryHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<LessonCategoryDto> Handle(UpdateLessonCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _uow.Repository<LessonCategory>().GetByIdAsync(request.Id);
        if (category == null) throw new Exception("Category not found");

        category.Name = request.Name;
        category.Slug = request.Slug;
        category.SortOrder = request.SortOrder;

        _uow.Repository<LessonCategory>().Update(category);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<LessonCategoryDto>(category);
    }
}
