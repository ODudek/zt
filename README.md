# ZT project

Projekt strony dla zespołu testów w Cyfrowym Polsacie (Nieoficjalna)

## TODO

1. - [x] Zrobić modal
	* - [x] - Uzupełnianie go aktualnymi danymi 
	* - [x] - Zrobić animacje
2. - [x] - Zrobić formularz dodawania urządzeń
3. - [x] Zrobić powiadomienia o zaktualizowaniu, dodaniu oraz usunieciu urzadzenia 
4. - [x] Zrobić sortowanie kolumn (Poprawić hover oraz refactor funkcji `sort`)
5. - [ ] Stworzyć podstrony `backlog` oraz `W trakcie realizacji` (trzeba pomyśleć jak miałoby to wyglądać)
6. - [ ] Zrobić stronę z urlopami (Wypisane miesiące i mozna wpisywać kto kiedy ma urlop) 
7. - [x] Zamienić SetInterval który jest `Pseudo RealTime` na `socket.io` lub uzyć `eventemitter` który faktycznie odświezy content gdy pojawi się nowy wpis na serwerze (przebudowa logiki aplikacj) - Obecnie aby zobaczyć zmiany trzeba odświezyć stronę
8. - [x] Dodać `redux` do projektu który ułatwi komunikację między komponentami 
	* - [x] Dokończyć przy aktualizacji uzupełnić formularz danymi, odświezyć listę po kliknięciu `Zaktualizuj`
	* - [x] Dokończyć przy usuwaniu, usuwanie go z widoku bez odświezania strony
	* - [x] BUG - Po dodaniu urządzenia i bez odświezenia strony nie mozna usunąć urządzenia, przyczyną jest to, ze to urządzenie ma `id` utworzone po stronie reacta, a nie po stronie bazy danych
9. - [x] Zmienić formularz dodawania urządzeń, na ikonę `plus`, a po kliknięciu wyświetla się modal (Sprawdzić czy mozna skorzystać z istniejącego komponentu `DeviceModal`)
10. - [ ] Obsługa błędów
11. - [x] PWA - https://piecioshka.pl/blog/2017/05/07/jak-przerobic-strone-na-pwa.html
	* - [ ] Nadal tylko 82 (jeden z powodów brak https), oraz poprawić `Performance` wynik to równiez 82
12. - [x] Przebudować serwer (utworzyć odpowiednie funkcje oraz callbacki)
13. - [ ] Server Side Rendering
14. - [x] Stworzyć model `User`
15. - [x] Przebudować serwer tak aby sprawdzał dane logowania
16. - [x] Dokończyć logowanie - Obecnie jeśli w `DeviceBox` zmienimy `credential` na `true` pojawiają się elementy widoczne po zalogowaniu
17. - [ ] Napisać testy dla komponentów oraz dla serwera
18. - [x] Stworzyć `router` dla podstrony
19. - [ ] BUG: Po odświezeniu strony gdy jesteśmy na innej zakładce klasa `is-active` wraca na pierwszy element z menu czyli urządzenia
20. - [ ] Parsować login i hasło do jednego stringa oraz szyfrować go przy uzyciu `md5` - obecnie tylko hasło jest szyfrowane 

## How to use

```
$ npm run start-dev			# run server and react
$ npm start				# run react
$ npm run server			# run server
```

## Testowe konto do logowania
```
$ login: test
$ password: test123
```
## Screenshots

1. Zalogowany

![](./images/loggedIn.png)

2. Niezalogowany

![](./images/loggedOut.png)

## Features

1. Dodawanie nowego urządzenia
2. Aktualizacja danych urządzenia
3. Usuwanie urządzenia
4. Sortowanie tabeli
5. Panel logowania