# ZT project

Projekt strony dla zespołu testów w Cyfrowym Polsacie

## TODO

1. - [x] Zrobić modal
		- [x] - Uzupełnianie go aktualnymi danymi [5]
		- [x] - Zrobić animacje [5]
2. - [x] - Zrobić formularz dodawania urządzeń
3. - [x] Zrobić powiadomienia o zaktualizowaniu, dodaniu oraz usunieciu urzadzenia [3]
4. - [x] Zrobić sortowanie kolumn (Poprawić hover oraz refactor funkcji `sort`)[5]
5. - [ ] Panel administracyjny pod adresem `localhost:port/admin` [10]
		- [ ] - Przenieść tam dodawanie urządzeń
		- [ ] - Dodawanie urlopu
6. - [ ] Stworzyć podstrony `backlog` oraz `W trakcie realizacji` (trzeba pomyśleć jak miałoby to wyglądać) [~]
7. - [ ] Kliknięcie wyświetla informację na temat urządzenia (Pomyśleć nad widokiem) [~]
8. - [ ] Zrobić stronę z urlopami (Wypisane miesiące i mozna wpisywać kto kiedy ma urlop) [3]
9. - [x] Zamienić SetInterval który jest `Pseudo RealTime` na `socket.io` który faktycznie odświezy stronę gdy pojawi się nowy wpis na serwerze (przebudowa logiki aplikacj)[15]
10. - [ ] Dodać `redux` do projektu który ułatwi komunikację między komponentami [~]
11. - [x] Zmienić formularz dodawania urządzeń, na ikonę `plus`, a po kliknięciu wyświetla się modal (Sprawdzić czy mozna skorzystać z istniejącego komponentu `DeviceModal`)
12. - [ ] Obsługa braku internetu
		- [ ] - Serwer
		- [ ] - Klient
13. - [ ] Obsługa błędów
14. - [ ] PWA - https://piecioshka.pl/blog/2017/05/07/jak-przerobic-strone-na-pwa.html
15. - [ ] Przebudować server (utworzyć odpowiednie funkcje oraz callbacki)
16. - [ ] Server Side Rendering
17. - [ ] Stworzyć model `User`
18. - [ ] Przebudować server tak aby sprawdzał dane logowania
19. - [ ] Dokończyć logowanie - Obecnie jeśli w `DeviceBox` zmienimy `credential` na `true` pojawiają się elementy widoczne po zalogowaniu