export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  league: string;
  image: string;
  author: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
  const mockPosts: Post[] = [
    {
      slug: "eliminacje-mundial-2026",
      title: "Droga na Mundial: Kto jedzie do USA, Kanady i Meksyku?",
      excerpt:
        "Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA, Kanadzie i Meksyku, będzie wyjątkowy.",
      author: "Anna Kowalska",
      date: "2025-10-14",
      league: "Eliminacje MŚ 2026",
      image: "/images/mundial-2026.jpg",
      content: `
        <p>Eliminacje do Mistrzostw Świata 2026 wkraczają w decydującą fazę. Turniej, który odbędzie się w USA, Kanadzie i Meksyku, będzie wyjątkowy – po raz pierwszy w historii wezmą w nim udział aż 48 drużyn. To oznacza więcej emocji, ale też więcej niespodzianek na etapie kwalifikacji.</p>
        
        <h2>Nowy Format, Nowe Szanse</h2>
        <p>FIFA zdecydowała, że Mistrzostwa Świata 2026 obejmą 12 grup po cztery zespoły. Z każdej grupy do fazy pucharowej awansują po dwie drużyny oraz najlepsze trzecie miejsca. Ten format otworzył drzwi dla wielu krajów, które do tej pory tylko marzyły o grze na mundialu. W Europie walka toczy się jak zawsze na najwyższym poziomie – faworyci tacy jak Francja, Anglia, Niemcy czy Hiszpania nie mogą pozwolić sobie na potknięcia.</p>

        <h2>Europa: Walka Gigantów i Rewelacji</h2>
        <p>W europejskich grupach eliminacyjnych nie brakuje niespodzianek. Reprezentacja Szkocji i Węgier notują świetne wyniki, a Polska walczy o utrzymanie się w czołówce swojej grupy po nierównym początku. Francja i Portugalia tradycyjnie dominują, ale coraz częściej muszą się mierzyć z dobrze zorganizowanymi drużynami, które nie boją się grać ofensywnie.</p>

        <h2>Poza Europą: Sensacje z Ameryki i Azji</h2>
        <p>W Ameryce Południowej Brazylia i Argentyna idą łeb w łeb, ale uwagę przyciąga rewelacyjny start Ekwadoru. Z kolei w Azji Japonia i Korea Południowa znów imponują skutecznością, a Arabia Saudyjska po sukcesie z 2022 roku potwierdza, że jej piłka nożna rozwija się w szybkim tempie.</p>

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
      slug: "afryka-sensacje-eliminacje-ms-2026",
      title: "Sensacje w Afryce: Nigeria za Burtą, Debiutanci Jadą na Mundial!",
      excerpt:
        "Podsumowanie eliminacji w strefie CAF. Kto zaskoczył, a kto zawiódł? Poznaj afrykańskich uczestników MŚ 2026.",
      date: "2025-10-13",
      league: "Eliminacje MŚ 2026",
      image: "/images/afryka-ms2026.jpg",
      author: "Tomasz Zieliński",
      content: `
        <p>Eliminacje w Afryce przyniosły jedne z największych niespodzianek w walce o mundial 2026. Zwiększona liczba miejsc dla kontynentu (9 bezpośrednich) otworzyła drzwi dla nowych sił, jednocześnie brutalnie weryfikując dotychczasowych potentatów.</p>
        
        <h2>Upadek "Super Orłów"</h2>
        <p>Największym rozczarowaniem jest bez wątpienia Nigeria. Drużyna naszpikowana gwiazdami z czołowych lig europejskich, z Victorem Osimhenem na czele, nie zdołała wygrać swojej grupy. Seria remisów i nieoczekiwana porażka z Beninem pogrzebały ich szanse na bezpośredni awans, co w kraju uznano za katastrofę.</p>

        <h2>Historyczne Awanse</h2>
        <p>W cieniu porażki Nigerii, swoje święto obchodzą inni. Republika Zielonego Przylądka, po fantastycznej kampanii, po raz pierwszy w historii zagra na Mistrzostwach Świata. To efekt wieloletniej pracy i doskonałej organizacji. Awans zapewniły sobie również tradycyjne potęgi jak Maroko, Senegal i Egipt.</p>
        
        <p><strong>Podsumowanie:</strong> Afrykańskie eliminacje pokazały, że kontynent rozwija się piłkarsko w niesamowitym tempie, a różnice między czołówką a resztą stawki zacierają się. Mundial w USA, Kanadzie i Meksyku będzie miał silną i nieprzewidywalną reprezentację z Afryki.</p>
      `,
    },
    {
      slug: "azja-historyczni-debiutanci-ms-2026",
      title:
        "Historia Pisze się na Naszych Oczach: Uzbekistan i Jordania z Awensem na Mundial!",
      excerpt:
        "Sylwetki historycznych debiutantów z Azji. Jak wyglądała ich droga do pierwszych w historii Mistrzostw Świata?",
      date: "2025-10-11",
      league: "Eliminacje MŚ 2026",
      image: "/images/uzbekistan-jordania.jpg",
      author: "Piotr Wójcik",
      content: `
        <p>Azjatyckie eliminacje do Mistrzostw Świata 2026 przejdą do historii. Obok stałych bywalców, takich jak Japonia, Korea Południowa czy Arabia Saudyjska, awans wywalczyły dwie nacje, dla których będzie to absolutny debiut na największej scenie.</p>
        
        <h2>Uzbekistan: Spełnione Marzenie Pokoleń</h2>
        <p>"Białe Wilki" przez lata pukały do bram mundialu, często odpadając w ostatniej fazie eliminacji. Tym razem, pod wodzą trenera Srečko Katanca, drużyna pokazała niesamowitą dojrzałość taktyczną i żelazną defensywę. Awans przypieczętowali w ostatnim meczu, wygrywając z bezpośrednim rywalem, co wywołało euforię w całym kraju.</p>

        <h2>Jordania: Od Finalisty Pucharu Azji do Mundialu</h2>
        <p>Sukces Jordanii nie jest przypadkiem. Drużyna, która na początku 2024 roku sensacyjnie dotarła do finału Pucharu Azji, utrzymała fantastyczną formę. Ich siłą jest kolektyw i niesamowita wola walki. Jordańczycy udowodnili, że nie boją się nikogo i mogą być czarnym koniem turnieju.</p>
        
        <p><strong>Wnioski:</strong> Awans Uzbekistanu i Jordanii to dowód na to, jak poszerzenie formatu MŚ pozytywnie wpływa na globalny rozwój piłki nożnej, dając szansę nowym, ambitnym zespołom.</p>
      `,
    },
    {
      slug: "conmebol-dominacja-eliminacje-ms-2026",
      title:
        "Ameryka Południowa Pokazuje Moc: Potęgi z Awensem na Mundial 2026.",
      excerpt:
        "Argentyna i Brazylia na czele. Podsumowanie zakończonych eliminacji w strefie CONMEBOL. Kto zagra w barażach?",
      date: "2025-10-09",
      league: "Eliminacje MŚ 2026",
      image: "/images/conmebol.jpg",
      author: "Maciej Iwański",
      content: `
          <p>Eliminacje w Ameryce Południowej, uważane za najtrudniejsze na świecie, dobiegły końca. Zgodnie z przewidywaniami, czołowe reprezentacje kontynentu zapewniły sobie awans, choć nie obyło się bez zaciętej walki o poszczególne miejsca.</p>
          
          <h2>Argentyna i Brazylia na czele</h2>
          <p>Mistrzowie Świata, Argentyna, oraz odwieczni rywale, Brazylia, zdominowały rozgrywki, zapewniając sobie awans na kilka kolejek przed końcem. Obie drużyny przeszły przez eliminacje bez większych problemów, testując nowe warianty taktyczne i wprowadzając młodych zawodników.</p>
  
          <h2>Zacięta walka o resztę miejsc</h2>
          <p>O pozostałe cztery bezpośrednie miejsca walka toczyła się do samego końca. Ostatecznie awans wywalczyły solidne reprezentacje Urugwaju, Kolumbii, Ekwadoru i Paragwaju. Największym przegranym okazało się Chile, które po raz kolejni nie zdołało zakwalifikować się na mundial. Do baraży interkontynentalnych awansowała Boliwia, wykorzystując atut gry na własnym, wysoko położonym terenie.</p>
          
          <p><strong>Podsumowanie:</strong> CONMEBOL wyśle na mundial sześć niezwykle silnych drużyn, które z pewnością będą odgrywać kluczowe role w turnieju. Poziom rywalizacji w tej strefie pozostaje na niezmiennie wysokim poziomie.</p>
        `,
    },
    {
      slug: "format-ms-2026-nowe-zasady",
      title:
        "Nowe Oblicze Mundialu: Wszystko, Co Musisz Wiedzieć o Formacie MŚ 2026.",
      excerpt:
        "48 drużyn, 3 gospodarzy, nowy system rozgrywek. Wyjaśniamy rewolucyjne zmiany na największej piłkarskiej imprezie świata.",
      date: "2025-10-06",
      league: "Mistrzostwa Świata 2026",
      image: "/images/ms2026-format.jpg",
      author: "Anna Kowalska",
      content: `
          <p>Mistrzostwa Świata w 2026 roku będą rewolucyjne. Po raz pierwszy w historii turniej zorganizują trzy kraje: USA, Kanada i Meksyk. To jednak niejedyna zmiana – najważniejszą jest poszerzenie liczby uczestników z 32 do 48.</p>
          
          <h2>Faza Grupowa: 12 grup po 4 zespoły</h2>
          <p>FIFA ostatecznie zdecydowała się na format z 12 grupami czterozespołowymi. Z każdej grupy do fazy pucharowej awansują po dwie najlepsze drużyny oraz osiem najlepszych drużyn z trzecich miejsc. To oznacza, że z rywalizacji po fazie grupowej odpadnie tylko 16 reprezentacji.</p>
  
          <h2>Nowa faza pucharowa: 1/16 finału</h2>
          <p>Zwiększenie liczby drużyn w fazie pucharowej do 32 oznacza dodanie nowej rundy – 1/16 finału. Aby zdobyć mistrzostwo świata, zwycięska drużyna będzie musiała rozegrać aż osiem meczów, a nie siedem jak dotychczas. Cały turniej potrwa dłużej i obejmie rekordową liczbę 104 spotkań.</p>
          
          <p><strong>Konsekwencje:</strong> Nowy format daje szansę na udział w mundialu krajom, które do tej pory mogły o tym tylko marzyć. Krytycy wskazują jednak na potencjalne obniżenie poziomu sportowego w fazie grupowej i większe obciążenie dla piłkarzy. Jedno jest pewne – czeka nas największy mundial w historii.</p>
        `,
    },
    {
      slug: "europa-walka-o-awans-ms-2026",
      title:
        "Walka na Całego w Europie: Kto jest Bliski Awansu, a Kto Musi Drżeć do Końca?",
      excerpt:
        "Przegląd sytuacji w grupach eliminacyjnych UEFA. Szwecja w kryzysie, Anglia już pewna awansu. Co z resztą faworytów?",
      date: "2025-10-04",
      league: "Eliminacje MŚ 2026",
      image: "/images/europa-eliminacje.jpg",
      author: "Tomasz Zieliński",
      content: `
          <p>Na Starym Kontynencie walka o 16 miejsc na mundialu wkracza w decydującą fazę. Faworyci w większości spełniają oczekiwania, ale nie brakuje potknięć i niespodzianek.</p>
          
          <h2>Pewniacy i Rozczarowania</h2>
          <p>Jako pierwsza awans z Europy zapewniła sobie Anglia, która zdominowała swoją grupę. Blisko celu są również Hiszpania, Francja i Portugalia. Największym rozczarowaniem jest postawa Szwecji, która po serii słabych wyników ma już tylko matematyczne szanse na udział w barażach. To koniec pewnej epoki dla skandynawskiej piłki.</p>
  
          <h2>Polska w walce o baraże</h2>
          <p>Reprezentacja Polski toczy zacięty bój o drugie miejsce w grupie, które da prawo gry w barażach. Kluczowe okażą się ostatnie mecze, w tym bezpośrednie starcie z najgroźniejszym rywalem. Sytuacja jest napięta, a każdy punkt jest na wagę złota.</p>
          
          <p><strong>Co dalej:</strong> Zwycięzcy 12 grup awansują bezpośrednio. Zespoły z drugich miejsc oraz 4 najlepsze drużyny z Ligi Narodów (spoza czołowej dwójki w grupach el. MŚ) zagrają w marcu 2026 w dwustopniowych barażach o pozostałe 4 miejsca. Emocje gwarantowane do samego końca!</p>
        `,
    },
  ];
  return mockPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
