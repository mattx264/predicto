using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class Init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Game_GameTeamEntity_AwayTeamId",
                table: "Game");

            migrationBuilder.AddForeignKey(
                name: "FK_Game_GameTeamEntity_AwayTeamId",
                table: "Game",
                column: "AwayTeamId",
                principalTable: "GameTeamEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Game_GameTeamEntity_AwayTeamId",
            //    table: "Game");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Game_GameTeamEntity_AwayTeamId",
            //    table: "Game",
            //    column: "AwayTeamId",
            //    principalTable: "GameTeamEntity",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }
    }
}
