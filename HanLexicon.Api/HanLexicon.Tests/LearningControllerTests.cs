using HanLexicon.Api.Controllers;
using HanLexicon.Application.Common;
using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Application.DTOs.gamesData;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class LearningControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly LearningController _controller;

        public LearningControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new LearningController(_mediatorMock.Object);
        }

        [Fact]
        public async Task GetCatalog_ReturnsOk()
        {
            var expectedData = new List<GameCategoryResponseDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetLessons>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetCatalog();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetCategories_ReturnsOk()
        {
            var expectedData = new List<CategorySimpleResponseDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetCategories>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetCategories();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetLessonsByCategory_ReturnsOk()
        {
            short categoryId = 1;
            var expectedData = new List<GameItemDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetLessonsByCategory>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetLessonsByCategory(categoryId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetLessonDetail_ReturnsOk()
        {
            var id = Guid.NewGuid();
            var expectedData = new HanLexicon.Application.Features.LessonsUser.LessonFullDetailDto();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetLessonFullDetail>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetLessonDetail(id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetVocabularies_ReturnsOk()
        {
            var id = Guid.NewGuid();
            var expectedData = new List<VocabularyItemDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetVocabularyByLesson>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetVocabularies(id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }
    }
}
