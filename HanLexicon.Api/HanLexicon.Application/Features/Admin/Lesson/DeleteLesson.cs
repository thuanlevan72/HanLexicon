using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.Lesson;

public record DeleteLessonCommand(Guid Id) : IRequest<bool>;

public class DeleteLessonHandler : IRequestHandler<DeleteLessonCommand, bool>
{
    private readonly IUnitOfWork _uow;

    public DeleteLessonHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<bool> Handle(DeleteLessonCommand request, CancellationToken cancellationToken)
    {
        var lesson = await _uow.Repository<Infrastructure.Postgres.Lesson>().GetByIdAsync(request.Id);
        if (lesson == null) return false;

        _uow.Repository<Infrastructure.Postgres.Lesson>().Delete(lesson);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
