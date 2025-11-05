public class DisplayName
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class Group
{
    public string Locale { get; set; }
    public string Description { get; set; }
}

public class MatchResult
{
    public string IdMatch { get; set; }
    public DateTime StartTime { get; set; }
    public int Result { get; set; }
    public string IdGroup { get; set; }
    public string IdStage { get; set; }
    public int? HomeTeamScore { get; set; }
    public int? AwayTeamScore { get; set; }
    public object HomeTeamPenaltyScore { get; set; }
    public object AwayTeamPenaltyScore { get; set; }
    public string HomeTeamId { get; set; }
    public string AwayTeamId { get; set; }
}



public class Result
{
    public int MatchDay { get; set; }
    public string IdCompetition { get; set; }
    public string IdSeason { get; set; }
    public string IdStage { get; set; }
    public string IdGroup { get; set; }
    public string IdTeam { get; set; }
    public DateTime Date { get; set; }
    public List<Group> Group { get; set; }
    public int Won { get; set; }
    public int Lost { get; set; }
    public int Drawn { get; set; }
    public int Played { get; set; }
    public int HomeWon { get; set; }
    public int HomeLost { get; set; }
    public int HomeDrawn { get; set; }
    public int HomePlayed { get; set; }
    public int AwayWon { get; set; }
    public int AwayLost { get; set; }
    public int AwayDrawn { get; set; }
    public int AwayPlayed { get; set; }
    public int Against { get; set; }
    public int For { get; set; }
    public int HomeAgainst { get; set; }
    public int HomeFor { get; set; }
    public int AwayAgainst { get; set; }
    public int AwayFor { get; set; }
    public int Position { get; set; }
    public int HomePosition { get; set; }
    public int AwayPosition { get; set; }
    public int Points { get; set; }
    public int HomePoints { get; set; }
    public int AwayPoints { get; set; }
    public int PreviousPosition { get; set; }
    public int GoalsDiference { get; set; }
    public int TeamConductScore { get; set; }
    public object QualificationStatus { get; set; }
    public bool IsLive { get; set; }
    public Team Team { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public double FairPlayCoefficient { get; set; }
    public int WinByExtraTime { get; set; }
    public int WinByPenalty { get; set; }
    public List<MatchResult> MatchResults { get; set; }
    public Properties Properties { get; set; }
    public object IsUpdateable { get; set; }
}

public class RootGroup
{
    public object ContinuationToken { get; set; }
    public object ContinuationHash { get; set; }
    public List<Result> Results { get; set; }
}

public class Team
{
    public string IdTeam { get; set; }
    public string IdConfederation { get; set; }
    public int Type { get; set; }
    public int AgeType { get; set; }
    public int FootballType { get; set; }
    public int Gender { get; set; }
    public List<Name> Name { get; set; }
    public string IdAssociation { get; set; }
    public object IdCity { get; set; }
    public object Headquarters { get; set; }
    public object TrainingCentre { get; set; }
    public object OfficialSite { get; set; }
    public string City { get; set; }
    public string IdCountry { get; set; }
    public string PostalCode { get; set; }
    public object RegionName { get; set; }
    public string ShortClubName { get; set; }
    public string Abbreviation { get; set; }
    public string Street { get; set; }
    public int FoundationYear { get; set; }
    public object Stadium { get; set; }
    public string PictureUrl { get; set; }
    public object ThumbnailUrl { get; set; }
    public List<DisplayName> DisplayName { get; set; }
    public List<object> Content { get; set; }
    public Properties Properties { get; set; }
    public object IsUpdateable { get; set; }
}

