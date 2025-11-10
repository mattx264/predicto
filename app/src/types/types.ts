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
