using HanLexicon.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using HanLexicon.Application.Features.Admin.HanziCards;
using HanLexicon.Application.Features.Admin.ChallengeWords;
using HanLexicon.Application.Features.Admin.Radicals;
using HanLexicon.Application.Features.Admin.Quizzes;
using HanLexicon.Application.Features.Admin.Documents;

namespace HanLexicon.Application.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LessonCategory, DTOs.Admin.LessonCategoryDto>().ReverseMap();
            CreateMap<Lesson, DTOs.Admin.LessonDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ReverseMap();
            CreateMap<Vocabulary, DTOs.Admin.VocabularyDto>()
                .ForMember(dest => dest.LessonTitle, opt => opt.MapFrom(src => src.Lesson.TitleVn))
                .ReverseMap();

            CreateMap<HanziCard, DTOs.Admin.HanziCardDto>().ReverseMap();
            CreateMap<CreateHanziCardCommand, HanziCard>();
            CreateMap<UpdateHanziCardCommand, HanziCard>();

            CreateMap<ChallengeWord, DTOs.Admin.ChallengeWordDto>().ReverseMap();
            CreateMap<CreateChallengeWordCommand, ChallengeWord>();
            CreateMap<UpdateChallengeWordCommand, ChallengeWord>();

            CreateMap<RadicalSet, DTOs.Admin.RadicalSetDto>().ReverseMap();
            CreateMap<CreateRadicalSetCommand, RadicalSet>();
            CreateMap<UpdateRadicalSetCommand, RadicalSet>();

            CreateMap<Radical, DTOs.Admin.RadicalDto>()
                .ForMember(dest => dest.Radical, opt => opt.MapFrom(src => src.Radical1))
                .ReverseMap();
            CreateMap<CreateRadicalCommand, Radical>()
                .ForMember(dest => dest.Radical1, opt => opt.MapFrom(src => src.Radical));
            CreateMap<UpdateRadicalCommand, Radical>()
                .ForMember(dest => dest.Radical1, opt => opt.MapFrom(src => src.Radical));

            CreateMap<QuizQuestion, DTOs.Admin.QuizQuestionDto>().ReverseMap();
            CreateMap<CreateQuizQuestionCommand, QuizQuestion>();
            CreateMap<UpdateQuizQuestionCommand, QuizQuestion>();

            CreateMap<QuizOption, DTOs.Admin.QuizOptionDto>().ReverseMap();
            CreateMap<CreateQuizOptionCommand, QuizOption>();
            CreateMap<UpdateQuizOptionCommand, QuizOption>();

            CreateMap<Document, DTOs.Admin.AdminDocumentDto>().ReverseMap();
            CreateMap<CreateDocumentCommand, Document>();
            CreateMap<UpdateDocumentCommand, Document>();
        }
    }
}
