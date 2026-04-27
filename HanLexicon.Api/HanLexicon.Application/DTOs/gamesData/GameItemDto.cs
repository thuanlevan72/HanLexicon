using HanLexicon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.DTOs.gamesData
{
    public class GameItemDto
    {
        public Guid Id { get; set; }
        public string? Link { get; set; }        // Map t?: lessons.filename
        public string? Icon { get; set; }        // Map t?: lessons.icon
        public string? Title { get; set; }       // Map t?: lessons.title_cn
        public string? Translation { get; set; } // Map t?: lessons.title_vn
        public string? Desc { get; set; }        // Map t?: lessons.description
        public string? Badge { get; set; }       // Map t?: lessons.badge (C th? null)
        public short? Score { get; set; }        // Điểm số gần nhất/cao nhất của người dùng
        }
}
