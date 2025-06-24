using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoWeb.Migrations
{
    public partial class LastCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LastCode",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastCode",
                table: "Users");
        }
    }
}
