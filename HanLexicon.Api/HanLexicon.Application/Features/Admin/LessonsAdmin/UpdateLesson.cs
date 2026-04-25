using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;

namespace HanLexicon.Application.Features.Admin.LessonsAdmin;

public record UpdateLessonCommand(
    Guid Id,
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

public class UpdateLessonHandler : IRequestHandler<UpdateLessonCommand, LessonDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public UpdateLessonHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<LessonDto> Handle(UpdateLessonCommand request, CancellationToken cancellationToken)
    {
        var lesson = await _uow.Repository<Lesson>().GetByIdAsync(request.Id);
        if (lesson == null) throw new Exception("Lesson not found");

        lesson.CategoryId = request.CategoryId;
        lesson.LessonNumber = request.LessonNumber;
        lesson.Filename = request.Filename;
        lesson.TitleCn = request.TitleCn;
        lesson.TitleVn = request.TitleVn;
        lesson.Icon = request.Icon;
        lesson.Description = request.Description;
        lesson.Badge = request.Badge;
        lesson.IsPublished = request.IsPublished;
        lesson.SortOrder = request.SortOrder;
        lesson.UpdatedAt = DateTime.UtcNow;

        _uow.Repository<Lesson>().Update(lesson);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<LessonDto>(lesson);
    }
}
