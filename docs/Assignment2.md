## Assignment 2 Requirements

Build your backend for your application. Every CRUD operation must be on the backend side now.  
DB Persistence not yet required!!! You can use in-memory repositories or lists.

**Requirements:**

From Lab Teacher:

- CRUD
  - Create (POST) should return a 201 Created status code
  - Read (GET) should return a 200 status code
    - 2 endpoints are required - getOne and getAll (list of all the elements)
  - Update (PATCH) should return a 200 OK status code. Should use the ID of the entity to find it
  - Delete (DELETE) should return a 204 No content status code WITHOUT any response body
- Frontend should handle those calls and their respective status codes. It also must provide a visual feedback to the user (alert, snack bar, notification etc… anything)
- If Read (by id), Update or Delete are trying to manipulate a non-existent entity, the backend should return a 404 status code and frontend should display the right message. You can also return a json with a message from the backend.
- You must write unit tests for your endpoints (so at least 5 unit tests are expected - one for each endpoint)

**Silver:** if the internet is down or the backend is down, store the entities in a global state management lib like Redux and keep an "unsaved" flag on it. Implement an interceptor and retry mechanism (Axios recommended).

**Gold:** Create a cronjob that creates a new entity every 10-15 seconds and connect the backend and frontend via a WebSocket (socket.io recommended) and display the newly created entity live.

> also recomandarea mea acum e sa aveti toti un global state management gen Redux sau Zustand (recomand Zustand ca e mai usor de folosit)  
> https://github.com/pmndrs/zustand  
> Lista de entitati ar trebui sa se tina aici acum. Pe langa asta, cele doua librarii permit si localStorage persistence cu o setare, deci la fiecare state change se va persista automat in localStorage. Cautati despre asta pls :) e destul de usor

> si proiectul de la lab  
> https://github.com/cinnamonbreakfast/mpp24/tree/feature/sockets_and_stores

[**A2 Requirements From Course Teacher (Gabriel Mircea)**](https://ubbcluj.sharepoint.com/:b:/s/MPPFTW/EV-zWnGEj3ZEvWdOtd0oh74BNwn3TPvtAz9GV8oWfeJHJA?e=t940Zf) - Should be the same as above

> Q: Cronjob-ul care creează entitățile să fie în backend sau în frontend?  
> A: Back

> Q: pentru silver, daca pica backend-ul si se modifica/adauga/ sterge in lista, cand revine backend-ul trebuie sa dam update cu ce a facut user-ul cand era picat?  
> A: would be nice to, dar nu e necesar. Tin mai mult sa afisati userului o eroare nice pe ecran sau ceva de genul - sa faceti handle, in a few words  
> Q: deci cand pica backend-ul doar apare un alert?  
> A: Daca apelezi backend si da eroare sa afiseze un mesaj/alert/orice... si sa salveze entitatea local  
> A: dar sa fie putin mai detaliat mesajul, nu doar "Oops something went wrong" :)) in functie de eroare
