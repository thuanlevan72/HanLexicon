using HanLexicon.Api.Controllers;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Text;
using Xunit;

namespace HanLexicon.Tests
{
    public class FilesControllerTests
    {
        private readonly Mock<IStorageService> _storageMock;
        private readonly Mock<IUnitOfWork> _uowMock;
        private readonly Mock<IGenericRepository<MediaFile>> _repoMock;
        private readonly FilesController _controller;

        public FilesControllerTests()
        {
            _storageMock = new Mock<IStorageService>();
            _uowMock = new Mock<IUnitOfWork>();
            _repoMock = new Mock<IGenericRepository<MediaFile>>();

            _uowMock.Setup(u => u.Repository<MediaFile>()).Returns(_repoMock.Object);
            _controller = new FilesController(_storageMock.Object, _uowMock.Object);
        }

        [Fact]
        public async Task UploadFile_ValidFile_ReturnsOkAndSavesToDb()
        {
            // Arrange
            var fileName = "test-image.png";
            var content = "fake-image-content";
            var bytes = Encoding.UTF8.GetBytes(content);
            var fileMock = new Mock<IFormFile>();
            var ms = new MemoryStream(bytes);
            
            fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
            fileMock.Setup(_ => _.FileName).Returns(fileName);
            fileMock.Setup(_ => _.Length).Returns(bytes.Length);
            fileMock.Setup(_ => _.ContentType).Returns("image/png");

            var expectedUrl = "http://localhost:9000/hanlexicon-media/unique-test-image.png";
            _storageMock.Setup(s => s.UploadFileAsync(It.IsAny<Stream>(), fileName, "image/png"))
                        .ReturnsAsync(expectedUrl);

            var ownerId = Guid.NewGuid();
            var ownerType = "Lesson";

            // Act
            var result = await _controller.UploadFile(fileMock.Object, ownerType, ownerId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            
            // Kiểm tra xem Repository.Add có được gọi không (Xác nhận dữ liệu đã được lưu)
            _repoMock.Verify(r => r.Add(It.Is<MediaFile>(m => 
                m.FileName == fileName && 
                m.CdnUrl == expectedUrl && 
                m.OwnerType == ownerType &&
                m.OwnerId == ownerId
            )), Times.Once);

            // Kiểm tra xem SaveChanges có được gọi không
            _uowMock.Verify(u => u.SaveChangesAsync(default), Times.Once);
        }

        [Fact]
        public async Task UploadFile_NullFile_ReturnsBadRequest()
        {
            // Act
            var result = await _controller.UploadFile(null!, "Lesson", Guid.NewGuid());

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
