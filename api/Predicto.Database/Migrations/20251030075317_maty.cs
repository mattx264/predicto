using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class maty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tournament",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Tournament",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "League",
                table: "Tournament",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Tournament",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchesCount",
                table: "Tournament",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Tournament",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tournament");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Tournament");

            migrationBuilder.DropColumn(
                name: "League",
                table: "Tournament");

            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Tournament");

            migrationBuilder.DropColumn(
                name: "MatchesCount",
                table: "Tournament");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Tournament");
        }
    }
}
