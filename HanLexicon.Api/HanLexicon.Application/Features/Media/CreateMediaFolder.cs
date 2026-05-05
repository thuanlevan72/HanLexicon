using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Media
{
    public record CreateMediaFolderCommand(string Name, string? Description = null) : IRequest<Guid>;

    public class CreateMediaFolderHandler : IRequestHandler<CreateMediaFolderCommand, Guid>
    {
        private readonly IUnitOfWork _uow;

        public CreateMediaFolderHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Guid> Handle(CreateMediaFolderCommand request, CancellationToken cancellationToken)
        {
            var folder = new MediaFolder
            {
                Id = Guid.NewGuid(),
                Name = request.Name.Trim().ToLower().Replace(" ", "-"),
                Description = request.Description,
                CreatedAt = DateTime.UtcNow
            };

            _uow.Repository<MediaFolder>().Add(folder);
            await _uow.SaveChangesAsync(cancellationToken);

            return folder.Id;
        }
    }
}
