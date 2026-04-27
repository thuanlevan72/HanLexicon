using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

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

        // KIỂM TRA RÀNG BUỘC: Nếu còn dữ liệu liên quan thì không cho xóa
        var hasVocab = await _uow.Repository<Vocabulary>().Query().AnyAsync(v => v.LessonId == request.Id, cancellationToken);
        var hasHanzi = await _uow.Repository<HanziCard>().Query().AnyAsync(h => h.LessonId == request.Id, cancellationToken);
        var hasQuiz = await _uow.Repository<QuizQuestion>().Query().AnyAsync(q => q.LessonId == request.Id, cancellationToken);

        if (hasVocab || hasHanzi || hasQuiz)
        {
            throw new Exception("Không thể xóa bài học vì vẫn còn Từ vựng, Chữ Hán hoặc Câu hỏi Quiz liên quan.");
        }

        _uow.Repository<Lesson>().Delete(lesson);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
