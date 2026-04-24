using HanLexicon.Application.DTOs;
using HanLexicon.Application.DTOs.LessonCategory;
using HanLexicon.Application.Features.LessonCategories.Commands;
using HanLexicon.Application.Features.LessonCategories.Validators;
using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Mappers;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace HanLexicon.Application.Features.LessonCategories.Handlers
{
    /// <summary>
    /// LessonCategoryCreateHandler is a MediatR request handler that processes the LessonCategoryCreateCommand to create a new lesson category. It interacts with the data layer through the IUnitOfWork interface to perform the necessary database operations for creating a lesson category. The handler will return an ApiResponse containing a LessonCategoryDto, which represents the details of the newly created lesson category. This class is part of the application layer and is responsible for handling the business logic related to creating lesson categories.
    /// Author: QuanTM
    /// Created date: 2026-04-24
    /// Last modified date: 2026-04-24
    /// </summary>
    public class LessonCategoryCreateHandler : IRequestHandler<LessonCategoryCreateCommand, ApiResponse<LessonCategoryDto>>
    {
        /// <summary>
        /// Interface for the lesson category service, which provides methods for interacting with the data layer to perform operations related to lesson categories. This service is used by the handler to create a new lesson category in the database and retrieve the details of the created category to return in the ApiResponse.
        /// </summary>
        private readonly ILessonCategoryService _lessonCategoryService;

        /// <summary>
        /// Constructor for the LessonCategoryCreateHandler class, which initializes the handler with the necessary dependencies. In this case, it takes an instance of ILessonCategoryService as a parameter, which is used to interact with the data layer for creating a new lesson category. The constructor is responsible for assigning the provided service to the private field, allowing the handler to use it in the Handle method to perform the required operations for creating a lesson category.
        /// </summary>
        /// <param name="lessonCategoryService"></param>
        public LessonCategoryCreateHandler(ILessonCategoryService lessonCategoryService)
        {
            _lessonCategoryService = lessonCategoryService;
        }

        /// <summary>
        /// Handle method that processes the LessonCategoryCreateCommand to create a new lesson category. This method is responsible for implementing the business logic required to create a lesson category, including validating the input data, interacting with the data layer through the IUnitOfWork to save the new category to the database, and returning an ApiResponse containing a LessonCategoryDto with the details of the created category. The method takes a LessonCategoryCreateCommand as input and returns an ApiResponse<LessonCategoryDto> as output. It also accepts a CancellationToken to support cancellation of the operation if needed.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<ApiResponse<LessonCategoryDto>> Handle(LessonCategoryCreateCommand request, CancellationToken cancellationToken)
        {
            LessonCategoryCreateCommandValidator validator = new LessonCategoryCreateCommandValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return ApiResponse<LessonCategoryDto>.Fail("Dữ liệu đầu vào không hợp lệ!", HttpStatusCode.BadRequest, validationResult.Errors.Select(e => e.ErrorMessage).ToList());
            }

            var result = await _lessonCategoryService.CreateAsync(LessonCategoryMapping.ToCreateRequest(request));

            if (!result.IsSuccess)
            {
                return ApiResponse<LessonCategoryDto>.Fail(result.Message, HttpStatusCode.InternalServerError);
            }

            return ApiResponse<LessonCategoryDto>.Created(result.Data!, "Danh mục bài học đã được tạo thành công!");
        }
    }
}
