using HanLexicon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HanLexicon.Application.Common
{
    public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; }
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
        public List<string> Errors { get; set; }

        public ApiResponse()
        {
            Errors = new List<string>();
        }

        public static ApiResponse<T> Success(T? data, string? message = null, int statusCode = 200)
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                StatusCode = statusCode,
                Message = message ?? "Success",
                Data = data
            };
        }

        public static ApiResponse<T> Failure(IEnumerable<string> errors, string? message = null, int statusCode = 400)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                StatusCode = statusCode,
                Message = message ?? "Error",
                Errors = errors?.ToList()
            };
        }

        public static ApiResponse<T> Failure(string error, string? message = null, int statusCode = 400)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                StatusCode = statusCode,
                Message = message ?? "Error",
                Errors = new List<string> { error }
            };
        }
    }
}
