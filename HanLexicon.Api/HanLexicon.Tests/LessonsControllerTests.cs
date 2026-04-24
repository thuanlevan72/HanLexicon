using HanLexicon.Api.Controllers;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Application.Features.Lessons;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace HanLexicon.Tests
{
    public class LessonsControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<ICurrentUserService> _currentUserServiceMock;
        private readonly LessonsController _controller;

        public LessonsControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _currentUserServiceMock = new Mock<ICurrentUserService>();
            _controller = new LessonsController(_mediatorMock.Object, _currentUserServiceMock.Object);
        }

        [Fact]
        public async Task GetLessons_ReturnsOkResult_WithListOfCategories()
        {
            // Arrange
            var expectedResponse = new List<GameCategoryResponseDto>
            {
                new GameCategoryResponseDto { CategorySlug = "test-category", Items = new List<GameItemDto>() }
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<QueryGetLessons>(), default))
                .ReturnsAsync(expectedResponse);

            // Act
            var result = await _controller.GetLessons();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedValue = Assert.IsType<List<GameCategoryResponseDto>>(okResult.Value);
            Assert.Single(returnedValue);
            Assert.Equal("test-category", returnedValue[0].CategorySlug);
        }

        [Fact]
        public async Task SaveProgress_ReturnsOkResult_WithSuccess()
        {
            // Arrange
            var command = new SaveUserProgressCommand(Guid.NewGuid(), Guid.NewGuid(), 100, true, 300);
            _mediatorMock
                .Setup(m => m.Send(command, default))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.SaveProgress(command);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }
    }
}
