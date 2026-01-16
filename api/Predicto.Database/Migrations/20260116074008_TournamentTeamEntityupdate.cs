using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class TournamentTeamEntityupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScoreTeamOne",
                table: "GameScoreEntity");

            migrationBuilder.RenameColumn(
                name: "TimeScore",
                table: "GameScoreEntity",
                newName: "TeamId");

            migrationBuilder.RenameColumn(
                name: "ScoreTeamTwo",
                table: "GameScoreEntity",
                newName: "PlayerId");

            migrationBuilder.AddColumn<string>(
                name: "Phase",
                table: "GameScoreEntity",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimeScored",
                table: "GameScoreEntity",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PlayerOfTheMatchId",
                table: "Game",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phase",
                table: "GameScoreEntity");

            migrationBuilder.DropColumn(
                name: "TimeScored",
                table: "GameScoreEntity");

            migrationBuilder.DropColumn(
                name: "PlayerOfTheMatchId",
                table: "Game");

            migrationBuilder.RenameColumn(
                name: "TeamId",
                table: "GameScoreEntity",
                newName: "TimeScore");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "GameScoreEntity",
                newName: "ScoreTeamTwo");

            migrationBuilder.AddColumn<int>(
                name: "ScoreTeamOne",
                table: "GameScoreEntity",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
