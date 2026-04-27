using System;

namespace HanLexicon.Domain.Entities
{
    public class SystemLog
    {
        // Bảng 'logs' hiện tại không có cột ID, EF Core yêu cầu Key nên ta sẽ map Message + Timestamp làm key tạm thời 
        // hoặc tốt nhất là ta cấu hình HasNoKey trong Mapping.
        public string? Message { get; set; }
        public string? MessageTemplate { get; set; }
        public int Level { get; set; } // Map với kiểu integer trong DB
        public DateTime Timestamp { get; set; } // Map với timestamp without time zone
        public string? Exception { get; set; }
        public string? LogEvent { get; set; }
    }
}
