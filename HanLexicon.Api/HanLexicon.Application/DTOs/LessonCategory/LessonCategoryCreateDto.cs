namespace HanLexicon.Application.DTOs.LessonCategory
{
    /// <summary>
    /// LessonCategoryCreateDto is a Data Transfer Object (DTO) used for creating a new lesson category in the application. It contains the necessary properties that define a lesson category, such as Slug, Name, and SortOrder. This DTO is typically used in API endpoints or service methods that handle the creation of lesson categories, allowing for a clear and structured way to pass data from the client to the server.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    public class LessonCategoryCreateDto
    {
        /// <summary>
        /// Slug is a URL-friendly string that uniquely identifies the lesson category. It is typically used in routing and should be unique across all categories.
        /// </summary>
        public string Slug { get; set; } = null!;

        /// <summary>
        /// Name of the lesson category, which is a human-readable string that describes the category. This is what users will see when browsing categories.
        /// </summary>
        public string Name { get; set; } = null!;
    }

    /// <summary>
    /// LessonCategoryUpdateDto is a Data Transfer Object (DTO) used for updating an existing lesson category in the application. It inherits from LessonCategoryCreateDto, which means it includes all the properties necessary for creating a lesson category (Slug, Name, SortOrder) and adds an additional property, Id, which is required to identify which category is being updated. This DTO is typically used in API endpoints or service methods that handle the updating of lesson categories, allowing for a clear and structured way to pass data from the client to the server when modifying existing categories.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    public class LessonCategoryUpdateDto : LessonCategoryCreateDto
    {
        /// <summary>
        /// Id is the unique identifier of the lesson category that is being updated. It is required to specify which category to update.
        /// </summary>
        public short Id { get; set; }
    }
}
