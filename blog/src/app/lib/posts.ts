export interface Post {
  slug: string; // Unikalny identyfikator w URL
  title: string; // Tytuł artykułu
  excerpt: string; // Krótki opis widoczny na liście
  date: string; // Data publikacji (format YYYY-MM-DD)
  tournamentSlug: string; // Klucz łączący z turniejem, np. "el-ms-2026"
  league: string; // Pełna, wyświetlana nazwa turnieju/ligi
  image: string; // Ścieżka do obrazka posta
  author: string; // Autor posta
  content: string; // Pełna zawartość HTML posta
}

const allPosts: Post[] = [
  {
    slug: "eliminacje-mundial-2026",
    title: "Droga na Mundial: Kto jedzie do USA, Kanady i Meksyku?",
    excerpt:
      "Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA...",
    author: "Anna Kowalska",
    date: "2025-10-14",
    tournamentSlug: "el-ms-2026",
    league: "Eliminacje MŚ 2026",
    image: "/images/mundial-2026.jpg",
    content: `
      <p>Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA, Kanadzie i Meksyku, będzie wyjątkowy – po raz pierwszy w historii wezmą w nim udział aż 48 drużyn. To oznacza więcej emocji, ale też więcej niespodzianek na etapie kwalifikacji.</p>
      
      <h2>Nowy Format, Nowe Szanse</h2>
      <p>FIFA zdecydowała, że Mistrzostwa Świata 2026 obejmą 12 grup po cztery zespoły. Z każdej grupy do fazy pucharowej awansują po dwie drużyny oraz najlepsze trzecie miejsca. Ten format otworzył drzwi dla wielu krajów, które do tej pory tylko marzyły o grze na mundialu. W Europie walka toczy się jak zawsze na najwyższym poziomie – faworyci tacy jak Francja, Anglia, Niemcy czy Hiszpania nie mogą pozwolić sobie na potknięcia.</p>

      <h2>Europa: Walka Gigantów i Rewelacji</h2>
      <p>W europejskich grupach eliminacyjnych nie brakuje niespodzianek. Reprezentacja Szkocji i Węgier notują świetne wyniki, a Polska walczy o utrzymanie się w czołówce swojej grupy po nierównym początku. Francja i Portugalia tradycyjnie dominują, ale coraz częściej muszą się mierzyć z dobrze zorganizowanymi drużynami, które nie boją się grać ofensywnie.</p>

      <p><strong>Wnioski:</strong> Eliminacje do Mistrzostw Świata 2026 to nie tylko walka o awans, ale także test dla całych federacji – ich wizji, młodzieży i mentalności. Już teraz widać, że turniej w Ameryce Północnej może być najbardziej nieprzewidywalnym mundialem w historii.</p>
    `,
  },
  {
    slug: "polska-holandia-eliminacje-ms-2026",
    title:
      "Mecz o Wszystko: Polska przed Starcie z Holandią w Eliminacjach MŚ 2026",
    excerpt:
      "Analiza szans Biało-Czerwonych w kluczowym meczu o bezpośredni awans na mundial.",
    date: "2025-10-15",
    tournamentSlug: "el-ms-2026",
    league: "Eliminacje MŚ 2026",
    image: "/images/polska-holandia.jpg",
    author: "Anna Kowalska",
    content: `
      <p>Reprezentacja Polski staje przed kluczowym wyzwaniem w eliminacjach do Mistrzostw Świata 2026. Mecz z Holandią na PGE Narodowym może zadecydować o bezpośrednim awansie. Analizujemy taktykę, składy i szanse obu drużyn.</p>
      
      <h2>Siła Ofensywna Holandii</h2>
      <p>Reprezentacja 'Oranje' imponuje formą strzelecką w tych eliminacjach. Kluczem do sukcesu będzie zneutralizowanie ich szybkich skrzydłowych i kreatywnego środka pola. Selekcjoner postawił na sprawdzony blok defensywny, ale czy to wystarczy na tak klasowego rywala?</p>

      <h2>Nasza Szansa w Kontrataku</h2>
      <p>Biało-Czerwoni prawdopodobnie oddadzą inicjatywę rywalom, licząc na szybkie przejścia z obrony do ataku. Forma Roberta Lewandowskiego i Piotra Zielińskiego będzie kluczowa. Wsparcie trybun na PGE Narodowym może ponieść naszych piłkarzy do historycznego zwycięstwa.</p>
      
      <p><strong>Wnioski:</strong> Czeka nas zacięte widowisko, w którym o wyniku mogą zadecydować detale i dyspozycja dnia. Jedno jest pewne – emocji nie zabraknie, a walka potrwa do ostatniego gwizdka.</p>
    `,
  },

  {
    slug: "hiszpania-mistrzem-euro-2024",
    title: "Dominacja La Furia Roja: Hiszpania wygrywa EURO 2024!",
    excerpt:
      "Analiza finałowego meczu i drogi Hiszpanii po złoty medal Mistrzostw Europy 2024.",
    date: "2024-07-15",
    tournamentSlug: "euro-2024",
    league: "EURO 2024",
    image: "/images/hiszpania-euro.jpg",
    author: "Maciej Iwański",
    content: `
      <p>Hiszpania po raz kolejny na tronie Europy! Podopieczni Luisa de la Fuente zaprezentowali futbol totalny, dominując w finale przeciwko Anglii. Młodzi gwiazdorzy, Lamine Yamal i Nico Williams, rozbili defensywę rywali, a Rodri kontrolował środek pola.</p>
      <h2>Droga do Finału</h2>
      <p>Hiszpania przeszła przez turniej jak burza, wygrywając wszystkie mecze w "grupie śmierci" z Włochami i Chorwacją. W fazie pucharowej pokonali Niemcy i Francję, udowadniając, że są najlepiej zorganizowaną drużyną turnieju.</p>
    `,
  },
  {
    slug: "sensacja-euro-gruzja",
    title: "Sensacja na EURO 2024: Gruzja wychodzi z grupy!",
    excerpt:
      "Historyczny sukces debiutantów. Gruzja z Kwaracchelią na czele pokonuje Portugalię i melduje się w 1/8 finału.",
    date: "2024-06-27",
    tournamentSlug: "euro-2024",
    league: "EURO 2024",
    image: "/images/gruzja-euro.jpg",
    author: "Tomasz Zieliński",
    content: `
      <p>Nikt na nich nie stawiał, a jednak dokonali niemożliwego. Reprezentacja Gruzji, absolutny debiutant na Mistrzostwach Europy, zszokowała piłkarski świat. Po remisie z Czechami i porażce z Turcją, w meczu o wszystko pokonali 2:0 Portugalię!</p>
      <h2>Bohaterowie Narodu</h2>
      <p>Bohaterami zostali Chwicza Kwaracchelia, który otworzył wynik już w 2. minucie, oraz bramkarz Giorgi Mamardaszwili, który bronił w niesamowitych sytuacjach. Ten sukces to największy moment w historii gruzińskiej piłki.</p>
    `,
  },

  {
    slug: "messi-koronacja-mundial-2022",
    title:
      "Koronacja Króla: Messi poprowadził Argentynę do Mistrzostwa Świata!",
    excerpt:
      "Leo Messi spełnił swoje największe marzenie. Po jednym z najlepszych finałów w historii, Argentyna pokonała Francję.",
    date: "2022-12-19",
    tournamentSlug: "mundial-2022",
    league: "Mundial 2022",
    image: "/images/messi-mundial.jpg",
    author: "Piotr Wójcik",
    content: `
      <p>To był finał, który przejdzie do legendy. Dramaturgia, zwroty akcji, 6 goli i konkurs rzutów karnych. Lionel Messi w końcu zdobył trofeum, którego brakowało mu w kolekcji, i zamknął dyskusję na temat najlepszego piłkarza w historii.</p>
      <h2>Mbappe kontra Messi</h2>
      <p>Mecz był pojedynkiem dwóch generacji. Messi strzelił dwa gole, ale Kylian Mbappe odpowiedział hat-trickiem, niemal w pojedynkę ratując Francję. Ostatecznie w rzutach karnych lepsza okazała się Argentyna, a bohaterem został bramkarz Emiliano Martinez.</p>
    `,
  },
  {
    slug: "maroko-historyczny-polfinal-mundial-2022",
    title: "Lwy Atlasu Piszą Historię: Maroko w Półfinale Mundialu!",
    excerpt:
      "Pierwsza afrykańska drużyna w historii, która dotarła do półfinału Mistrzostw Świata. Analiza fenomenu Maroka.",
    date: "2022-12-11",
    tournamentSlug: "mundial-2022",
    league: "Mundial 2022",
    image: "/images/maroko-mundial.jpg",
    author: "Tomasz Zieliński",
    content: `
      <p>Turniej w Katarze przyniósł historyczny sukces dla Afryki. Reprezentacja Maroka, prowadzona przez Walida Regraguiego, złamała wszelkie bariery. Po wyjściu z grupy z Belgią i Chorwacją, w fazie pucharowej wyeliminowali Hiszpanię i Portugalię!</p>
      <h2>Żelazna Defensywa</h2>
      <p>Siłą Maroka była niesamowita organizacja w obronie. Przez cały turniej, aż do półfinału, nie stracili ani jednej bramki strzelonej przez rywala (jedyny gol to samobój). Sofyan Amrabat, Achraf Hakimi i Yassine Bounou stali się bohaterami nie tylko w swoim kraju, ale na całym kontynencie.</p>
    `,
  },
];

export async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
