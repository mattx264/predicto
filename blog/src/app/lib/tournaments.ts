export interface Tournament {
  id: string;
  name: string;
  slug: string;
}

export const TOURNAMENTS: Tournament[] = [
  { id: "1", name: "El. MŚ 2026", slug: "el-ms-2026" },
  { id: "2", name: "EURO 2024", slug: "euro-2024" },
  { id: "3", name: "Mundial 2022", slug: "mundial-2022" },
];

export const DEFAULT_TOURNAMENT = TOURNAMENTS[0];
