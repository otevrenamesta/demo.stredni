# Demo [web "středně velkého města"](https://stredni.web.otevrenamesta.cz/) - ORP

## Obecně

Web se skládá ze stránek, které jsou hierarchicky uspořádány.
Hierarchie by měla ideálně odpovídat logice detailu informace.
Tj. titulka by měla "naťuknout" (pouze perex nebo klíčový popis) ty nejdůležitější informace webu a nabídnout proklik na detail níže v hierarchii.

Každá stránka je složena z povinných atributů (název, popis, aj.)
a hlavně z hierarchie komponent.
Komponenty logickým a uživatelsky přívětivým způsobem prezentují různorodé informace.
Nejjednodušší komponenta je "[markdown](https://cs.wikipedia.org/wiki/Markdown) text".
[Markdown](https://cs.wikipedia.org/wiki/Markdown) je způsob jednoduchého strukturování textu.
S takovým textem je možné jednoduše na webu pracovat (vizuálně správné vykreslení, apod.)

Ty nejjednodušší weby se klidně mohou obejít pouze s touto komponentou.
Často je však žádoucí, aby informace byly prezentovány v zajímavější podobě,
např. kontatkní informace pomocí řádky boxů se jménem, pozicí, kulatou fotografií
a zbytkem kontaktních informací i s patřičnými ikonami.
To už vyžaduje spec. komponetu a strukturu dat, které se pomocí ní, kreslí.

## Web obce

Dobrý web obce zatěžuje úředníky co možná nejméně.
Má jednoduchý způsob zprávy a umožňuje neduplikovat práci = umí se napojit 
na existující IS, které úředníci tak jako tak používají.
Udržuje se tedy aktuální defacto automaticky.

### obecně

Každá obec na svých webových stránkách __musí__ mít:
https://www.zakonyprolidi.cz/cs/2020-515/zneni-20201226

Další užitečné "komponenty" webu obce bývají:
- kalendář akcí
- blogovací systém - kategorizované informace
- klíčové investice / strategický plán
- aj.

Web je __"lepidlo otevřených dat"__ z externích zdrojů / informačních systémů (IS).
Takovým systémem může být již fungující IS úřední desky.
Aby se informace z úřední desky dostaly na web, stačí pouze implementovat komponentu,
která se na tento IS připojí, stáhne si informace ve strojově čitelné formě (např. JSON)
a vykreslí je uživatelsky přívětivým způsobem.

## integrace na existující systémy obce

Jinou takovou komponentou může být IS pro kalendář akcí.
Příkladem integrace na takový IS je komponenta [kalendarBest.js](_service/components/kalendarBest.js).
Tato má za ůkol načíst z nastaveného URL x nejnovějších událostí 
a nakreslit jejich seznam s proklikem na detail.
Tato komponenta je mj. použita na titulce (v pravém sloupci).
Její použití znamená [definovat název komponenty a její atributy](index.yaml#L65):
- url datového zdroje
- počet nejnovějších položek

## Vizuální styl

Demoweb používá stylovací framework [bulma.io](https://bulma.io/).
Jedná se o otevřený, plně customizovatelný system, který tvoří řada odborníků.