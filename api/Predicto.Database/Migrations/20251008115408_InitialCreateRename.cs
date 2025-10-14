using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TournamentEntity_SportCategoryEntity_SportCategoryId",
                table: "TournamentEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserEntiry",
                table: "UserEntiry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TournamentEntity",
                table: "TournamentEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SportCategoryEntity",
                table: "SportCategoryEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomEntity",
                table: "RoomEntity");

            migrationBuilder.RenameTable(
                name: "UserEntiry",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "TournamentEntity",
                newName: "Tournament");

            migrationBuilder.RenameTable(
                name: "SportCategoryEntity",
                newName: "SportCategory");

            migrationBuilder.RenameTable(
                name: "RoomEntity",
                newName: "Room");

            migrationBuilder.RenameIndex(
                name: "IX_TournamentEntity_SportCategoryId",
                table: "Tournament",
                newName: "IX_Tournament_SportCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tournament",
                table: "Tournament",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SportCategory",
                table: "SportCategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room",
                table: "Room",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournament_SportCategory_SportCategoryId",
                table: "Tournament",
                column: "SportCategoryId",
                principalTable: "SportCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournament_SportCategory_SportCategoryId",
                table: "Tournament");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tournament",
                table: "Tournament");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SportCategory",
                table: "SportCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room",
                table: "Room");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "UserEntiry");

            migrationBuilder.RenameTable(
                name: "Tournament",
                newName: "TournamentEntity");

            migrationBuilder.RenameTable(
                name: "SportCategory",
                newName: "SportCategoryEntity");

            migrationBuilder.RenameTable(
                name: "Room",
                newName: "RoomEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Tournament_SportCategoryId",
                table: "TournamentEntity",
                newName: "IX_TournamentEntity_SportCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserEntiry",
                table: "UserEntiry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TournamentEntity",
                table: "TournamentEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SportCategoryEntity",
                table: "SportCategoryEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomEntity",
                table: "RoomEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TournamentEntity_SportCategoryEntity_SportCategoryId",
                table: "TournamentEntity",
                column: "SportCategoryId",
                principalTable: "SportCategoryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
