using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class statum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "GameStadiumEntity",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "GameStadiumEntity",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "GameStadiumEntity",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UefaId",
                table: "GameStadiumEntity",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "GameStadiumEntity");

            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "GameStadiumEntity");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "GameStadiumEntity");

            migrationBuilder.DropColumn(
                name: "UefaId",
                table: "GameStadiumEntity");
        }
    }
}
