using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonsAdmin;

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
        var lesson = await _uow.Repository<Lesson>().GetByIdAsync(request.Id);
        if (lesson == null) return false;

        _uow.Repository<Lesson>().Delete(lesson);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
