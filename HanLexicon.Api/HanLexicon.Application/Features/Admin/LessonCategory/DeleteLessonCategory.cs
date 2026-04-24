using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonCategory;

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
        var category = await _uow.Repository<Infrastructure.Postgres.LessonCategory>().GetByIdAsync(request.Id);
        if (category == null) return false;

        _uow.Repository<Infrastructure.Postgres.LessonCategory>().Delete(category);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
