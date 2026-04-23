namespace HanLexicon.Application.DTOs.LessonCategory
{
    /// <summary>
    /// Class LessonCategoryDto represents the data transfer object for a lesson category in the application.
    /// Author: QuanTM
    /// Created date: 2026/04/23
    /// Last modified date: 2026/04/23
    /// </summary>
    public record LessonCategoryDto
    {
        /// <summary>
        /// Id of the lesson category, represented as a short integer. This serves as a unique identifier for each category.
        /// </summary>
        public short Id { get; set; }

        /// <summary>
        /// Slug is a URL-friendly string that uniquely identifies the lesson category. It is typically used in routing and should be unique across all categories.
        /// </summary>
        public string Slug { get; set; } = null!;

        /// <summary>
        /// Name of the lesson category, which is a human-readable string that describes the category. This is what users will see when browsing categories.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// SortOrder is a short integer that determines the display order of the lesson categories. Categories with lower SortOrder values will be displayed before those with higher values. This allows for custom ordering of categories in the user interface.
        /// </summary>
        public short SortOrder { get; set; }
    }
}
