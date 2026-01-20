import { useEffect, useMemo, useState } from "react";

import { roomHubService } from "../../app/src/services/signalr/signalr/room-hub.service";

import "./App.css";
import type {
  RoomDTO,
  RoomGameBetDto,
  RoomGameBetTeamDto,
  RoomGameDto,
  RoomUserDetailsDTO,
} from "../../app/src/services/nsawg/client";
//import {  RoomDTO } from "../../app/src/services/nsawg/client";
import apiService from "../../app/src/services/signalr/api.service";
//import { apiWorker } from "./webworker/apiWorker";
function App() {
  // useEffect(() => {
  //   apiWorker.postMessage({ type: "GET_USERS" });

  //   apiWorker.onmessage = (event) => {
  //     console.log("Worker response:", event.data);
  //   };

  //   return () => apiWorker.terminate();
  // }, []);
  const [room, setRoom] = useState<RoomDTO | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<RoomUserDetailsDTO[]>([]);
  const [games, setGames] = useState<RoomGameDto[]>([]);
  let roomId = 2;
  let isTestRunning = false;
  useEffect(() => {}, []);
  const handleRoomDataReceived = (_roomDto: RoomDTO) => {
    //if (!isMounted) return;
    console.log("Room data received:", _roomDto);
    setRoom(_roomDto);
    // const mappedRoom = mapRoomDtoToRoom(roomDto);

    // setCurrentRoom(mappedRoom);
    // setRoomConnectionStatus("connected");
    // setRoomLoading(false);
  };
  const handleUsersDataReceived = (_users: RoomUserDetailsDTO[]) => {
    console.log("Users data received:", _users);
    if (users.length === 0) {
      //do not log on initial load
      setUsers(_users);
      return;
    } else if (users.length < _users.length) {
      addLog(
        `User joined: ${_users.find((u) => !users.some((usr) => usr.id === u.id))?.username}`,
      );
    } else if (users.length > _users.length) {
      addLog(
        `User left: ${users.find((u) => !_users.some((usr) => usr.id === u.id))?.username}`,
      );
    }

    setUsers(_users);
  };
  const handleGamesDataReceived = (_gameListDto: any) => {
    console.log("Games data received:", _gameListDto);
  };
  const handleGetUserBetsAndPoints = (_roomGameDto: any) => {
    console.log("Bets and Points data received:", _roomGameDto);
  };
  const connectSignalR = async (roomId: number) => {
    await roomHubService.connect(
      roomId,
      handleRoomDataReceived,
      handleUsersDataReceived,
      handleGamesDataReceived,
      handleGetUserBetsAndPoints,
    );
  };
  const startTest = async () => {
    //testing games
    if (isTestRunning) {
      addLog("Test is already running.");
      return;
    }
    isTestRunning = true;
    const client = apiService.getClient();

    const testUserId = 1008;

    addLog("Starting test...");
    addLog("Clearing all bets in room...");
    await client.clearAllBetInRoomMock(roomId, 1); //todo get new auth token for test user before calling this

    addLog("Connecting to SignalR...");
    await connectSignalR(roomId.toString());
    addLog("Connected to SignalR.");
    addLog("Get all games...");
    const roomGames = await client.getGamesBetsAndPoints(roomId);
    setGames(roomGames);
    const betCount =
      roomGames.find((g) => g.teams.find((t) => t.bet !== null))?.teams
        .length || 0;
    addLog(`Room games retrieved: ${roomGames.length} games.`);
    addLog(`Room bet should be 0 but is: ${betCount} games.`);

    addLog("Set first game bet...");
    const betTeam1: RoomGameBetTeamDto[] = [
      { teamId: roomGames[0].teams[0].id, bet: "W" },
    ];
    const bet1: RoomGameBetDto = {
      roomId: roomId,
      gameId: roomGames[0].gameId,
      roomGameBetTeam: betTeam1,
    };
    await client.betGame(bet1);

    addLog("Set second game bet...");
    const betTeam2: RoomGameBetTeamDto[] = [
      { teamId: roomGames[1].teams[1].id, bet: "W" },
    ];
    const bet2: RoomGameBetDto = {
      roomId: roomId,
      gameId: roomGames[1].gameId,
      roomGameBetTeam: betTeam2,
    };
    await client.betGame(bet2);

    addLog("Set third game bet draw...");
    const betTeam3: RoomGameBetTeamDto[] = [
      { teamId: roomGames[2].teams[0].id, bet: "D" },
      { teamId: roomGames[2].teams[1].id, bet: "D" },
    ];
    const bet3: RoomGameBetDto = {
      roomId: roomId,
      gameId: roomGames[2].gameId,
      roomGameBetTeam: betTeam3,
    };
    await client.betGame(bet3);

    addLog("Get all games again...");
    const roomGamesNew = await client.getGamesBetsAndPoints(roomId);
    setGames(roomGamesNew);

    addLog("Test completed.");
  };
  // const startTestUser = async () => {
  //   //testing joining and leaving room
  //   if (isTestRunning) {
  //     addLog("Test is already running.");
  //     return;
  //   }
  //   isTestRunning = true;
  //   const client = apiService.getClient();
  //   const testUserId = 1008;
  //   addLog("Starting test...");
  //   //  addLog("Creating new room...");
  //   //  const roomDto: NewRoomDto = {
  //   //   name: "Test Room",
  //   //   description: "This is a test room",
  //   //   maxPlayers: 10,
  //   // };
  //   //   const room= await apiService.getClient().createRoom(roomDto);
  //   //   roomId=room.id;
  //   addLog("Connecting to SignalR...");

  //   await connectSignalR(roomId.toString());
  //   addLog("Connected to SignalR.");
  //   addLog("Get all room users...");
  //   let users = await client.getUsers(roomId);
  //   setUsers(users);
  //   addLog(`Room users retrieved: ${users.length} users.`);
  //   addLog("User joining room...");
  //   await client.joinRoomMock(roomId, testUserId);
  //   addLog("User joined room.");
  //   addLog("Get all room users...");
  //   users = await client.getUsers(roomId);
  //   setUsers(users);
  //   addLog(`Room users retrieved: ${users.length} users.`);
  //   addLog("User leaving room...");
  //   await client.leaveRoomMock(roomId, testUserId);
  //   addLog("User left room.");
  //   addLog("Get all room users...");
  //   users = await client.getUsers(roomId);
  //   setUsers(users);
  //   addLog(`Room users retrieved: ${users.length} users.`);
  //   addLog("Test completed.");
  // };
  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <>
      <div>
        <h1>Predicto Tester App</h1>
        <button onClick={() => void startTest()}>Start</button>
      </div>
      <div className="d-flex">
        <section id="logs-section">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </section>
        <section>
          <h3>Room Info</h3>
          <div>{room ? room.name : "No room data"}</div>
          <div>{room ? room.description : ""}</div>
          <div>{room ? room.maxPlayers : ""}</div>
          <div>Users ({room?.users.length})</div>
          {users.map((user) => (
            <div key={user.id}>
              {user.username} (ID: {user.id})
            </div>
          ))}
          <div></div>
        </section>
        <section>
          <h3>Game Info</h3>

          {games.map((game) => (
            <div key={game.gameId}>Game ID: {game.gameId}</div>
          ))}
        </section>
        <section>
          <h3>Bet/Points Info</h3>
          {games.map((game) => (
            <div key={game.gameId}>
              {game.teams.map((team) => (
                <span key={team.teamId}>
                  {team.name}: Bet {team.bet}
                </span>
              ))}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
