const fetch = require('node-fetch');




fetch('https://swapi.dev/api/people/1')
    .then(response => response.json())
    .then(person => person.films)
    .then(filmsArray => Promise.all(filmsArray).then((film) => {
      film.forEach(film => fetch(film).then(film => film.json()).then(film => console.log(film)))
    }))

    // .then(person => person.vehicles)
    // .then(vehicle => vehicle[0])
    // .then(apiCall => fetch(apiCall))
    // .then(response => response.json())
    // .then(printVehicle => console.log(printVehicle));

