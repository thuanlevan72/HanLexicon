using HanLexicon.Domain.Common.Pagination;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace HanLexicon.Domain.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> Query(); // 🔥 quan trọng nhất

        Task<TEntity?> GetByIdAsync(object id, CancellationToken cancellationToken = default);

        Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);

        Task<List<TEntity>> FindAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken = default);

        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default);

        Task<int> CountAsync(Expression<Func<TEntity, bool>>? predicate = null, CancellationToken cancellationToken = default);

        Task<PagedResponse<TResult>> SelectPagedAsync<TResult>(
            Expression<Func<TEntity, bool>>? predicate,
            Expression<Func<TEntity, TResult>> selector,
            PaginationRequest request,
            CancellationToken cancellationToken = default);

        Task<List<TResult>> SelectAsync<TResult>(
            Expression<Func<TEntity, TResult>> selector,
            CancellationToken cancellationToken = default);

        Task<List<TResult>> SelectWhereAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> selector,
            CancellationToken cancellationToken = default);

        Task<TEntity?> FirstOrDefaultAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken = default);

        void Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);

        void Update(TEntity entity);

        void Delete(TEntity entity);
    }
}
