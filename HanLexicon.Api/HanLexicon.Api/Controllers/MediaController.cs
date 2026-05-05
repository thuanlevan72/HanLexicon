using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Common;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Application.Features.Media;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    [Route("api/v1/media")]
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class MediaController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MediaController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("upload-batch")]
        public async Task<IActionResult> UploadBatch(List<IFormFile> files, [FromQuery] string folder = "general")
        {
            if (files == null || files.Count == 0)
                return BadRequest(ApiResponse<object>.Failure("Không có file nào được chọn."));

            var result = await _mediator.Send(new UploadMediaBatchCommand(files, folder));

            return Ok(ApiResponse<object>.Success(new {
                total = result.Total,
                files = result.Files
            }, "Upload và lưu Database hoàn tất."));
        }

        [HttpGet]
        public async Task<IActionResult> GetList([FromQuery] QueryGetMediaList query)
        {
            var result = await _mediator.Send(query);
            return Ok(ApiResponse<MediaListResponse>.Success(result));
        }

        [HttpPost("folders")]
        public async Task<IActionResult> CreateFolder([FromBody] CreateFolderRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(ApiResponse<Guid>.Failure("Tên thư mục không được để trống."));

            var id = await _mediator.Send(new CreateMediaFolderCommand(request.Name, request.Description));
            return Ok(ApiResponse<Guid>.Success(id, "Tạo thư mục thành công."));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _mediator.Send(new DeleteMediaCommand(id));
            if (!result)
                return NotFound(ApiResponse<bool>.Failure("Không tìm thấy file media."));

            return Ok(ApiResponse<bool>.Success(true, "Xóa file thành công."));
        }
    }

    public class CreateFolderRequest
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
    }
}
