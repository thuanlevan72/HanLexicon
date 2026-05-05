using HanLexicon.Api.Controllers.Admin;
using HanLexicon.Application.Common;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Application.Features.Admin.DashboardAdmin;
using HanLexicon.Application.Features.Admin.LessonCategories;
using HanLexicon.Application.Features.Admin.LessonsAdmin;
using HanLexicon.Application.Features.Admin.UsersAdmin;
using HanLexicon.Application.Features.Admin.VocabulariesAdmin;
using HanLexicon.Application.Features.Admin.HanziCards;
using HanLexicon.Application.Features.Admin.Quizzes;
using HanLexicon.Application.Features.Admin.Documents;
using HanLexicon.Application.Features.Admin.Radicals;
using HanLexicon.Application.Features.Admin.ChallengeWords;
using HanLexicon.Application.Features.Admin.LogsAdmin;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Http;

namespace HanLexicon.Tests
{
    public class AdminControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<IUnitOfWork> _uowMock;
        private readonly Mock<ICurrentUserService> _currentUserServiceMock;

        public AdminControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _uowMock = new Mock<IUnitOfWork>();
            _currentUserServiceMock = new Mock<ICurrentUserService>();
        }

        #region AdminDashboardController Tests

        [Fact]
        public async Task AdminDashboard_GetOverallStats_ReturnsOk()
        {
            var controller = new AdminDashboardController(_uowMock.Object, _mediatorMock.Object);
            var expectedResult = new SystemOverallStatsDto { TotalUsers = 10 };
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetSystemOverallStats>(), default)).ReturnsAsync(expectedResult);

            var result = await controller.GetOverallStats();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        #endregion

        #region AdminLearningManagerController Tests

        [Fact]
        public async Task AdminLearningManager_GetLogs_ReturnsOk()
        {
            var controller = new AdminLearningManagerController(_mediatorMock.Object);
            var expectedResult = new LogListResponse { Items = new List<SystemLogDto>(), TotalItems = 0 };
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetLogs>(), default)).ReturnsAsync(expectedResult);

            var result = await controller.GetLogs(null, null);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task AdminLearningManager_GetCategories_ReturnsOk()
        {
            var controller = new AdminLearningManagerController(_mediatorMock.Object);
            var expectedResult = new List<LessonCategoryDto> { new LessonCategoryDto { Id = 1, Name = "Test" } };
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetLessonCategories>(), default)).ReturnsAsync(expectedResult);

            var result = await controller.GetCategories(null);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task AdminLearningManager_CreateCategory_ReturnsOk()
        {
            var controller = new AdminLearningManagerController(_mediatorMock.Object);
            var command = new CreateLessonCategoryCommand("New Category", "new-category", 1);
            _mediatorMock.Setup(m => m.Send(command, default)).ReturnsAsync(new LessonCategoryDto { Id = 1 });

            var result = await controller.CreateCategory(command);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task AdminLearningManager_UpdateCategory_ReturnsOk()
        {
            var controller = new AdminLearningManagerController(_mediatorMock.Object);
            var command = new UpdateLessonCategoryCommand(1, "Updated", "updated", 1);
            _mediatorMock.Setup(m => m.Send(command, default)).ReturnsAsync(new LessonCategoryDto { Id = 1 });

            var result = await controller.UpdateCategory(1, command);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        #endregion

        #region AdminUsersController Tests

        [Fact]
        public async Task AdminUsers_GetUsers_ReturnsOk()
        {
            var controller = new AdminUsersController(_mediatorMock.Object);
            var expectedResult = new UserListResponse { Items = new List<UserDto>(), TotalItems = 0 };
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetUsers>(), default)).ReturnsAsync(expectedResult);

            var result = await controller.GetUsers(null, null, null);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task AdminUsers_UpdateUserStatus_ReturnsOk()
        {
            var controller = new AdminUsersController(_mediatorMock.Object);
            var id = Guid.NewGuid();
            var command = new CommandUpdateUserStatus(id, false);
            _mediatorMock.Setup(m => m.Send(command, default)).ReturnsAsync(true);

            var result = await controller.UpdateUserStatus(id, command);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<object>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        #endregion

        #region AdminVocabulariesController Tests

        [Fact]
        public async Task AdminVocabularies_GetVocabularies_ReturnsOk()
        {
            var controller = new AdminVocabulariesController(_mediatorMock.Object, _currentUserServiceMock.Object);
            var pagedResult = new PagedResult<VocabularyDto>(new List<VocabularyDto>(), 0, 1, 10);
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetVocabulariesAdmin>(), default)).ReturnsAsync(pagedResult);

            var result = await controller.GetVocabularies(null, null, null, null, null);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<PagedResult<VocabularyDto>>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        #endregion
    }
}
