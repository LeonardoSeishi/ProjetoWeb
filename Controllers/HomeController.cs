using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using ProjetoWeb.Models;
using System.CodeDom.Compiler;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis;
using System.Reflection;

namespace ProjetoWeb.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpPost("/RunCode")]
    public IActionResult RunCode([FromForm] string code)
    {
        try
        {    
            var result = CSharpScript.RunAsync(code, ScriptOptions.Default).GetAwaiter().GetResult();
            var ret = result.ReturnValue;
            return Ok(ret);
            
            /* var tree = CSharpSyntaxTree.ParseText(code);
            var compilation = CSharpCompilation.Create("Code")
                .WithOptions(new CSharpCompilationOptions(OutputKind.ConsoleApplication))
                .AddReferences(
                    //MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(Decimal).Assembly.Location),
                    //MetadataReference.CreateFromFile(typeof(Object).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(Console).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(System.String).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(System.Linq.Enumerable).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(System.AssemblyLoadEventArgs).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(System.Runtime.AssemblyTargetedPatchBandAttribute).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(System.Runtime.ExceptionServices.ExceptionDispatchInfo).Assembly.Location)
                )
                .AddSyntaxTrees(tree);

            var outputStrWriter = new StringWriter();
            using var memStr = new MemoryStream();
            var emitResult = compilation.Emit(memStr);

            if (!emitResult.Success) return BadRequest(string.Join("\n", emitResult.Diagnostics));
            
            Console.SetOut(outputStrWriter);

            memStr.Seek(0, SeekOrigin.Begin);
            var assembly = Assembly.Load(memStr.ToArray());
            var tipo = assembly.GetTypes().FirstOrDefault(t => t.Name == "Program");
            var main = tipo?.GetMethod("Main", BindingFlags.Static | BindingFlags.Public);
            main?.Invoke(null, null);

            return Ok(outputStrWriter); */
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
