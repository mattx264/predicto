export interface CreateRoomRequest {
  name: string;
  description: string;
  tournamentId: number;
  maxParticipants: number;
  entryFee?: number;
  isPrivate: boolean;
}
export interface TournamentDto {
  id: number;
  name: string;
  sportCategoryId: number;
  league: string;
  description: string;
  matchesCount: number;
  startDate: string;
  endDate: string;
  logoUrl: string;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface CreateRoomResponse {
  message: string;
  roomId?: number;
}

export const RoomStatusDTO = {
  Waiting: 0,
  InProgress: 1,
  Completed: 2,
} as const;

export type RoomStatusDTO = (typeof RoomStatusDTO)[keyof typeof RoomStatusDTO];

export interface RoomFormData {
  tournamentTemplateId: string;
  roomName: string;
  maxParticipants: number;
  entryFee: number;
  isPrivate: boolean;
  description: string;

  rules: {
    scoring: {
      exactScore: number;
      correctOutcome: number;
    };
    deadline: string;
    joker: {
      enabled: boolean;
      count: number;
    };
  };
}
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  date: string;
  status: "upcoming" | "live" | "finished";
  actualScore?: {
    home: number;
    away: number;
  };
  userPrediction?: {
    home?: number;
    away?: number;
    winner?: "home" | "draw" | "away";
    joker?: boolean;
  };
  points?: number;
}

// match api
export interface GameTeamApiDTO {
  id: number;
  name: string;
  logoUrl: string;
}

export interface GameTeamDTO {
  id: number;
  gameId: number;
  teamId: number;
  teamName: string;
  isHome: boolean;
}

export interface GamePlayerDTO {
  id: number;
  gameId: number;
  playerId: number;
  playerName: string;
  teamId: number;
}

export interface GamePlayerEventDTO {
  id: number;
  gameId: number;
  playerId: number;
  eventType: string;
  minute: number;
  description?: string;
}

export interface GameScoreEventDTO {
  id: number;
  gameId: number;
  teamId: number;
  playerId?: number;
  minute: number;
  scoreType: string;
}

export interface StadiumDTO {
  id: number;
  name: string;
  city: string;
  capacity?: number;
}

export interface GameApiDTO {
  id: number;
  startTime: string;
  teams: GameTeamApiDTO[];
  finalScore: string | null;
}

export interface GameDTO {
  id: number;
  tournamentId: number;
  teams: GameTeamDTO[];
  finalScore: string | null;
  startGame: string;
  referee: string | null;
  stadiumId: number | null;
  isActive: boolean;
}

export interface GameDetailsDTO extends GameDTO {
  stadium?: StadiumDTO;
  gamePlayers?: GamePlayerDTO[];
  gamePlayerEvents?: GamePlayerEventDTO[];
  gameScoreEvents?: GameScoreEventDTO[];
}

export const mapGameApiDtoToMatch = (game: GameApiDTO): Match => {
  const homeTeam = game.teams[0];
  const awayTeam = game.teams[1];

  let actualScore: { home: number; away: number } | undefined;
  if (game.finalScore) {
    const scoreMatch = game.finalScore.match(/(\d+)[-:](\d+)/);
    if (scoreMatch) {
      actualScore = {
        home: parseInt(scoreMatch[1]),
        away: parseInt(scoreMatch[2]),
      };
    }
  }

  const now = new Date();
  const gameStart = new Date(game.startTime);
  const gameEnd = new Date(gameStart.getTime() + 2 * 60 * 60 * 1000);

  let status: "upcoming" | "live" | "finished";
  if (now < gameStart) {
    status = "upcoming";
  } else if (now >= gameStart && now <= gameEnd && !game.finalScore) {
    status = "live";
  } else {
    status = "finished";
  }

  return {
    id: game.id.toString(),
    homeTeam: homeTeam?.name || "Unknown",
    awayTeam: awayTeam?.name || "Unknown",
    homeTeamLogo: homeTeam?.logoUrl,
    awayTeamLogo: awayTeam?.logoUrl,
    date: game.startTime,
    status,
    actualScore,
  };
};
// ===== auth types =====

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  lang: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface RoomDTO {
  id: number;
  name: string;
  description: string;
  entryFee: number;
  users: UserDto[];
  maxUsers: number | null;
  isPublic: boolean;
  roomStatus: RoomStatusDTO;
  tournamentId: number;
  createdAt: string;
  createdByUserId: number;
  createdByUserName: string;
  tournamentName: string;
  tournamentLeague: string;
  tournamentStartDate: string;
  tournamentEndDate: string;
  isUserInRoom: boolean;
}

export interface Room {
  id: string;
  name: string;
  creator: string;
  description?: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
  isUserInRoom: boolean;
  tournamentId: number;
}
export const mapFormDataToCreateRequest = (
  formData: RoomFormData
): CreateRoomRequest => {
  return {
    name: formData.roomName,
    description: formData.description,
    tournamentId: parseInt(formData.tournamentTemplateId, 10),
    maxParticipants: formData.maxParticipants,
    entryFee: formData.entryFee,
    isPrivate: formData.isPrivate,
  };
};
export const mapRoomDtoToRoom = (dto: RoomDTO): Room => {
  const statusMap: Record<RoomStatusDTO, "open" | "active" | "ended"> = {
    [RoomStatusDTO.Waiting]: "open",
    [RoomStatusDTO.InProgress]: "active",
    [RoomStatusDTO.Completed]: "ended",
  };

  return {
    id: dto.id.toString(),
    name: dto.name,
    tournamentId: dto.tournamentId,
    participants: dto.users?.length || 0,
    maxParticipants: dto.maxUsers ?? 10,
    entryFee: dto.entryFee,
    prize: dto.entryFee * (dto.users?.length || 0),
    league: dto.tournamentLeague,
    startDate: dto.tournamentStartDate,
    creator: dto.createdByUserName,
    endDate: dto.tournamentEndDate,
    isPrivate: !dto.isPublic,
    status: statusMap[dto.roomStatus],
    isUserInRoom: dto.isUserInRoom,
    description: dto.description,
  };
};

export interface Participant {
  id: string;
  username: string;
  totalPoints: number;
  correctPredictions: number;
  rank: number;
  avatar: string;
  isPaid: boolean;
  joinedAt?: string;
}
export interface UserJoinedEvent {
  roomId: number;
  userId: number;
  userName: string;
  participantsCount: number;
}

export interface UserLeftEvent {
  roomId: number;
  userId: number;
  participantsCount: number;
}
export interface RoomDetails {
  id: string;
  name: string;
  creator: string;
  creatorId: string;
  participants: Participant[];
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  tournamentName: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
  description?: string;
  rules?: string;
  inviteCode?: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  channelType: "room" | "match";
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes?: number;
  replies?: Comment[];
}

export type ChatChannelType = "room" | "match";

export interface ChatChannel {
  id: string;
  type: ChatChannelType;
  name: string;
}
