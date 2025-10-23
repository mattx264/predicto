using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentEntity : IEntity
    {
        //Football World Cup, UEFA Champions League, NBA Finals, Wimbledon, Super Bowl, World Series, Stanley Cup, Rugby World Cup, ICC Cricket World Cup
        public int Id { get; set; }
        public int SportCategoryId { get; set; }
        public virtual SportCategoryEntity SportCategory { get; set; }
        public required string Name { get; set; }
        //public virtual IList<TeamEntity> Teams { get; set; } = new List<TeamEntity>();
        public bool IsActive { get; set; } = true;
    }
}

//id: "1",
//      name: "Liga Mistrzów UEFA 2025/26 - Faza Grupowa",
//      league: "Champions League",
//      description: "Wszystkie mecze fazy grupowej Ligi Mistrzów UEFA.",
//      matchesCount: 96,
//      startDate: "2025-09-16",
//      endDate: "2025-12-10",
//      logoUrl: "/tournament-logos/championsleague.png",
//    },
/*  {
      id: "1",
      name: "Liga Mistrzów UEFA 2025/26 - Faza Grupowa",
      league: "Champions League",
      description: "Wszystkie mecze fazy grupowej Ligi Mistrzów UEFA.",
      matchesCount: 96,
      startDate: "2025-09-16",
      endDate: "2025-12-10",
      logoUrl: "/tournament-logos/championsleague.png",
    },
    {
      id: "2",
      name: "Premier League 2025/26 - Runda Jesienna",
      league: "Premier League",
      description:
        "Typuj wyniki pierwszych 19 kolejek angielskiej Premier League.",
      matchesCount: 190,
      startDate: "2025-08-16",
      endDate: "2025-12-28",
      logoUrl: "/tournament-logos/premier-league.png",
    },
    {
      id: "3",
      name: "La Liga 2025/26 - Początek Sezonu",
      league: "La Liga",
      description: "Pierwsza połowa sezonu hiszpańskiej ekstraklasy.",
      matchesCount: 190,
      startDate: "2025-08-15",
      endDate: "2025-12-21",
      logoUrl: "/tournament-logos/laliga.png",
    },
    {
      id: "4",
      name: "Bundesliga 2025/26 - Runda Jesienna",
      league: "Bundesliga",
      description: "Wszystkie mecze rundy jesiennej Bundesligi.",
      matchesCount: 153,
      startDate: "2025-08-22",
      endDate: "2025-12-21",
      logoUrl: "/tournament-logos/bundesliga.png",
    },
    {
      id: "5",
      name: "Serie A 2025/26 - Pierwsze 15 kolejek",
      league: "Serie A",
      description: "Początek zmagań we włoskiej Serie A, pierwsze 15 kolejek.",
      matchesCount: 150,
      startDate: "2025-08-23",
      endDate: "2025-12-14",
      logoUrl: "/tournament-logos/serie-a.png",
    },
    {
      id: "6",
      name: "Ekstraklasa 2025/26 - Runda Jesienna",
      league: "Ekstraklasa",
      description: "Wszystkie mecze rundy jesiennej polskiej ekstraklasy.",
      matchesCount: 153,
      startDate: "2025-07-18",
      endDate: "2025-12-15",
      logoUrl: "/tournament-logos/ekstraklasa.png",
    },*/