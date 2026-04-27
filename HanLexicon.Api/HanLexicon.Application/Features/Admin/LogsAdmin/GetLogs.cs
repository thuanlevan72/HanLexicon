using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.LogsAdmin
{
    public record QueryGetLogs(
        string? Level = null, 
        string? Search = null, 
        int Page = 1, 
        int PageSize = 50,
        DateTime? FromDate = null,
        DateTime? ToDate = null
    ) : IRequest<LogListResponse>;

    public class LogListResponse
    {
        public List<SystemLogDto> Items { get; set; } = new();
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }

    public class SystemLogDto
    {
        public int? Id { get; set; }
        public string? LogLevel { get; set; }
        public string? Message { get; set; }
        public string? Exception { get; set; }
        public string? LogEvent { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        
        // Extended properties extracted from LogEvent
        public string? RequestMethod { get; set; }
        public string? RequestPath { get; set; }
        public int? StatusCode { get; set; }
        public string? UserName { get; set; }
        public string? TraceId { get; set; }
    }

    public class GetLogsHandler : IRequestHandler<QueryGetLogs, LogListResponse>
    {
        private readonly IUnitOfWork _uow;
        public GetLogsHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<LogListResponse> Handle(QueryGetLogs request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<SystemLog>().Query().AsNoTracking();

            // 1. Filter by Level
            if (!string.IsNullOrEmpty(request.Level))
            {
                int levelValue = -1;
                switch (request.Level.ToLower())
                {
                    case "information": levelValue = 2; break;
                    case "warning": levelValue = 3; break;
                    case "error": levelValue = 4; break;
                    case "fatal": levelValue = 5; break;
                    case "debug": levelValue = 1; break;
                    case "verbose": levelValue = 0; break;
                }
                
                if (levelValue >= 0)
                {
                    query = query.Where(x => x.Level == levelValue);
                }
            }

            // 2. Filter by Time Range
            if (request.FromDate.HasValue)
            {
                var from = DateTime.SpecifyKind(request.FromDate.Value, DateTimeKind.Unspecified);
                query = query.Where(x => x.Timestamp >= from);
            }
            if (request.ToDate.HasValue)
            {
                var to = DateTime.SpecifyKind(request.ToDate.Value, DateTimeKind.Unspecified);
                query = query.Where(x => x.Timestamp <= to);
            }

            // 3. Filter by Search Text
            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(x => x.Message.Contains(request.Search) || (x.Exception != null && x.Exception.Contains(request.Search)));
            }

            var totalItems = await query.CountAsync(cancellationToken);
            var rawItems = await query
                .OrderByDescending(x => x.Timestamp)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            var items = rawItems.Select(x => {
                var dto = new SystemLogDto
                {
                    LogLevel = GetLevelString(x.Level),
                    Message = x.Message,
                    Exception = x.Exception,
                    LogEvent = x.LogEvent,
                    CreatedAt = x.Timestamp
                };

                // Parse LogEvent JSON to extract properties
                if (!string.IsNullOrEmpty(x.LogEvent))
                {
                    try 
                    {
                        using var doc = System.Text.Json.JsonDocument.Parse(x.LogEvent);
                        if (doc.RootElement.TryGetProperty("Properties", out var props))
                        {
                            if (props.TryGetProperty("RequestMethod", out var method)) dto.RequestMethod = method.GetString();
                            if (props.TryGetProperty("RequestPath", out var path)) dto.RequestPath = path.GetString();
                            if (props.TryGetProperty("StatusCode", out var status)) dto.StatusCode = status.GetInt32();
                            if (props.TryGetProperty("UserName", out var user)) dto.UserName = user.GetString();
                            if (props.TryGetProperty("TraceId", out var trace)) dto.TraceId = trace.GetString();
                        }
                    }
                    catch { /* Ignore parse errors */ }
                }

                return dto;
            }).ToList();

            return new LogListResponse
            {
                Items = items,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize)
            };
        }

        private string GetLevelString(int level)
        {
            return level switch
            {
                0 => "Verbose",
                1 => "Debug",
                2 => "Information",
                3 => "Warning",
                4 => "Error",
                5 => "Fatal",
                _ => "Unknown"
            };
        }
    }
}
