public class Alias
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class AwayTeam
{
    public int? Score { get; set; }
    public object Side { get; set; }
    public string IdTeam { get; set; }
    public string PictureUrl { get; set; }
    public string IdCountry { get; set; }
    public int TeamType { get; set; }
    public int AgeType { get; set; }
    public string Tactics { get; set; }
    public List<TeamName> TeamName { get; set; }
    public string Abbreviation { get; set; }
    public List<Coach> Coaches { get; set; }
    public List<Player> Players { get; set; }
    public List<Booking> Bookings { get; set; }
    public List<Goal> Goals { get; set; }
    public List<Substitution> Substitutions { get; set; }
    public int FootballType { get; set; }
    public int Gender { get; set; }
    public string IdAssociation { get; set; }
    public string ShortClubName { get; set; }
}

public class BallPossession
{
    public List<object> Intervals { get; set; }
    public List<object> LastX { get; set; }
    public double OverallHome { get; set; }
    public double OverallAway { get; set; }
}

public class Booking
{
    public int Card { get; set; }
    public int Period { get; set; }
    public object IdEvent { get; set; }
    public object EventNumber { get; set; }
    public string IdPlayer { get; set; }
    public object IdCoach { get; set; }
    public string IdTeam { get; set; }
    public string Minute { get; set; }
    public object Reason { get; set; }
}

public class CityName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Coach
{
    public string IdCoach { get; set; }
    public string IdCountry { get; set; }
    public object PictureUrl { get; set; }
    public List<Name> Name { get; set; }
    public List<Alias> Alias { get; set; }
    public int Role { get; set; }
    public object SpecialStatus { get; set; }
}

public class CompetitionName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Goal
{
    public int Type { get; set; }
    public string IdPlayer { get; set; }
    public string Minute { get; set; }
    public object IdAssistPlayer { get; set; }
    public int Period { get; set; }
    public object IdGoal { get; set; }
    public string IdTeam { get; set; }
}

public class HomeTeam
{
    public int? Score { get; set; }
    public object Side { get; set; }
    public string IdTeam { get; set; }
    public string PictureUrl { get; set; }
    public string IdCountry { get; set; }
    public int TeamType { get; set; }
    public int AgeType { get; set; }
    public string Tactics { get; set; }
    public List<TeamName> TeamName { get; set; }
    public string Abbreviation { get; set; }
    public List<Coach> Coaches { get; set; }
    public List<Player> Players { get; set; }
    public List<Booking> Bookings { get; set; }
    public List<Goal> Goals { get; set; }
    public List<Substitution> Substitutions { get; set; }
    public int FootballType { get; set; }
    public int Gender { get; set; }
    public string IdAssociation { get; set; }
    public string ShortClubName { get; set; }
}

public class Name
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class NameShort
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Official
{
    public string IdCountry { get; set; }
    public string OfficialId { get; set; }
    public List<NameShort> NameShort { get; set; }
    public List<Name> Name { get; set; }
    public int OfficialType { get; set; }
    public List<TypeLocalized> TypeLocalized { get; set; }
}

public class Player
{
    public string IdPlayer { get; set; }
    public string IdTeam { get; set; }
    public int? ShirtNumber { get; set; }
    public int Status { get; set; }
    public object SpecialStatus { get; set; }
    public bool Captain { get; set; }
    public List<PlayerName> PlayerName { get; set; }
    public List<ShortName> ShortName { get; set; }
    public int Position { get; set; }
    public object PlayerPicture { get; set; }
    public int FieldStatus { get; set; }
    public object LineupX { get; set; }
    public object LineupY { get; set; }
}

public class PlayerName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class PlayerOffName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class PlayerOnName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Properties
{
    public string IdIFES { get; set; }
    public string StatsPerformIfesId { get; set; }
    public string IdStatsPerform { get; set; }
    public string PostMatchDataIsLoadedFromFdhIfes { get; set; }
}

public class FifaComGameModel
{
    public string IdMatch { get; set; }
    public string IdStage { get; set; }
    public string IdGroup { get; set; }
    public string IdSeason { get; set; }
    public int CoverageLevel { get; set; }
    public string IdCompetition { get; set; }
    public List<CompetitionName> CompetitionName { get; set; }
    public List<SeasonName> SeasonName { get; set; }
    public List<object> SeasonShortName { get; set; }
    public Stadium Stadium { get; set; }
    public int ResultType { get; set; }
    public string MatchDay { get; set; }
    public object MatchNumber { get; set; }
    public object HomeTeamPenaltyScore { get; set; }
    public object AwayTeamPenaltyScore { get; set; }
    public object AggregateHomeTeamScore { get; set; }
    public object AggregateAwayTeamScore { get; set; }
    public object Weather { get; set; }
    public string Attendance { get; set; }
    public DateTime Date { get; set; }
    public DateTime LocalDate { get; set; }
    public string MatchTime { get; set; }
    public object SecondHalfTime { get; set; }
    public object FirstHalfTime { get; set; }
    public int? FirstHalfExtraTime { get; set; }
    public int? SecondHalfExtraTime { get; set; }
    public string Winner { get; set; }
    public int Period { get; set; }
    public HomeTeam HomeTeam { get; set; }
    public AwayTeam AwayTeam { get; set; }
    public BallPossession BallPossession { get; set; }
    public object TerritorialPossesion { get; set; }
    public object TerritorialThirdPossesion { get; set; }
    public List<Official> Officials { get; set; }
    public int MatchStatus { get; set; }
    public List<object> GroupName { get; set; }
    public List<object> StageName { get; set; }
    public int OfficialityStatus { get; set; }
    public bool TimeDefined { get; set; }
    public Properties Properties { get; set; }
    public object IsUpdateable { get; set; }
}

public class SeasonName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class ShortName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Stadium
{
    public string IdStadium { get; set; }
    public List<Name> Name { get; set; }
    public object Capacity { get; set; }
    public object WebAddress { get; set; }
    public object Built { get; set; }
    public bool Roof { get; set; }
    public object Turf { get; set; }
    public string IdCity { get; set; }
    public List<CityName> CityName { get; set; }
    public string IdCountry { get; set; }
    public object PostalCode { get; set; }
    public object Street { get; set; }
    public object Email { get; set; }
    public object Fax { get; set; }
    public object Phone { get; set; }
    public object AffiliationCountry { get; set; }
    public object AffiliationRegion { get; set; }
    public object Latitude { get; set; }
    public object Longitude { get; set; }
    public object Length { get; set; }
    public object Width { get; set; }
    public Properties Properties { get; set; }
    public object IsUpdateable { get; set; }
}

public class Substitution
{
    public object IdEvent { get; set; }
    public int Period { get; set; }
    public int Reason { get; set; }
    public int SubstitutePosition { get; set; }
    public string IdPlayerOff { get; set; }
    public string IdPlayerOn { get; set; }
    public List<PlayerOffName> PlayerOffName { get; set; }
    public List<PlayerOnName> PlayerOnName { get; set; }
    public string Minute { get; set; }
    public string IdTeam { get; set; }
}

public class TeamName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class TypeLocalized
{
    public string Locale { get; set; }
    public string Description { get; set; }
}