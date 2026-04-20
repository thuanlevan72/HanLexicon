using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.DTOs.docsData
{
    public class DocumentCategoryResponseDto
    {
        public string? Link { get; set; }        // Map từ: lessons.filename
        public string? Icon { get; set; }        // Map từ: lessons.icon
        public string? Title { get; set; }       // Map từ: lessons.title_cn
        public string? Translation { get; set; } // Map từ: lessons.title_vn
        public string? Desc { get; set; }        // Map từ: lessons.description
        public string? Badge { get; set; }       // Map từ: lessons.badge (Có thể null)
    }
}
