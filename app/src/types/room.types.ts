export enum RoomStatusDTO {
  Waiting = 0,
  InProgress = 1,
  Completed = 2,
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
export interface UserDto {
  id: number;
  username: string;
  email?: string;
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
}

export interface Room {
  id: string;
  name: string;
  creator: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
}

export const mapRoomDtoToRoom = (dto: RoomDTO): Room => {
  const statusMap: Record<RoomStatusDTO, "open" | "active" | "ended"> = {
    [RoomStatusDTO.Waiting]: "open",
    [RoomStatusDTO.InProgress]: "active",
    [RoomStatusDTO.Completed]: "ended",
  };

  return {
    id: dto.id.toString(),
    name: dto.name,

    creator: `User${dto.createdByUserId}`,

    participants: dto.users?.length || 0,
    maxParticipants: dto.maxUsers ?? 10,
    entryFee: dto.entryFee,

    prize: dto.entryFee * (dto.users?.length || 0),

    league: `Tournament ${dto.tournamentId}`,

    startDate: dto.createdAt,

    endDate: "Unknown",

    isPrivate: !dto.isPublic,
    status: statusMap[dto.roomStatus],
  };
};

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
    home: number;
    away: number;
  };
  points?: number;
}

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
