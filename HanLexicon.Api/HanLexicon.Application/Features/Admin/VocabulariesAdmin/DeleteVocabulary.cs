using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.VocabulariesAdmin;

public record DeleteVocabularyCommand(Guid Id) : IRequest<bool>;

public class DeleteVocabularyHandler : IRequestHandler<DeleteVocabularyCommand, bool>
{
    private readonly IUnitOfWork _uow;

    public DeleteVocabularyHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<bool> Handle(DeleteVocabularyCommand request, CancellationToken cancellationToken)
    {
        var vocabulary = await _uow.Repository<Vocabulary>().GetByIdAsync(request.Id);
        if (vocabulary == null) return false;

        _uow.Repository<Vocabulary>().Delete(vocabulary);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
