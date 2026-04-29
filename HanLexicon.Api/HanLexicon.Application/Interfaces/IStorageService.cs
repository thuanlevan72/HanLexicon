using System.IO;
using System.Threading.Tasks;

namespace HanLexicon.Application.Interfaces
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType);
        Task<bool> DeleteFileAsync(string objectName);
    }
}

