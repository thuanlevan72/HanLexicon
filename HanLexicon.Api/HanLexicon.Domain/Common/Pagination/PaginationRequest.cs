using HanLexicon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Domain.Common.Pagination
{
    public class PaginationRequest
    {
        const int maxPageSize = 50; // Gi?i h?n t?i da 50 record/trang

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10; // M?c d?nh là 10
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }

        public Dictionary<string, object>? DynamicFilters { get; set; }
        // Sau này có th? thêm:
        // public string? SearchTerm { get; set; }
        // public string? SortBy { get; set; }
    }
}
