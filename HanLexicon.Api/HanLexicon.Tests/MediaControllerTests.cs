using HanLexicon.Api.Controllers;
using HanLexicon.Application.Common;
using HanLexicon.Application.Features.Media;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class MediaControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly MediaController _controller;

        public MediaControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new MediaController(_mediatorMock.Object);
        }

        [Fact]
        public async Task UploadBatch_EmptyFiles_ReturnsBadRequest()
        {
            var result = await _controller.UploadBatch(new List<IFormFile>());

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(badRequestResult.Value);
            Assert.False(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task UploadBatch_WithFiles_ReturnsOk()
        {
            var fileMock = new Mock<IFormFile>();
            var files = new List<IFormFile> { fileMock.Object };
            
            var expectedResult = new UploadMediaBatchResult(1, new List<object>());
            _mediatorMock.Setup(m => m.Send(It.IsAny<UploadMediaBatchCommand>(), default)).ReturnsAsync(expectedResult);

            var result = await _controller.UploadBatch(files);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }
    }
}
