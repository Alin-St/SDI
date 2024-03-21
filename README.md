# SDI

Assignments for "Systems for Design and Implementation" course.

## Lab 1 Requirements

Mandatory requirements:

- Front end application in a Javascript framework / library (React, Angular, Vue, etc...) of your choice
- Define 1 Entity with id (numeric > 0 or string guid) and 3 attributes (at least one string and one numeric) ex. Car (id, make, model, productionYear)
- Implement CRUD operations on your entity & use routing as follows:
  - Show all entities in a table / list (ex. on route /cars).
  - Have a create (add) button above the list that opens an 'add entity' page (ex. on route car/add).
  - Have an actions column for the items in the table:
    - delete button: open a confirmation modal/popup/dialog. Delete item only on confirm action.
    - edit button: open an edit entity page (eg. on a new route /car/edit/:id) \* view button: open a show item details page. (eg. on a new route /car/details/:id)
- Do not display ids on the pages / in the table
- The list of items is an in-memory (hardcoded) list at the moment
- Write unit tests for your features (ex. use jest / playwright / jasmine + karma depending on your chosen framework)
- Coding styles: separate your code properly into components, services
- Have an overall nice UI / UX (no need for fancy stuff, but your site needs to have some sort of user friendly concept & styling)

Optional:

- Component library ( ex. Material UI, Fluent UI, Ant design) -> this might become mandatory later on
- State management ( either by using native React Context api, Redux, etc)

Extra:

- In-lab: Browser persist
  - Redux (greu de folosit)
  - Zustand (de preferat)
  - Note:
    - Session storage - se inchide daca inchizi browserul
    - Local storage - ramane salvat
- Home:
  - export (json, csv)
  - bulk delete (cu checkbox)
