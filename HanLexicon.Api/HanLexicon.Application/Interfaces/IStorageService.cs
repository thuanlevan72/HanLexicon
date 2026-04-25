using HanLexicon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.Interfaces
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType);
    }
}
