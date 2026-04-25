
namespace HanLexicon.Application.DTOs.gamesData
{
    public class GameCategoryResponseDto
    {
        public string? CategorySlug { get; set; } // Map t?: lesson_categories.slug (ví d?: "game-hsk1")
        public List<GameItemDto>? Items { get; set; } 
    }
}
