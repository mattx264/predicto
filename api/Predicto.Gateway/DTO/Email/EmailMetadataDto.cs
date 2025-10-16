namespace Predicto.Gateway.DTO.Email
{
    public class EmailMetadataDto
    {
        public required string ToAddress { get; set; }
        public required string Subject { get; set; }
        public string? Body { get; set; }

    }
    public class EmailTemplateDto 
    {
        public required string ToAddress { get; set; }
        public int TemplateId { get; set; }
        public int UserId { get; set; }

    }
}
