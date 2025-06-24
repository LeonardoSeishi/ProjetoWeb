using Microsoft.AspNetCore.Mvc;
using ProjetoWeb.Data;
using ProjetoWeb.Entities;
using BCrypt.Net;
using System.Linq;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ProjetoWeb.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/auth/register")]
        public IActionResult Register() { return View(); }

        [HttpGet("/auth/login")]
        public IActionResult Login() { return View(); }


        [HttpPost("/auth/register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
                return BadRequest("Email já cadastrado");

            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuário registrado com sucesso");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized("Credenciais inválidas");

            return Ok("Login efetuado com sucesso");
        }
    }

    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
