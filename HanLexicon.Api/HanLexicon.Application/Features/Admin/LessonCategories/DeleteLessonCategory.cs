using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonCategories;

public record DeleteLessonCategoryCommand(short Id) : IRequest<bool>;

public class DeleteLessonCategoryHandler : IRequestHandler<DeleteLessonCategoryCommand, bool>
{
    private readonly IUnitOfWork _uow;

    public DeleteLessonCategoryHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<bool> Handle(DeleteLessonCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _uow.Repository<LessonCategory>().GetByIdAsync(request.Id);
        if (category == null) return false;

        _uow.Repository<LessonCategory>().Delete(category);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
