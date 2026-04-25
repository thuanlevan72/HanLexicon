using HanLexicon.Domain.Entities;
using HanLexicon.Api.Controllers.Auth;
using HanLexicon.Application.DTOs.authDto;
using HanLexicon.Application.Features.Auth;
using HanLexicon.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace HanLexicon.Tests
{
    public class AuthControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<IAuthService> _authServiceMock;
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _authServiceMock = new Mock<IAuthService>();
            _controller = new AuthController(_mediatorMock.Object, _authServiceMock.Object);
        }

        [Fact]
        public async Task Login_ValidCommand_ReturnsOkResult()
        {
            // Arrange
            var command = new LoginCommand("test@email.com", "testuser", "password123", "127.0.0.1");
            var expectedResult = new AuthResultDto 
            { 
                IsSuccess = true, 
                AccessToken = "fake-token", 
                RefreshToken = "fake-refresh" 
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<LoginCommand>(), default))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.Login(command);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedValue = Assert.IsType<AuthResultDto>(okResult.Value);
            Assert.True(returnedValue.IsSuccess);
            Assert.Equal("fake-token", returnedValue.AccessToken);
        }

        [Fact]
        public async Task Login_InvalidCommand_ReturnsUnauthorized()
        {
            // Arrange
            var command = new LoginCommand("wrong@email.com", "wronguser", "wrongpass", "127.0.0.1");
            var expectedResult = new AuthResultDto 
            { 
                IsSuccess = false, 
                Message = "Invalid credentials" 
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<LoginCommand>(), default))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.Login(command);

            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
        }
    }
}
