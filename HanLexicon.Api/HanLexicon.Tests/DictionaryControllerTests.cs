using HanLexicon.Api.Controllers;
using HanLexicon.Application.Common;
using HanLexicon.Application.Interfaces;
using Application.Interfaces;
using HanLexicon.Application.Features.VocabulariesUser;
using HanLexicon.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class DictionaryControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<ICurrentUserService> _currentUserServiceMock;
        private readonly DictionaryController _controller;

        public DictionaryControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _currentUserServiceMock = new Mock<ICurrentUserService>();
            _controller = new DictionaryController(_mediatorMock.Object, _currentUserServiceMock.Object);
        }

        [Fact]
        public async Task GetVocabularies_ReturnsOk()
        {
            var expectedResult = new PagedResult<Vocabulary>(new List<Vocabulary>(), 0, 1, 10);
            _mediatorMock.Setup(m => m.Send(It.IsAny<QueryGetVocabulariesPaged>(), default)).ReturnsAsync(expectedResult);

            var result = await _controller.GetVocabularies(null, null);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var apiResponse = Assert.IsType<ApiResponse<PagedResult<Vocabulary>>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }

        [Fact]
        public async Task Search_ReturnsOk()
        {
            var queryText = "ni hao";
            var expectedResult = new List<Vocabulary> { new Vocabulary { Word = "你好" } };
            _mediatorMock.Setup(m => m.Send(It.IsAny<QuerySearchVocabularies>(), default)).ReturnsAsync(expectedResult);

            var result = await _controller.Search(queryText);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var apiResponse = Assert.IsType<ApiResponse<List<Vocabulary>>>(okResult.Value);
            Assert.True(apiResponse.IsSuccess);
        }
    }
}
