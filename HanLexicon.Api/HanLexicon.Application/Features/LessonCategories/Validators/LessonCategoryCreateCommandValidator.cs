using FluentValidation;
using HanLexicon.Application.Features.LessonCategories.Commands;

namespace HanLexicon.Application.Features.LessonCategories.Validators
{
    /// <summary>
    /// LessonCategoryCreateCommandValidator is a FluentValidation validator class that defines the validation rules for the LessonCategoryCreateCommand. It ensures that the Name property of the command is not empty and does not exceed 100 characters in length. If the validation rules are not met, appropriate error messages will be provided to indicate the specific validation failures. This class is part of the application layer and is responsible for validating the input data for creating a new lesson category before it is processed by the corresponding handler.
    /// Author: QuanTM
    /// Created date: 2026-04-24
    /// Last modified date: 2026-04-24
    /// </summary>
    public class LessonCategoryCreateCommandValidator : AbstractValidator<LessonCategoryCreateCommand>
    {
        /// <summary>
        /// Constructor for the LessonCategoryCreateCommandValidator class, which defines the validation rules for the LessonCategoryCreateCommand. This validator ensures that the Name property of the command is not empty and does not exceed 100 characters in length. If the validation rules are not met, appropriate error messages will be provided to indicate the specific validation failures. This class is part of the application layer and is responsible for validating the input data for creating a new lesson category before it is processed by the corresponding handler.
        /// </summary>
        public LessonCategoryCreateCommandValidator() 
        { 
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên danh mục bài học không được để trống.")
                .MaximumLength(100)
                .WithMessage("Tên danh mục bài học không được vượt quá 100 ký tự.");
        }
    }
}
