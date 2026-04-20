using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.Interfaces
{
    public interface IVocabularyImportJob
    {
        Task ProcessImportAsync(string tempExcelPath, string tempZipPath, Guid adminId);
    }
}
