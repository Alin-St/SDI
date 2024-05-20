## Assignment 3 Requirements

MANDATORY requirements for presenting the assignment(with
grade 5):

**DUE WEEK: 8**

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
  **AD-HOC TASKS** given by your lab teacher [ the lab will
  not receive passing grade unless the lab teacher is
  satisfied with your ad-hoc work ]

Silver and gold challenges will be given by your teacher during
the lab:

- implementing the silver challenge gives you extra 2
  points to your lab grade for this assignment
- implementing the gold challenge gives you extra 3
  points
- silver and gold challenges are not mandatory

> Salut! In cazul in care v ati apucat deja de tema pe sapt viitoare, vin cu o clarificare - e vorba de baze de date, deci puteti folosi sql (recomand postgres si daca puteti, sa l instalati cu docker, dar o sa las eu niste pasi pentru asta).

> Se vrea si front

Pentru persistenta, silver și gold tasks sunt:  
Silver: daca detectează că fie netu E down fie nu se pot transmite date la server, pe front end să stocheze noile date introduse sau updated de utilizator într-o bază de date lightweight pe client aka offline support + când revine netu și au conexiune la server sa sync cu serverul

Gold: să facă o funcționalitate care presupune o agregare de date pe master table (e.g. in cate filme a jucat fiecare actor ), paginat, pe pagini de 50/100 de entități each asta după ce au folosit faker să bage un număr imens de date în baza de date atât în tabela de actori cât și în cea de filme (adică să ai 100000 de actori) care fiecare joaca in 10000 de filme
Se recomanda https://jmeter-plugins.org/wiki/UltimateThreadGroup/

Pentru testarea timpului de răspuns a șervetului la requesturi prelungite

Pe fe, legat de gold challenge, să facă infinite scroll care sa tot dea fetch la date paginat fara că experiența utilizatorului sa fie pericilitata

> Q: Am o intrebare legate de teste. Acuma ca backendul nostru ne modifica baza de date cum ar trebui sa il testam? Ne facem o baza de date identica pentru teste?  
> A: In situatii de genul se face mock. Se considera ca baza de date/un API e testat(a) si se fac teste pe integrarea lor (strict codul tau)  
> Q: A, ok, deci facem testele doar sa se comporte de parca modifica o baza de date, dar noi nu testam in sine baza de date. Multumesc!

Salut! Trebuie sa va dau si ceva task ah-hoc

Presupun ca toti aveti un endpoint de getAll

As vrea sa faceti o sortare dupa un field oarecare cu query param

De exemplu
GET /posts - aduce postari in ordine cronologică
GET /posts?time=DESC - aduce postari in ordine inversa

Trb si asta pt 5. Merci
