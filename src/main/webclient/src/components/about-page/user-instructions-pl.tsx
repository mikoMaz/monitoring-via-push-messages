import { Box, Heading, Text, Code, List, ListItem } from "@chakra-ui/react";

export const UserInstructions = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={6}>
                Dokumentacja użytkowa aplikacji ErrWarn
            </Heading>

            <Heading as="h2" size="lg" mt={6} mb={4}>
                Opis aplikacji
            </Heading>
            <Text mb={4}>
                Aplikacja składa się z dwóch segmentów: <Code>/preview</Code> i <Code>/application</Code>. Obie podstrony odpowiednio są sekcją dla
                niezalogowanych i zalogowanych użytkowników. Oba prezentują aktualny status urządzeń firmy z różnicą szczegółowości w prezentacji danych. <Code>/application</Code> ponadto zawiera panel administracyjny dla uprawnionych użytkowników do modyfikacji różnych parametrów firmy.
            </Text>

            <Heading as="h2" size="lg" mt={6} mb={4}>
                /preview
            </Heading>
            <Text mb={4}>
                Część <Code>/preview</Code> nie wymaga od użytkownika zalogowania się. Prawidłowy dostęp do strony użytkownik otrzyma po określeniu firmy przez parametry URL, np.:
            </Text>
            <Code display="block" mb={4}>
                https://errwarn.projektstudencki.pl/preview?context=test-company
            </Code>
            <Text mb={4}>
                Użytkownik zostaje poproszony o podanie sekretu dla wskazanej firmy. Po sukcesywnej walidacji sekretu zostaje przydzielony dostęp. Widok strony składa się z komponentu z nazwą firmy i ilością dostępnych urządzeń oraz dwóch wykresów, które prezentują aktualny status urządzeń firmy.
            </Text>
            <Text mb={4}>
                <Code>Preview</Code> nie odświeża się, to znaczy, że po wejściu w link prezentowane są najbardziej aktualne dane w momencie otworzenia strony. Aby je zaktualizować, trzeba odświeżyć kartę przeglądarki.
            </Text>

            <Heading as="h2" size="lg" mt={6} mb={4}>
                /application
            </Heading>
            <Text mb={4}>
                <Code>/application</Code> składa się z trzech kluczowych podstron: <Code>/monitoring</Code>, <Code>/dashboard</Code> oraz <Code>/admin</Code>. Cała aplikacja odświeża się co 3 minuty, żeby prezentować aktualne dane.
            </Text>

            <Heading as="h3" size="md" mt={4} mb={3}>
                /monitoring
            </Heading>
            <Text mb={4}>
                <Code>/monitoring</Code> zawiera interaktywne tabele z listą urządzeń:
            </Text>
            <Code display="block" mb={4}>
                https://errwarn.projektstudencki.pl/application/monitoring?view=allDevices
            </Code>
            <List spacing={2} mb={4}>
                <ListItem>
                    <Code>All Devices</Code>: wszystkie urządzenia ułożone w hierarchię dziecko-rodzic według zasad grupowania urządzeń zdefiniowanych w modelu biznesowym. Wiersze z urządzeniami grupującymi są zwijalne.
                </ListItem>
                <ListItem>
                    <Code>Bridges, Gateways, Sensors</Code>: poszczególne tabele z urządzeniami ze względu na typ.
                </ListItem>
            </List>
            <Text mb={4}>
                Parametr <Code>view</Code> w URL zmienia się ze względu na wybrany widok urządzeń. Urządzenia można sortować i filtrować po <Code>id</Code>. Po kliknięciu w wybrane urządzenie aplikacja przenosi użytkownika do widoku urządzenia, gdzie można znaleźć podstawowe informacje o wybranym urządzeniu oraz wykres jego aktywności.
            </Text>

            <Heading as="h3" size="md" mt={4} mb={3}>
                /dashboard
            </Heading>
            <Text mb={4}>
                <Code>/dashboard</Code> jest widokiem wykresów urządzeń oraz kreatora customowych wykresów. Pierwsze trzy zakładki (<Code>Current</Code>, <Code>Recent</Code>, <Code>History</Code>) to główne wykresy, które reprezentują status urządzeń firmy. W zakładce <Code>Custom</Code> znajduje się kreator wykresów, gdzie można tworzyć własne "presety" wykresów z personalizowanymi parametrami, jak rozdrobnienie danych czy filtr typu urządzenia.
            </Text>
            <Text mb={4}>
                Presety są zapisane w <Code>localStorage</Code> przeglądarki, co oznacza, że po przeładowaniu strony są dalej widoczne. Aby zobaczyć je na innym urządzeniu, można skorzystać z opcji wyeksportowania wykresu do pliku JSON, który można wczytać w kreatorze.
            </Text>

            <Heading as="h3" size="md" mt={4} mb={3}>
                /admin
            </Heading>
            <Text mb={4}>
                <Code>/admin</Code> jest sekcją zarezerwowaną dla właścicieli firm i uprzywilejowanych użytkowników. Nawet po wpisaniu ręcznie adresu podstrony, jeżeli użytkownik nie posiada uprawnień, nie zostanie dopuszczony do panelu administracyjnego. W zależności od uprawnień użytkownik zobaczy tylko niektóre opcje.
            </Text>
            <List spacing={2} mb={4}>
                <ListItem>
                    Właściciel firmy (<Code>ADMIN</Code>) może zmienić uprawnienia użytkowników przypisanych do jego firmy oraz zmienić sekret firmy wykorzystywany w sekcji <Code>/preview</Code>.
                </ListItem>
                <ListItem>
                    Uprawniony użytkownik (<Code>SUPER_ADMIN</Code>) ma te same opcje plus możliwość dodania firmy oraz użytkowników do firm. Ponadto ma dostęp do sekcji wgrywania plików <Code>.csv</Code>, którymi można przypisać urządzenia do firmy, ustawić zależności między urządzeniami w firmie oraz tworzyć alerty informujące o braku aktywności urządzeń.
                </ListItem>
            </List>
        </Box>
    );
}
