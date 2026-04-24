using HanLexicon.Application.DTOs;
using HanLexicon.Application.DTOs.LessonCategory;
using MediatR;

namespace HanLexicon.Application.Features.LessonCategories.Commands
{
    /// <summary>
    /// LessonCategoryCreateCommand is a MediatR request class that represents the command to create a new lesson category. It contains the necessary properties for creating a lesson category, such as the name of the category. The command will be handled by a corresponding handler that implements the logic for creating a lesson category and returning the result as an ApiResponse containing a LessonCategoryDto.
    /// Author: QuanTM
    /// Created date: 2026-04-24
    /// Last modified date: 2026-04-24
    /// </summary>
    public record LessonCategoryCreateCommand : IRequest<ApiResponse<LessonCategoryDto>>
    {
        /// <summary>
        /// Property representing the name of the lesson category to be created. This property is required and will be used by the handler to create a new lesson category in the system.
        /// </summary>
        public string Name { get; set; } = null!;
    }
}
