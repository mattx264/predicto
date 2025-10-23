export interface Player {
  id: string;
  slug: string;
  name: string;
  position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik";
  number: number;
  club: string;
  image: string;
  clubLogo: string;
  dateOfBirth: string;
  height: string;
  marketValue: string;
  bio: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  flag: string;
  description: string;
  coach: string;
  keyPlayer: string;
  recentForm: ("W" | "D" | "L")[];
  squad: Player[];
}

const elMs2026Teams: Team[] = [
  {
    id: "pol",
    slug: "polska",
    name: "Polska",
    flag: "PL",
    description:
      "Reprezentacja Polski w piłce nożnej, członek FIFA od 1923 roku. Biało-czerwoni to dwukrotni medaliści Mistrzostw Świata, którzy w 1974 i 1982 roku zajmowali trzecie miejsce. Obecnie drużyna przechodzi przez okres przebudowy, stawiając na młodych, utalentowanych zawodników grających w czołowych ligach europejskich.",
    coach: "Jan Urban",
    keyPlayer: "Robert Lewandowski",
    recentForm: ["W", "D", "L", "W", "W"],
    squad: [
      {
        id: "pl1",
        slug: "wojciech-szczesny",
        name: "Wojciech Szczęsny",
        position: "Bramkarz",
        number: 1,
        club: "FC Barcelona",
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/barcelona.vresize.350.350.medium.0.png",

        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/132.vresize.350.350.medium.1.png",
        dateOfBirth: "18 kwietnia 1990",
        height: "196 cm",
        marketValue: "15 mln €",
        bio: "Jeden z najlepszych polskich bramkarzy w historii. Znany z niesamowitego refleksu na linii i umiejętności bronienia rzutów karnych. W swojej karierze reprezentował takie kluby jak Arsenal, AS Roma, a obecnie jest filarem Juventusu.",
      },
      {
        id: "pl2",
        slug: "robert-lewandowski",
        name: "Robert Lewandowski",
        position: "Napastnik",
        number: 9,
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/barcelona.vresize.350.350.medium.0.png",

        club: "FC Barcelona",
        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/2100.vresize.350.350.medium.1.png",
        dateOfBirth: "21 sierpnia 1988",
        height: "185 cm",
        marketValue: "40 mln €",
        bio: "Kapitan i absolutna legenda reprezentacji Polski, najlepszy strzelec w jej historii. Uważany za jednego z najwybitniejszych napastników swojego pokolenia. Zdobywca Złotego Buta, wielokrotny król strzelców Bundesligi.",
      },
      {
        id: "pl3",
        slug: "piotr-zielinski",
        name: "Piotr Zieliński",
        position: "Pomocnik",
        number: 20,
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/inter-milan.vresize.350.350.medium.1.png",

        club: "Inter Mediolan",
        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/1610.vresize.350.350.medium.1.png",
        dateOfBirth: "20 maja 1994",
        height: "180 cm",
        marketValue: "35 mln €",
        bio: "Kreatywny i technicznie uzdolniony pomocnik, serce drugiej linii zarówno w klubie, jak i w reprezentacji. Słynie z doskonałego dryblingu, precyzyjnych podań i potężnego uderzenia z dystansu.",
      },
      {
        id: "pl4",
        slug: "jakub-kiwior",
        name: "Jakub Kiwior",
        position: "Obrońca",
        number: 14,
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/fc-porto.vresize.350.350.medium.0.png",

        club: "FC Porto",
        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/80826.vresize.350.350.medium.1.png",
        dateOfBirth: "15 lutego 2000",
        height: "189 cm",
        marketValue: "25 mln €",
        bio: "Wszechstronny, lewonożny obrońca, który może grać zarówno na środku, jak i na lewej stronie defensywy. Ceniony za spokój w rozegraniu piłki i umiejętność czytania gry.",
      },
      {
        id: "pl5",
        slug: "jan-bednarek",
        name: "Jan Bednarek",
        position: "Obrońca",
        number: 5,
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/fc-porto.vresize.350.350.medium.0.png",

        club: "FC Porto",
        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/34909.vresize.350.350.medium.1.png",
        dateOfBirth: "12 kwietnia 1996",
        height: "189 cm",
        marketValue: "12 mln €",
        bio: "Doświadczony środkowy obrońca, znany z dobrej gry w powietrzu i nieustępliwości w pojedynkach. Od lat stanowi ważny punkt defensywy zarówno w klubie, jak i w kadrze narodowej.",
      },
      {
        id: "pl6",
        slug: "sebastian-szymanski",
        name: "Sebastian Szymański",
        position: "Pomocnik",
        number: 19,
        clubLogo:
          "https://b.fssta.com/uploads/application/soccer/team-logos/fenerbahce.vresize.350.350.medium.0.png",

        club: "Fenerbahçe S.K.",
        image:
          "https://b.fssta.com/uploads/application/soccer/headshots/44616.vresize.350.350.medium.1.png",
        dateOfBirth: "10 maja 1999",
        height: "174 cm",
        marketValue: "20 mln €",
        bio: "Dynamiczny i kreatywny ofensywny pomocnik, który potrafi zarówno strzelić gola, jak i wypracować sytuację kolegom. Jego wszechstronność i wizja gry czynią go kluczową postacią w ataku.",
      },
    ],
  },
  {
    id: "ger",
    slug: "niemcy",
    name: "Niemcy",
    flag: "DE",
    description: "Czterokrotni mistrzowie świata.",
    coach: "Julian Nagelsmann",
    keyPlayer: "Jamal Musiala",
    recentForm: ["W", "L", "D", "W", "L"],
    squad: [],
  },
  {
    id: "eng",
    slug: "anglia",
    name: "Anglia",
    flag: "GB",
    description: "Kolebka futbolu.",
    coach: "Gareth Southgate",
    keyPlayer: "Jude Bellingham",
    recentForm: ["W", "W", "D", "W", "W"],
    squad: [],
  },
  {
    id: "fra",
    slug: "francja",
    name: "Francja",
    flag: "FR",
    description: "Mistrzowie Świata 2018.",
    coach: "Didier Deschamps",
    keyPlayer: "Kylian Mbappé",
    recentForm: ["W", "W", "W", "L", "D"],
    squad: [],
  },
];

