using HanLexicon.Api.Controllers;
using HanLexicon.Application.Common;
using HanLexicon.Application.Features.Users;
using HanLexicon.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class ProfileControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ProfileController _controller;

        public ProfileControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new ProfileController(_mediatorMock.Object);
        }

        [Fact]
        public async Task GetProfile_ReturnsOk()
        {
            var expectedData = new UserProfileDto();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetProfile>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetProfile();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetAnalytics_ReturnsOk()
        {
            var expectedData = new VUserStat();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetUserStats>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetAnalytics();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetVocabularyMastery_ReturnsOk()
        {
            var expectedData = new List<UserWordMasteryDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetUserWordProgress>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetVocabularyMastery();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task GetLearningHistory_ReturnsOk()
        {
            var expectedData = new List<UserLearningHistoryDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetUserLearningHistory>(), default)).ReturnsAsync(expectedData);

            var result = await _controller.GetLearningHistory();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }
    }
}
