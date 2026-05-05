using HanLexicon.Api.Controllers;
using HanLexicon.Application.Common;
using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Application.Features.VocabulariesUser;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class StudyProgressControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<ICurrentUserService> _currentUserServiceMock;
        private readonly StudyProgressController _controller;

        public StudyProgressControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _currentUserServiceMock = new Mock<ICurrentUserService>();
            _controller = new StudyProgressController(_mediatorMock.Object, _currentUserServiceMock.Object);
            
            _currentUserServiceMock.Setup(s => s.UserId).Returns(Guid.NewGuid());
        }

        [Fact]
        public async Task SaveLessonProgress_ReturnsOk()
        {
            var lessonId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var command = new SaveUserProgressCommand(lessonId, userId, 100, true, 120, 0);
            _mediatorMock.Setup(m => m.Send(It.IsAny<SaveUserProgressCommand>(), default)).ReturnsAsync(true);

            var result = await _controller.SaveLessonProgress(command);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<bool>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetReviewHistory_ReturnsOk()
        {
            var lessonId = Guid.NewGuid();
            var expectedData = new List<ReviewHistoryDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetReviewHistory>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetReviewHistory(lessonId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task UpdateWordProgress_ReturnsOk()
        {
            var vocabId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var command = new UpdateWordProgressCommand(userId, vocabId, "mastered");
            _mediatorMock.Setup(m => m.Send(It.IsAny<UpdateWordProgressCommand>(), default)).ReturnsAsync(true);

            var result = await _controller.UpdateWordProgress(command);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<bool>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }
    }
}
