
namespace HanLexicon.Application.DTOs.gamesData
{
    public class GameCategoryResponseDto
    {
        public string? CategorySlug { get; set; } // Map từ: lesson_categories.slug (ví dụ: "game-hsk1")
        public List<GameItemDto>? Items { get; set; } 
    }
}