const euro2024Teams: Team[] = [
  {
    id: "esp",
    slug: "hiszpania",
    name: "Hiszpania",
    flag: "ES",
    description: "Mistrzowie Europy 2024.",
    coach: "Luis de la Fuente",
    keyPlayer: "Lamine Yamal",
    recentForm: ["W", "W", "W", "W", "W"],
    squad: [],
  },
  {
    id: "ita",
    slug: "wlochy",
    name: "Włochy",
    flag: "IT",
    description: "Obrońcy tytułu Mistrza Europy (z 2020).",
    coach: "Luciano Spalletti",
    keyPlayer: "Nicolo Barella",
    recentForm: ["W", "D", "W", "L", "W"],
    squad: [],
  },
];

const mundial2022Teams: Team[] = [
  {
    id: "arg",
    slug: "argentyna",
    name: "Argentyna",
    flag: "AR",
    description: "Mistrzowie Świata 2022.",
    coach: "Lionel Scaloni",
    keyPlayer: "Lionel Messi",
    recentForm: ["W", "W", "W", "W", "W"],
    squad: [],
  },
  {
    id: "mar",
    slug: "maroko",
    name: "Maroko",
    flag: "MA",
    description: "Rewelacja Mundialu 2022, półfinalista.",
    coach: "Walid Regragui",
    keyPlayer: "Achraf Hakimi",
    recentForm: ["W", "D", "W", "L", "W"],
    squad: [],
  },
  {
    id: "fra",
    slug: "francja",
    name: "Francja",
    flag: "FR",
    description: "Finaliści Mundialu 2022.",
    coach: "Didier Deschamps",
    keyPlayer: "Kylian Mbappé",
    recentForm: ["W", "W", "W", "L", "D"],
    squad: [],
  },
];

const allTeamsDatabase: Record<string, Team[]> = {
  "el-ms-2026": elMs2026Teams,
  "euro-2024": euro2024Teams,
  "mundial-2022": mundial2022Teams,
};

export async function getTeams(tournamentSlug: string): Promise<Team[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return allTeamsDatabase[tournamentSlug] || [];
}

export async function getTeamBySlug(
  tournamentSlug: string,
  slug: string
): Promise<Team | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const teams = await getTeams(tournamentSlug);
  return teams.find((team) => team.slug === slug);
}

export async function getPlayerBySlug(
  tournamentSlug: string,
  teamSlug: string,
  playerSlug: string
): Promise<Player | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const team = await getTeamBySlug(tournamentSlug, teamSlug);
  if (!team) return undefined;

  return team.squad.find((player) => player.slug === playerSlug);
}
