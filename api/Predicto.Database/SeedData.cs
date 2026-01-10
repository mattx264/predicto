using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database
{
    public class SeedData
    {
        public Action<DbContext, bool> Data()
        {
            return (context, someFlag) =>
            {
                // Seed logic here, e.g.:
                if (!context.Set<SportCategoryEntity>().Any())
                {
                    context.Add(new SportCategoryEntity { Name = "Soccer" });//FIFA World Cup
                }
                if (!context.Set<TournamentEntity>().Any())
                {
                    context.Add(new TournamentEntity { Name = "FIFA World Cup", SportCategoryId = 1 });
                    context.Add(new TournamentEntity { Name = "Champions League", SportCategoryId = 1 });
                }
                context.SaveChanges();
                //   SeedArticles(context);

                //  context.SaveChanges();
            };
        }
        private void SeedArticles(DbContext context)
        {
            context.Add(new ArticleEntity
            {
                Title = "Droga na Mundial: Kto jedzie do USA, Kanady i Meksyku?",
                Content = " <p>Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA, Kanadzie i Meksyku, będzie wyjątkowy – po raz pierwszy w historii wezmą w nim udział aż 48 drużyn. To oznacza więcej emocji, ale też więcej niespodzianek na etapie kwalifikacji.</p>\r\n      \r\n      <h2>Nowy Format, Nowe Szanse</h2>\r\n      <p>FIFA zdecydowała, że Mistrzostwa Świata 2026 obejmą 12 grup po cztery zespoły. Z każdej grupy do fazy pucharowej awansują po dwie drużyny oraz najlepsze trzecie miejsca. Ten format otworzył drzwi dla wielu krajów, które do tej pory tylko marzyły o grze na mundialu. W Europie walka toczy się jak zawsze na najwyższym poziomie – faworyci tacy jak Francja, Anglia, Niemcy czy Hiszpania nie mogą pozwolić sobie na potknięcia.</p>\r\n\r\n      <h2>Europa: Walka Gigantów i Rewelacji</h2>\r\n      <p>W europejskich grupach eliminacyjnych nie brakuje niespodzianek. Reprezentacja Szkocji i Węgier notują świetne wyniki, a Polska walczy o utrzymanie się w czołówce swojej grupy po nierównym początku. Francja i Portugalia tradycyjnie dominują, ale coraz częściej muszą się mierzyć z dobrze zorganizowanymi drużynami, które nie boją się grać ofensywnie.</p>\r\n\r\n      <p><strong>Wnioski:</strong> Eliminacje do Mistrzostw Świata 2026 to nie tylko walka o awans, ale także test dla całych federacji – ich wizji, młodzieży i mentalności. Już teraz widać, że turniej w Ameryce Północnej może być najbardziej nieprzewidywalnym mundialem w historii.</p>",
                Author = "Anna Kowalska",
                CreateOn = new DateTime(2025, 10, 14),
                ShortDescription = "Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA...",
                Slug = "eliminacje-mundial-2026",
                Tag = "introduction, welcome, predicto",
                TournamentId = 1,
                // ImageUrl = "https://example.com/images/welcome.jpg"

            });
            context.Add(new ArticleEntity
            {
                Title = "Mecz o Wszystko: Polska przed Starcie z Holandią w Eliminacjach MŚ 2026",
                Content = " <p>Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA, Kanadzie i Meksyku, będzie wyjątkowy – po raz pierwszy w historii wezmą w nim udział aż 48 drużyn. To oznacza więcej emocji, ale też więcej niespodzianek na etapie kwalifikacji.</p>\r\n      \r\n      <h2>Nowy Format, Nowe Szanse</h2>\r\n      <p>FIFA zdecydowała, że Mistrzostwa Świata 2026 obejmą 12 grup po cztery zespoły. Z każdej grupy do fazy pucharowej awansują po dwie drużyny oraz najlepsze trzecie miejsca. Ten format otworzył drzwi dla wielu krajów, które do tej pory tylko marzyły o grze na mundialu. W Europie walka toczy się jak zawsze na najwyższym poziomie – faworyci tacy jak Francja, Anglia, Niemcy czy Hiszpania nie mogą pozwolić sobie na potknięcia.</p>\r\n\r\n      <h2>Europa: Walka Gigantów i Rewelacji</h2>\r\n      <p>W europejskich grupach eliminacyjnych nie brakuje niespodzianek. Reprezentacja Szkocji i Węgier notują świetne wyniki, a Polska walczy o utrzymanie się w czołówce swojej grupy po nierównym początku. Francja i Portugalia tradycyjnie dominują, ale coraz częściej muszą się mierzyć z dobrze zorganizowanymi drużynami, które nie boją się grać ofensywnie.</p>\r\n\r\n      <p><strong>Wnioski:</strong> Eliminacje do Mistrzostw Świata 2026 to nie tylko walka o awans, ale także test dla całych federacji – ich wizji, młodzieży i mentalności. Już teraz widać, że turniej w Ameryce Północnej może być najbardziej nieprzewidywalnym mundialem w historii.</p>",
                Author = "Anna Kowalska",
                CreateOn = new DateTime(2025, 10, 14),
                ShortDescription = "Analiza szans Biało-Czerwonych w kluczowym meczu o bezpośredni awans na mundial.",
                Slug = "polska-holandia-eliminacje-ms-2026",
                Tag = "introduction, welcome, predicto",
                TournamentId = 1,
                // ImageUrl = "https://example.com/images/welcome.jpg"

            });
        }
    }
}