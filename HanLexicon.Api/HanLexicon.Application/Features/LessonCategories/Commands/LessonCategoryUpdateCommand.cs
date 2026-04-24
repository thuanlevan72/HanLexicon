using HanLexicon.Application.DTOs;
using HanLexicon.Application.DTOs.LessonCategory;
using MediatR;

namespace HanLexicon.Application.Features.LessonCategories.Commands
{
    /// <summary>
    /// LessonCategoryUpdateCommand is a MediatR request class that represents the command to update an existing lesson category. It contains the necessary properties for updating a lesson category, such as the ID of the category to be updated and the new name for the category. The command will be handled by a corresponding handler that implements the logic for updating a lesson category and returning the result as an ApiResponse containing a LessonCategoryDto.
    /// Author: QuanTM
    /// Created date: 2026-04-24
    /// Last modified date: 2026-04-24
    /// </summary>
    public record LessonCategoryUpdateCommand : IRequest<ApiResponse<LessonCategoryDto>>
    {
        /// <summary>
        /// Id property representing the unique identifier of the lesson category to be updated. This property is required and will be used by the handler to identify which lesson category needs to be updated in the system.
        /// </summary>
        public short Id { get; set; }

        /// <summary>
        /// Name property representing the new name of the lesson category to be updated. This property is required and will be used by the handler to update the name of the specified lesson category in the system.
        /// </summary>
        public string Name { get; set; } = null!;
    }
}
