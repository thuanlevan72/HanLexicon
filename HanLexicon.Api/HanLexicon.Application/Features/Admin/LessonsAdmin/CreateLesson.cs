using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonsAdmin;

public record CreateLessonCommand(
    short CategoryId,
    short? LessonNumber,
    string Filename,
    string? TitleCn,
    string? TitleVn,
    string Icon,
    string? Description,
    string? Badge,
    bool IsPublished,
    short SortOrder
) : IRequest<LessonDto>;

public class CreateLessonHandler : IRequestHandler<CreateLessonCommand, LessonDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public CreateLessonHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<LessonDto> Handle(CreateLessonCommand request, CancellationToken cancellationToken)
    {
        var lesson = new Lesson
        {
            Id = Guid.NewGuid(),
            CategoryId = request.CategoryId,
            LessonNumber = request.LessonNumber,
            Filename = request.Filename,
            TitleCn = request.TitleCn,
            TitleVn = request.TitleVn,
            Icon = request.Icon,
            Description = request.Description,
            Badge = request.Badge,
            IsPublished = request.IsPublished,
            SortOrder = request.SortOrder,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _uow.Repository<Lesson>().Add(lesson);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<LessonDto>(lesson);
    }
}
