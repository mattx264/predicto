export interface Article {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  author: string;
  createOn: string;
  tag: string;
  content: string;
  tournamentId?: number | null;
  tournament?: Tournament | null;
}

export interface Player {
  id: number;
  footballApiId?: number | null;
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  age?: number | null;
  birthday: string;
  birthPlace?: string | null;
  birthCountry: string;
  nationality?: string | null;
  height?: number | null;
  weight?: number | null;
  shirtNumber?: number | null;
  position?: string | null;
  photoUrl?: string | null;
  marketValue?: number | null;
  bio?: string | null;
  isActive: boolean;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  type: TeamType;
  footballApiId?: number | null;
  imageUrl: string;
  code?: string | null;
  isActive: boolean;
}

export enum TeamType {
  Club = 0,
  National = 1,
}

export interface Tournament {
  id: number;
  sportCategoryId: number;
  sportCategory?: SportCategory;
  name: string;
  isActive: boolean;
}

export interface SportCategory {
  id: number;
  name?: string;
}

export interface Game {
  id: number;
  tournamentId: number;
  teamIdOne: number;
  teamIdTwo: number;
  finalScore: string;
  startGame: string;
  endGame?: string | null;
  tournament?: Tournament | null;
  teamOne?: Team | null;
  teamTwo?: Team | null;
  isActive: boolean;
  referee?: string | null;
}
