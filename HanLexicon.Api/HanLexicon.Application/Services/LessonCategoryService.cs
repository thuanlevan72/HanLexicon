using Application.Interfaces;
using HanLexicon.Application.DTOs;
using HanLexicon.Application.DTOs.LessonCategory;
using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Mappers;
using HanLexicon.Domain.Common.Pagination;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace HanLexicon.Application.Services
{
    /// <summary>
    /// Implementation of ILessonCategoryService.
    /// Author: QuanTM
    /// Created date: 2026-04-23
    /// Last modified date: 2026-04-23
    /// </summary>
    public class LessonCategoryService : ILessonCategoryService
    {
        #region Fields and Constants

        /// <summary>
        /// Unit of Work for managing repositories and transactions.
        /// </summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Current user service to access information about the logged-in user (e.g., for auditing).
        /// </summary>
        private readonly ICurrentUserService _currentUserService;

        /// <summary>
        /// Current request ID for logging and tracing purposes (optional, can be used for correlation in logs).
        /// </summary>
        private readonly Guid _currentId;
        #endregion

        #region Constructor

        /// <summary>
        /// Constructor for LessonCategoryService, injecting necessary dependencies.
        /// </summary>
        /// <param name="unitOfWork"></param>
        /// <param name="currentUserService"></param>
        public LessonCategoryService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
            _currentId = _currentUserService.UserId;
        }
        #endregion

        #region Implementation of ILessonCategoryService

        /// <summary>
        /// Creates a new lesson category based on the provided request data. This method will handle the business logic for validating the input, creating the entity, saving it to the database, and returning an appropriate response.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<ApiResponse<LessonCategoryDto>> CreateAsync(LessonCategoryCreateDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                throw new ArgumentException(nameof(request.Name), "Name is required");
            }

            var repo = _unitOfWork.Repository<LessonCategory>();

            var baseSlug = GenerateSlug(request.Name);
            var slug = baseSlug;

            var index = 1;
            while (await repo.Query().AnyAsync(x => x.Slug == slug))
            {
                slug = $"{baseSlug}-{index++}";
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var maxSortOrder = await repo.Query()
                    .MaxAsync(x => (int?)x.SortOrder) ?? 0;

                var entity = new LessonCategory
                {
                    Name = request.Name.Trim(),
                    Slug = slug,
                    SortOrder = (short)(maxSortOrder + 10)
                };

                repo.Add(entity);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return ApiResponse<LessonCategoryDto>.Created(LessonCategoryMapping.ToDto(entity));
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        /// <summary>
        /// Deletes a lesson category by its ID. This method will check if the category exists, handle any related entities (e.g., lessons that belong to this category), and perform the deletion while ensuring data integrity. It will also manage transactions to ensure that the operation is atomic.
        /// TO DO: The following logic needs to be checked.
        /// Author: QuanTM
        /// Created date: 2026-04-23
        /// Last modified date: 2026-04-23
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task<bool> DeleteAsync(short id)
        {
            var categoryRepo = _unitOfWork.Repository<LessonCategory>();

            var entity = await categoryRepo.Query().FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
            {
                throw new KeyNotFoundException($"LessonCategory with id {id} not found");
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                categoryRepo.Delete(entity);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return true;
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        /// <summary>
        /// Get all lesson categories with pagination and optional dynamic filtering. This method will retrieve a paginated list of lesson categories based on the provided pagination parameters and any dynamic filters specified in the request. It will return a structured response containing the list of categories, total item count, and pagination metadata.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<PagedResponse<LessonCategoryDto>> GetAllAsync(PaginationRequest request)
        {
            var lessonCategoryQueryable = _unitOfWork.Repository<LessonCategory>().Query();

            if(request.DynamicFilters != null)
            {
                lessonCategoryQueryable = lessonCategoryQueryable.Where(x => request.DynamicFilters.ContainsKey(x.Name));
            }

            var totalItems = await lessonCategoryQueryable.CountAsync();

            var items = await lessonCategoryQueryable
                .AsNoTracking()
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => LessonCategoryMapping.ToDto(x))
                .ToListAsync();

            return new PagedResponse<LessonCategoryDto>(
                items,
                totalItems,
                request.PageNumber,
                request.PageSize
            );
        }

        /// <summary>
        /// Get by ID of a lesson category. This method will retrieve a single lesson category based on its unique identifier. If the category is found, it will return the corresponding DTO; if not, it will throw an exception indicating that the entity was not found.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<LessonCategoryDto> GetByIdAsync(short id)
        {
            var entity = await _unitOfWork.Repository<LessonCategory>().GetByIdAsync(id);

            if(entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            var result = LessonCategoryMapping.ToDto(entity);
            return result;
        }

        /// <summary>
        /// Update an existing lesson category based on the provided update data. This method will check if the category exists, apply the updates to the entity, save the changes to the database, and return the updated DTO. It will also handle any necessary validation and manage transactions to ensure data integrity.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<ApiResponse<LessonCategoryDto>> UpdateAsync(LessonCategoryUpdateDto request)
        {
            var lessonCategoryQueryable = _unitOfWork.Repository<LessonCategory>().Query();

            var lessonCategory = await lessonCategoryQueryable.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (lessonCategory == null)
            {
                throw new ArgumentNullException(nameof(lessonCategory));
            }

            if (string.IsNullOrEmpty(request.Name))
            {
                throw new ArgumentException(nameof(request.Name), "Name is required");
            }

            var baseSlug = GenerateSlug(request.Name);
            var slug = baseSlug;

            var index = 1;
            while (await lessonCategoryQueryable.AnyAsync(x => x.Slug == slug))
            {
                slug = $"{baseSlug}-{index++}";
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                lessonCategory.Name = request.Name;
                lessonCategory.Slug = slug;

                _unitOfWork.Repository<LessonCategory>().Update(lessonCategory);

                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                var result = LessonCategoryMapping.ToDto(lessonCategory);

                return ApiResponse<LessonCategoryDto>.Success(result);
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }

        }
        #endregion

        #region Private Helper Methods

        /// <summary>
        /// Generates a URL-friendly slug from the given name. This method converts the input string to lowercase, removes Vietnamese accents, eliminates special characters, and replaces spaces with hyphens to create a clean slug suitable for URLs.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public string GenerateSlug(string name)
        {
            var slug = name.ToLower();

            slug = RemoveVietnameseAccent(slug);

            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-").Trim('-');

            return slug;
        }


        /// <summary>
        /// Removes Vietnamese accents from the input text. This method normalizes the string to decompose accented characters into their base characters and diacritical marks, then filters out the diacritical marks, and finally replaces specific Vietnamese characters (like 'đ' and 'Đ') with their non-accented equivalents.
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private string RemoveVietnameseAccent(string text)
        {
            if (string.IsNullOrEmpty(text))
                return text;

            text = text.Normalize(NormalizationForm.FormD);

            var sb = new StringBuilder();

            foreach (var c in text)
            {
                var unicodeCategory = Char.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(c);
                }
            }

            var result = sb.ToString().Normalize(NormalizationForm.FormC);

            result = result.Replace('đ', 'd').Replace('Đ', 'D');

            return result;
        }
        #endregion
    }
}
