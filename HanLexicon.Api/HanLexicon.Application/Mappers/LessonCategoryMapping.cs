using HanLexicon.Application.DTOs.LessonCategory;
using HanLexicon.Application.Features.LessonCategories.Commands;
using Infrastructure.Postgres;

namespace HanLexicon.Application.Mappers
{
    /// <summary>
    /// Lesson Category Mapping class for converting between LessonCategory entity and LessonCategoryDto.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    public static class LessonCategoryMapping
    {
        /// <summary>
        /// Method to convert LessonCategory entity to LessonCategoryDto.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static LessonCategoryDto ToDto(this LessonCategory entity)
        {
            return new LessonCategoryDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Slug = entity.Slug,
                SortOrder = entity.SortOrder
            };
        }

        /// <summary>
        /// Mapping method to convert LessonCategoryCreateCommand to LessonCategoryCreateDto.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static LessonCategoryCreateDto ToCreateRequest(this LessonCategoryCreateCommand dto)
        {
            return new LessonCategoryCreateDto
            {
                Name = dto.Name
            };
        }
    }
}
