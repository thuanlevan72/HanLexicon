using Application.Interfaces;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.Admin.Content;

#region HanziCard
public record QueryGetHanziCards(Guid lessonId) : IRequest<List<HanziCardDto>>;
public record CreateHanziCardCommand(Guid LessonId, string Character, string Pinyin, string Meaning, string? Mnemonic, short? StrokeCount, string? Radical, short SortOrder) : IRequest<HanziCardDto>;
public record UpdateHanziCardCommand(Guid Id, Guid LessonId, string Character, string Pinyin, string Meaning, string? Mnemonic, short? StrokeCount, string? Radical, short SortOrder) : IRequest<HanziCardDto>;
public record DeleteHanziCardCommand(Guid Id) : IRequest<bool>;

public class HanziCardHandler : 
    IRequestHandler<QueryGetHanziCards, List<HanziCardDto>>,
    IRequestHandler<CreateHanziCardCommand, HanziCardDto>,
    IRequestHandler<UpdateHanziCardCommand, HanziCardDto>,
    IRequestHandler<DeleteHanziCardCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public HanziCardHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<HanziCardDto>> Handle(QueryGetHanziCards request, CancellationToken cancellationToken)
    {
        var cards = await _uow.Repository<HanziCard>().Query().Where(x => x.LessonId == request.lessonId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<HanziCardDto>>(cards);
    }

    public async Task<HanziCardDto> Handle(CreateHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = _mapper.Map<HanziCard>(request);
        card.Id = Guid.NewGuid();
        _uow.Repository<HanziCard>().Add(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<HanziCardDto>(card);
    }

    public async Task<HanziCardDto> Handle(UpdateHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _uow.Repository<HanziCard>().GetByIdAsync(request.Id);
        if (card == null) return null;
        _mapper.Map(request, card);
        _uow.Repository<HanziCard>().Update(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<HanziCardDto>(card);
    }

    public async Task<bool> Handle(DeleteHanziCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _uow.Repository<HanziCard>().GetByIdAsync(request.Id);
        if (card == null) return false;
        _uow.Repository<HanziCard>().Delete(card);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
#endregion

#region ChallengeWord
public record QueryGetChallengeWords(Guid lessonId) : IRequest<List<ChallengeWordDto>>;
public record CreateChallengeWordCommand(Guid LessonId, string Word, string Pinyin, string Meaning, short SortOrder) : IRequest<ChallengeWordDto>;
public record UpdateChallengeWordCommand(Guid Id, Guid LessonId, string Word, string Pinyin, string Meaning, short SortOrder) : IRequest<ChallengeWordDto>;
public record DeleteChallengeWordCommand(Guid Id) : IRequest<bool>;

public class ChallengeWordHandler : 
    IRequestHandler<QueryGetChallengeWords, List<ChallengeWordDto>>,
    IRequestHandler<CreateChallengeWordCommand, ChallengeWordDto>,
    IRequestHandler<UpdateChallengeWordCommand, ChallengeWordDto>,
    IRequestHandler<DeleteChallengeWordCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public ChallengeWordHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<ChallengeWordDto>> Handle(QueryGetChallengeWords request, CancellationToken cancellationToken)
    {
        var words = await _uow.Repository<ChallengeWord>().Query().Where(x => x.LessonId == request.lessonId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<ChallengeWordDto>>(words);
    }

    public async Task<ChallengeWordDto> Handle(CreateChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = _mapper.Map<ChallengeWord>(request);
        word.Id = Guid.NewGuid();
        _uow.Repository<ChallengeWord>().Add(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ChallengeWordDto>(word);
    }

    public async Task<ChallengeWordDto> Handle(UpdateChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = await _uow.Repository<ChallengeWord>().GetByIdAsync(request.Id);
        if (word == null) return null;
        _mapper.Map(request, word);
        _uow.Repository<ChallengeWord>().Update(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<ChallengeWordDto>(word);
    }

    public async Task<bool> Handle(DeleteChallengeWordCommand request, CancellationToken cancellationToken)
    {
        var word = await _uow.Repository<ChallengeWord>().GetByIdAsync(request.Id);
        if (word == null) return false;
        _uow.Repository<ChallengeWord>().Delete(word);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
#endregion

#region Radical
public record QueryGetRadicalSets(Guid? lessonId) : IRequest<List<RadicalSetDto>>;
public record CreateRadicalSetCommand(Guid? LessonId, short SetNumber, string Title, string Icon) : IRequest<RadicalSetDto>;
public record UpdateRadicalSetCommand(Guid Id, Guid? LessonId, short SetNumber, string Title, string Icon) : IRequest<RadicalSetDto>;
public record DeleteRadicalSetCommand(Guid Id) : IRequest<bool>;

public record QueryGetRadicals(Guid setId) : IRequest<List<RadicalDto>>;
public record CreateRadicalCommand(Guid SetId, short SortOrder, string Radical, string Name, string? Meaning, string? ExampleChars) : IRequest<RadicalDto>;
public record UpdateRadicalCommand(Guid Id, Guid SetId, short SortOrder, string Radical, string Name, string? Meaning, string? ExampleChars) : IRequest<RadicalDto>;
public record DeleteRadicalCommand(Guid Id) : IRequest<bool>;

public class RadicalHandler : 
    IRequestHandler<QueryGetRadicalSets, List<RadicalSetDto>>,
    IRequestHandler<CreateRadicalSetCommand, RadicalSetDto>,
    IRequestHandler<UpdateRadicalSetCommand, RadicalSetDto>,
    IRequestHandler<DeleteRadicalSetCommand, bool>,
    IRequestHandler<QueryGetRadicals, List<RadicalDto>>,
    IRequestHandler<CreateRadicalCommand, RadicalDto>,
    IRequestHandler<UpdateRadicalCommand, RadicalDto>,
    IRequestHandler<DeleteRadicalCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public RadicalHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<RadicalSetDto>> Handle(QueryGetRadicalSets request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<RadicalSet>().Query();
        if (request.lessonId.HasValue) query = query.Where(x => x.LessonId == request.lessonId);
        var sets = await query.OrderBy(x => x.SetNumber).ToListAsync(cancellationToken);
        return _mapper.Map<List<RadicalSetDto>>(sets);
    }

    public async Task<RadicalSetDto> Handle(CreateRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = _mapper.Map<RadicalSet>(request);
        set.Id = Guid.NewGuid();
        _uow.Repository<RadicalSet>().Add(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalSetDto>(set);
    }

    public async Task<RadicalSetDto> Handle(UpdateRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = await _uow.Repository<RadicalSet>().GetByIdAsync(request.Id);
        if (set == null) return null;
        _mapper.Map(request, set);
        _uow.Repository<RadicalSet>().Update(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalSetDto>(set);
    }

    public async Task<bool> Handle(DeleteRadicalSetCommand request, CancellationToken cancellationToken)
    {
        var set = await _uow.Repository<RadicalSet>().GetByIdAsync(request.Id);
        if (set == null) return false;
        _uow.Repository<RadicalSet>().Delete(set);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<List<RadicalDto>> Handle(QueryGetRadicals request, CancellationToken cancellationToken)
    {
        var radicals = await _uow.Repository<Radical>().Query().Where(x => x.SetId == request.setId).OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<RadicalDto>>(radicals);
    }

    public async Task<RadicalDto> Handle(CreateRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = _mapper.Map<Radical>(request);
        radical.Id = Guid.NewGuid();
        _uow.Repository<Radical>().Add(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalDto>(radical);
    }

    public async Task<RadicalDto> Handle(UpdateRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = await _uow.Repository<Radical>().GetByIdAsync(request.Id);
        if (radical == null) return null;
        _mapper.Map(request, radical);
        _uow.Repository<Radical>().Update(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<RadicalDto>(radical);
    }

    public async Task<bool> Handle(DeleteRadicalCommand request, CancellationToken cancellationToken)
    {
        var radical = await _uow.Repository<Radical>().GetByIdAsync(request.Id);
        if (radical == null) return false;
        _uow.Repository<Radical>().Delete(radical);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
#endregion

#region Quiz
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
#endregion

#region Document
public record QueryGetAdminDocuments(short? categoryId) : IRequest<List<AdminDocumentDto>>;
public record CreateDocumentCommand(short CategoryId, string Title, string? Description, string DownloadUrl, string DocType, short SortOrder, bool IsPublished) : IRequest<AdminDocumentDto>;
public record UpdateDocumentCommand(Guid Id, short CategoryId, string Title, string? Description, string DownloadUrl, string DocType, short SortOrder, bool IsPublished) : IRequest<AdminDocumentDto>;
public record DeleteDocumentCommand(Guid Id) : IRequest<bool>;

public class DocumentHandler : 
    IRequestHandler<QueryGetAdminDocuments, List<AdminDocumentDto>>,
    IRequestHandler<CreateDocumentCommand, AdminDocumentDto>,
    IRequestHandler<UpdateDocumentCommand, AdminDocumentDto>,
    IRequestHandler<DeleteDocumentCommand, bool>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public DocumentHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<AdminDocumentDto>> Handle(QueryGetAdminDocuments request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<Document>().Query();
        if (request.categoryId.HasValue) query = query.Where(x => x.CategoryId == request.categoryId);
        var docs = await query.OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
        return _mapper.Map<List<AdminDocumentDto>>(docs);
    }

    public async Task<AdminDocumentDto> Handle(CreateDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = _mapper.Map<Document>(request);
        doc.Id = Guid.NewGuid();
        doc.CreatedAt = DateTime.UtcNow;
        _uow.Repository<Document>().Add(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<AdminDocumentDto>(doc);
    }

    public async Task<AdminDocumentDto> Handle(UpdateDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = await _uow.Repository<Document>().GetByIdAsync(request.Id);
        if (doc == null) return null;
        _mapper.Map(request, doc);
        _uow.Repository<Document>().Update(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return _mapper.Map<AdminDocumentDto>(doc);
    }

    public async Task<bool> Handle(DeleteDocumentCommand request, CancellationToken cancellationToken)
    {
        var doc = await _uow.Repository<Document>().GetByIdAsync(request.Id);
        if (doc == null) return false;
        _uow.Repository<Document>().Delete(doc);
        await _uow.SaveChangesAsync(cancellationToken);
        return true;
    }
}
#endregion
