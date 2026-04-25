using HanLexicon.Domain.Entities;
using Application.Interfaces;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.Quizzes;

public record QueryGetQuizQuestions(Guid lessonId) : IRequest<List<QuizQuestionDto>>;
public record CreateQuizQuestionCommand(Guid LessonId, short SortOrder, string Question, string Explanation, short Difficulty) : IRequest<QuizQuestionDto>;
public record UpdateQuizQuestionCommand(Guid Id, Guid LessonId, short SortOrder, string Question, string Explanation, short Difficulty) : IRequest<QuizQuestionDto>;
public record DeleteQuizQuestionCommand(Guid Id) : IRequest<bool>;

public record QueryGetQuizOptions(Guid questionId) : IRequest<List<QuizOptionDto>>;
public record CreateQuizOptionCommand(Guid QuestionId, short SortOrder, string OptionText, bool IsCorrect) : IRequest<QuizOptionDto>;
public record UpdateQuizOptionCommand(Guid Id, Guid QuestionId, short SortOrder, string OptionText, bool IsCorrect) : IRequest<QuizOptionDto>;
public record DeleteQuizOptionCommand(Guid Id) : IRequest<bool>;

public class QuizHandler : 
    IRequestHandler<QueryGetQuizQuestions, List<QuizQuestionDto>>,
    IRequestHandler<CreateQuizQuestionCommand, QuizQuestionDto>,
    IRequestHandler<UpdateQuizQuestionCommand, QuizQuestionDto>,
    IRequestHandler<DeleteQuizQuestionCommand, bool>,
    IRequestHandler<QueryGetQuizOptions, List<QuizOptionDto>>,
    IRequestHandler<CreateQuizOptionCommand, QuizOptionDto>,
    IRequestHandler<UpdateQuizOptionCommand, QuizOptionDto>,
    IRequestHandler<DeleteQuizOptionCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public QuizHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<QuizQuestionDto>> Handle(QueryGetQuizQuestions request, CancellationToken cancellationToken)
    {
        var questions = await _uow.Repository<QuizQuestion>().Query().Where(x => x.LessonId == request.lessonId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<QuizQuestionDto>>(questions);
    }

    public async Task<QuizQuestionDto> Handle(CreateQuizQuestionCommand request, CancellationToken cancellationToken)
    {
        var question = _mapper.Map<QuizQuestion>(request);
        question.Id = Guid.NewGuid();
        _uow.Repository<QuizQuestion>().Add(question);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<QuizQuestionDto>(question);
    }

    public async Task<QuizQuestionDto> Handle(UpdateQuizQuestionCommand request, CancellationToken cancellationToken)
    {
        var question = await _uow.Repository<QuizQuestion>().GetByIdAsync(request.Id);
        if (question == null) return null;
        _mapper.Map(request, question);
        _uow.Repository<QuizQuestion>().Update(question);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<QuizQuestionDto>(question);
    }

    public async Task<bool> Handle(DeleteQuizQuestionCommand request, CancellationToken cancellationToken)
    {
        var question = await _uow.Repository<QuizQuestion>().GetByIdAsync(request.Id);
        if (question == null) return false;
        _uow.Repository<QuizQuestion>().Delete(question);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<List<QuizOptionDto>> Handle(QueryGetQuizOptions request, CancellationToken cancellationToken)
    {
        var options = await _uow.Repository<QuizOption>().Query().Where(x => x.QuestionId == request.questionId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<QuizOptionDto>>(options);
    }

    public async Task<QuizOptionDto> Handle(CreateQuizOptionCommand request, CancellationToken cancellationToken)
    {
        var option = _mapper.Map<QuizOption>(request);
        option.Id = Guid.NewGuid();
        _uow.Repository<QuizOption>().Add(option);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<QuizOptionDto>(option);
    }

    public async Task<QuizOptionDto> Handle(UpdateQuizOptionCommand request, CancellationToken cancellationToken)
    {
        var option = await _uow.Repository<QuizOption>().GetByIdAsync(request.Id);
        if (option == null) return null;
        _mapper.Map(request, option);
        _uow.Repository<QuizOption>().Update(option);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<QuizOptionDto>(option);
    }

    public async Task<bool> Handle(DeleteQuizOptionCommand request, CancellationToken cancellationToken)
    {
        var option = await _uow.Repository<QuizOption>().GetByIdAsync(request.Id);
        if (option == null) return false;
        _uow.Repository<QuizOption>().Delete(option);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
