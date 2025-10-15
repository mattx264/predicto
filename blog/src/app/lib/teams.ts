export interface Player {
  name: string;
  position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik";
  club: string;
  number: number;
}

export interface Team {
  slug: string;
  name: string;
  flagEmoji: string;
  description: string;
  squad: Player[];
}

const teamsData: Team[] = [
  {
    slug: "polska",
    name: "Polska",
    flagEmoji: "🇵🇱",
    description: `
      <p>Reprezentacja Polski w piłce nożnej mężczyzn to drużyna, która od lat dostarcza kibicom niezapomnianych emocji. Biało-czerwoni dwukrotnie zajmowali trzecie miejsce na Mistrzostwach Świata w 1974 i 1982 roku, co uznawane jest za największe sukcesy w historii polskiej piłki.</p>
      <p>Obecnie drużyna przechodzi przez okres przebudowy, stawiając na mieszankę doświadczonych liderów, takich jak Robert Lewandowski, z młodymi, utalentowanymi zawodnikami wchodzącymi do kadry. Celem na najbliższe lata jest regularny udział w wielkich turniejach i nawiązanie do najlepszych tradycji polskiego futbolu.</p>
    `,
    squad: [
      {
        name: "Wojciech Szczęsny",
        position: "Bramkarz",
        club: "Juventus F.C.",
        number: 1,
      },
      {
        name: "Łukasz Skorupski",
        position: "Bramkarz",
        club: "Bologna FC",
        number: 12,
      },
      {
        name: "Jan Bednarek",
        position: "Obrońca",
        club: "Southampton F.C.",
        number: 5,
      },
      {
        name: "Jakub Kiwior",
        position: "Obrońca",
        club: "Arsenal F.C.",
        number: 14,
      },
      {
        name: "Matty Cash",
        position: "Obrońca",
        club: "Aston Villa F.C.",
        number: 2,
      },
      {
        name: "Przemysław Frankowski",
        position: "Pomocnik",
        club: "RC Lens",
        number: 24,
      },
      {
        name: "Piotr Zieliński",
        position: "Pomocnik",
        club: "S.S.C. Napoli",
        number: 20,
      },
      {
        name: "Sebastian Szymański",
        position: "Pomocnik",
        club: "Fenerbahçe S.K.",
        number: 19,
      },
      {
        name: "Jakub Moder",
        position: "Pomocnik",
        club: "Brighton & Hove Albion F.C.",
        number: 8,
      },
      {
        name: "Nicola Zalewski",
        position: "Pomocnik",
        club: "AS Roma",
        number: 21,
      },
      {
        name: "Robert Lewandowski",
        position: "Napastnik",
        club: "FC Barcelona",
        number: 9,
      },
      {
        name: "Arkadiusz Milik",
        position: "Napastnik",
        club: "Juventus F.C.",
        number: 7,
      },
      {
        name: "Krzysztof Piątek",
        position: "Napastnik",
        club: "İstanbul Başakşehir",
        number: 23,
      },
    ],
  },
  {
    slug: "niemcy",
    name: "Niemcy",
    flagEmoji: "🇩🇪",
    description: "<p>Informacje o reprezentacji Niemiec pojawią się tutaj.</p>",
    squad: [],
  },
  {
    slug: "anglia",
    name: "Anglia",
    flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    description: "<p>Informacje o reprezentacji Anglii pojawią się tutaj.</p>",
    squad: [],
  },
  {
    slug: "francja",
    name: "Francja",
    flagEmoji: "🇫🇷",
    description: "<p>Informacje o reprezentacji Francji pojawią się tutaj.</p>",
    squad: [],
  },
  {
    slug: "hiszpania",
    name: "Hiszpania",
    flagEmoji: "🇪🇸",
    description:
      "<p>Informacje o reprezentacji Hiszpanii pojawią się tutaj.</p>",
    squad: [],
  },
  {
    slug: "wlochy",
    name: "Włochy",
    flagEmoji: "🇮🇹",
    description: "<p>Informacje o reprezentacji Włoch pojawią się tutaj.</p>",
    squad: [],
  },
];

export async function getTeams(): Promise<Team[]> {
  return teamsData;
}

export async function getTeamBySlug(slug: string): Promise<Team | undefined> {
  const teams = await getTeams();
  return teams.find((team) => team.slug === slug);
}
