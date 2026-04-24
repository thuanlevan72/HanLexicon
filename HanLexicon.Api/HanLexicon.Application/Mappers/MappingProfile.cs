using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Infrastructure.Postgres.LessonCategory, DTOs.Admin.LessonCategoryDto>().ReverseMap();
            CreateMap<Infrastructure.Postgres.Lesson, DTOs.Admin.LessonDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ReverseMap();
            CreateMap<Infrastructure.Postgres.Vocabulary, DTOs.Admin.VocabularyDto>()
                .ForMember(dest => dest.LessonTitle, opt => opt.MapFrom(src => src.Lesson.TitleVn))
                .ReverseMap();

            CreateMap<Infrastructure.Postgres.HanziCard, DTOs.Admin.HanziCardDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateHanziCardCommand, Infrastructure.Postgres.HanziCard>();
            CreateMap<Features.Admin.Content.UpdateHanziCardCommand, Infrastructure.Postgres.HanziCard>();

            CreateMap<Infrastructure.Postgres.ChallengeWord, DTOs.Admin.ChallengeWordDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateChallengeWordCommand, Infrastructure.Postgres.ChallengeWord>();
            CreateMap<Features.Admin.Content.UpdateChallengeWordCommand, Infrastructure.Postgres.ChallengeWord>();

            CreateMap<Infrastructure.Postgres.RadicalSet, DTOs.Admin.RadicalSetDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateRadicalSetCommand, Infrastructure.Postgres.RadicalSet>();
            CreateMap<Features.Admin.Content.UpdateRadicalSetCommand, Infrastructure.Postgres.RadicalSet>();

            CreateMap<Infrastructure.Postgres.Radical, DTOs.Admin.RadicalDto>()
                .ForMember(dest => dest.Radical, opt => opt.MapFrom(src => src.Radical1))
                .ReverseMap();
            CreateMap<Features.Admin.Content.CreateRadicalCommand, Infrastructure.Postgres.Radical>()
                .ForMember(dest => dest.Radical1, opt => opt.MapFrom(src => src.Radical));
            CreateMap<Features.Admin.Content.UpdateRadicalCommand, Infrastructure.Postgres.Radical>()
                .ForMember(dest => dest.Radical1, opt => opt.MapFrom(src => src.Radical));

            CreateMap<Infrastructure.Postgres.QuizQuestion, DTOs.Admin.QuizQuestionDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateQuizQuestionCommand, Infrastructure.Postgres.QuizQuestion>();
            CreateMap<Features.Admin.Content.UpdateQuizQuestionCommand, Infrastructure.Postgres.QuizQuestion>();

            CreateMap<Infrastructure.Postgres.QuizOption, DTOs.Admin.QuizOptionDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateQuizOptionCommand, Infrastructure.Postgres.QuizOption>();
            CreateMap<Features.Admin.Content.UpdateQuizOptionCommand, Infrastructure.Postgres.QuizOption>();

            CreateMap<Infrastructure.Postgres.Document, DTOs.Admin.AdminDocumentDto>().ReverseMap();
            CreateMap<Features.Admin.Content.CreateDocumentCommand, Infrastructure.Postgres.Document>();
            CreateMap<Features.Admin.Content.UpdateDocumentCommand, Infrastructure.Postgres.Document>();
        }
    }
}
