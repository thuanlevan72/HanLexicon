using HanLexicon.Application.DTOs;
using HanLexicon.Application.DTOs.LessonCategory;
using HanLexicon.Domain.Common.Pagination;

namespace HanLexicon.Application.Interfaces
{
    /// <summary>
    /// Interface for managing lesson categories, including CRUD operations and retrieval of category information.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    public interface ILessonCategoryService
    {
        /// <summary>
        /// Creates a new lesson category based on the provided request data and returns the created category information.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResponse<LessonCategoryDto>> CreateAsync(LessonCategoryCreateDto request);

        /// <summary>
        /// Updates an existing lesson category based on the provided request data and returns the updated category information.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResponse<LessonCategoryDto>> UpdateAsync(LessonCategoryUpdateDto request);

        /// <summary>
        /// Deletes a lesson category identified by the provided ID and returns a boolean indicating the success of the operation.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DeleteAsync(short id);

        /// <summary>
        /// GetByIdAsync retrieves a lesson category by its unique identifier (ID) and returns the corresponding category information.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<LessonCategoryDto> GetByIdAsync(short id);

        /// <summary>
        /// GetAllAsync retrieves a paginated list of all lesson categories based on the provided pagination request, which may include page number, page size, and dynamic filters. The method returns a list of lesson category DTOs that match the specified criteria.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<List<LessonCategoryDto>> GetAllAsync(PaginationRequest request);
    }
}
