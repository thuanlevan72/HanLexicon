using HanLexicon.Domain.Common;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin
{
    public record SeedInitialDataCommand() : IRequest<bool>;

    public class SeedInitialDataHandler : IRequestHandler<SeedInitialDataCommand, bool>
    {
        private readonly IUnitOfWork _uow;

        public SeedInitialDataHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<bool> Handle(SeedInitialDataCommand request, CancellationToken cancellationToken)
        {
            var roleRepo = _uow.Repository<Role>();
            var permissionRepo = _uow.Repository<Permission>();

            // 1. Seed Permissions
            var permissions = new List<Permission>
            {
                new Permission { Id = 1, Code = "USER_VIEW", Name = "Xem người dùng" },
                new Permission { Id = 2, Code = "USER_EDIT", Name = "Sửa người dùng" },
                new Permission { Id = 3, Code = "LESSON_CREATE", Name = "Tạo bài học" },
                new Permission { Id = 4, Code = "LESSON_EDIT", Name = "Sửa bài học" }
            };

            foreach (var p in permissions)
            {
                if (!await permissionRepo.Query().AnyAsync(x => x.Id == p.Id, cancellationToken))
                {
                    permissionRepo.Add(p);
                }
            }

            // 2. Seed Roles
            var adminRole = await roleRepo.Query().Include(r => r.Permissions).FirstOrDefaultAsync(r => r.Id == (short)RoleEnum.Admin, cancellationToken);
            if (adminRole == null)
            {
                adminRole = new Role 
                { 
                    Id = (short)RoleEnum.Admin, 
                    Code = "Admin", 
                    Name = "Quản trị viên"
                };
                roleRepo.Add(adminRole);
            }

            var studentRole = await roleRepo.Query().FirstOrDefaultAsync(r => r.Id == (short)RoleEnum.Student, cancellationToken);
            if (studentRole == null)
            {
                studentRole = new Role 
                { 
                    Id = (short)RoleEnum.Student, 
                    Code = "Student", 
                    Name = "Học viên" 
                };
                roleRepo.Add(studentRole);
            }

            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
