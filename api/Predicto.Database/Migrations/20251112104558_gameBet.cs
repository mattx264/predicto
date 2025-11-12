using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Predicto.Database.Migrations
{
    /// <inheritdoc />
    public partial class gameBet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Room_User_UserEntityId",
            //    table: "Room");

            //migrationBuilder.DropIndex(
            //    name: "IX_Room_UserEntityId",
            //    table: "Room");

            //migrationBuilder.DropColumn(
            //    name: "UserEntityId",
            //    table: "Room");

            migrationBuilder.CreateTable(
                name: "RoomUserBet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeamId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    Bet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BetType = table.Column<int>(type: "int", nullable: false),
                    RoomUserEntityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomUserBet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomUserBet_Game_GameId",
                        column: x => x.GameId,
                        principalTable: "Game",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomUserBet_RoomUserEntity_RoomUserEntityId",
                        column: x => x.RoomUserEntityId,
                        principalTable: "RoomUserEntity",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RoomUserBet_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomUserBet_GameId",
                table: "RoomUserBet",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomUserBet_RoomUserEntityId",
                table: "RoomUserBet",
                column: "RoomUserEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomUserBet_TeamId",
                table: "RoomUserBet",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomUserBet");

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId",
                table: "Room",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Room_UserEntityId",
                table: "Room",
                column: "UserEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_User_UserEntityId",
                table: "Room",
                column: "UserEntityId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
