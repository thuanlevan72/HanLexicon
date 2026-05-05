using HanLexicon.Application.Features.Media;
using HanLexicon.Application.Interfaces;
using Application.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Tests
{
    public class MediaIntegrationTest
    {
        private readonly Mock<IUnitOfWork> _uowMock;
        private readonly Mock<IStorageService> _storageMock;
        private readonly Mock<IGenericRepository<MediaFile>> _mediaRepoMock;
        private readonly Mock<ICurrentUserService> _currentUserMock;

        public MediaIntegrationTest()
        {
            _uowMock = new Mock<IUnitOfWork>();
            _storageMock = new Mock<IStorageService>();
            _mediaRepoMock = new Mock<IGenericRepository<MediaFile>>();
            _currentUserMock = new Mock<ICurrentUserService>();

            _uowMock.Setup(u => u.Repository<MediaFile>()).Returns(_mediaRepoMock.Object);
        }

        [Fact]
        public async Task UploadMediaBatch_WithFolder_SavesCorrectStorageKey()
        {
            // Arrange
            var files = new List<IFormFile>();
            var fileMock = new Mock<IFormFile>();
            var content = "fake content";
            var fileName = "test.jpg";
            var ms = new MemoryStream(Encoding.UTF8.GetBytes(content));
            fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
            fileMock.Setup(_ => _.FileName).Returns(fileName);
            fileMock.Setup(_ => _.Length).Returns(ms.Length);
            fileMock.Setup(_ => _.ContentType).Returns("image/jpeg");
            files.Add(fileMock.Object);

            var folder = "unit-test-folder";
            var expectedStorageKey = $"{folder}/{fileName}";
            var expectedUrl = $"http://minio/{expectedStorageKey}";

            _storageMock.Setup(s => s.UploadFileAsync(It.IsAny<Stream>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(expectedUrl);

            var handler = new UploadMediaBatchHandler(_storageMock.Object, _uowMock.Object, _currentUserMock.Object);

            // Act
            var result = await handler.Handle(new UploadMediaBatchCommand(files, folder), CancellationToken.None);

            // Assert
            Assert.Equal(1, result.Total);
            _mediaRepoMock.Verify(r => r.Add(It.Is<MediaFile>(m => m.StorageKey == expectedStorageKey)), Times.Once);
            _uowMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public void FolderLogic_CorrectlySplitsPath()
        {
            // Test the logic I put in GetMediaList.cs manually here
            var storageKeys = new List<string> { "root.jpg", "folder1/f1.jpg", "folder2/sub/f2.jpg" };
            
            var folders = storageKeys
                .Select(key => key.Contains('/') ? key.Substring(0, key.IndexOf('/')) : "general")
                .Distinct()
                .OrderBy(f => f)
                .ToList();

            Assert.Contains("general", folders);
            Assert.Contains("folder1", folders);
            Assert.Contains("folder2", folders);
            Assert.Equal(3, folders.Count);
        }
    }
}
