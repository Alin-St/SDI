# SDI

Assignments for "Systems for Design and Implementation" course.

## Assignment 1 Requirements

**Mandatory requirements:**

- Front end application in a Javascript framework / library (React, Angular, Vue, etc...) of your choice
- Define 1 Entity with id (numeric > 0 or string guid) and 3 attributes (at least one string and one numeric) ex. Car (id, make, model, productionYear)
- Implement CRUD operations on your entity & use routing as follows:
  - Show all entities in a table / list (ex. on route /cars).
  - Have a create (add) button above the list that opens an 'add entity' page (ex. on route car/add).
  - Have an actions column for the items in the table:
    - delete button: open a confirmation modal/popup/dialog. Delete item only on confirm action.
    - edit button: open an edit entity page (eg. on a new route /car/edit/:id)
    - view button: open a show item details page. (eg. on a new route /car/details/:id)
- Do not display ids on the pages / in the table
- The list of items is an in-memory (hardcoded) list at the moment
- Write unit tests for your features (ex. use jest / playwright / jasmine + karma depending on your chosen framework)
- Coding styles: separate your code properly into components, services
- Have an overall nice UI / UX (no need for fancy stuff, but your site needs to have some sort of user friendly concept & styling)

**Optional:**

- Component library ( ex. Material UI, Fluent UI, Ant design) -> this might become mandatory later on
- State management ( either by using native React Context api, Redux, etc)

**Extra:**

- In-lab: Browser persist
  - Redux (greu de folosit)
  - Zustand (de preferat)
  - Note:
    - Session storage - se inchide daca inchizi browserul
    - Local storage - ramane salvat
- Home:
  - export (json, csv)
  - bulk delete (cu checkbox)

## Assignment 2 Requirements

Build your backend for your application. Every CRUD operation must be on the backend side now.  
DB Persistence not yet required!!! You can use in-memory repositories or lists.

**Requirements:**

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

[**A2 Requirements From Course Teacher (Gabriel Mircea)**](https://ubbcluj.sharepoint.com/:b:/s/MPPFTW/EV-zWnGEj3ZEvWdOtd0oh74BNwn3TPvtAz9GV8oWfeJHJA?e=t940Zf)

## Assignment 3 Requirements

MANDATORY requirements for presenting the assignment(with
grade 5):

- create another entity in the domain of your application
  which is in a one-to-many relationship with your initial
  entity and implement CRUD operations on this entity as
  well on the back end of your application
- implement server-side persistency for the entities stored
  on the back-end of your application
- everything has to be consistently tested for the
  assignment to be submitted correctly
- consider cyber-security aspects in your implementation (
  SQL injection, possible DDOS attacks, cross-site scripting)
  as the silver and gold challenges might relate to those
  aspects
- in order for you to receive a passing grade for this
  assignment you will also need to implement some
  AD-HOC TASKS given by your lab teacher [ the lab will
  not receive passing grade unless the lab teacher is
  satisfied with your ad-hoc work ]

Silver and gold challenges will be given by your teacher during
the lab:

- implementing the silver challenge gives you extra 2
  points to your lab grade for this assignment
- implementing the gold challenge gives you extra 3
  points
- silver and gold challenges are not mandatory
