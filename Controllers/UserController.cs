using Microsoft.AspNetCore.Mvc;
using ProjetoWeb.Data;
using ProjetoWeb.Entities;
using System.Linq;

namespace ProjetoWeb.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("save-code")]
        public IActionResult SaveCode([FromBody] SaveCodeRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
                return NotFound("Usuário não encontrado");

            user.LastCode = request.Code;
            _context.SaveChanges();

            return Ok("Código salvo com sucesso");
        }

        [HttpGet("load-code")]
        public IActionResult LoadCode([FromQuery] string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
                return NotFound("Usuário não encontrado");

            return Ok(user.LastCode ?? "");
        }
    }

    public class SaveCodeRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
