const fetch = require('node-fetch');

const fs = require('fs').promises;


// LOTS OF functions
//  1 main function that grabs each piece of data

//    1 grab character via api/fetch
//    1 grabs planet " "
//    1 grabs ARRAY of movies
//         iterate through array, push out string of planet name
//         initialize empty array first
//    1 function that that creates string from api call info  MAYBE A CALLBACK
//    1 to write to file


const data = [];   // holds our data

let url = 'https://swapi.dev/api/people/1'

const fetchNPush = (url) => fetch(url)
  .then(response => response.json())
  .then(object => object.name)
  .then(name => data.push(name))
  // .then(() => console.log(data))

const characterFetch = (url) => fetchNPush(url)

const planetFetch = (url) => fetch(url)
  .then(response => response.json())
  .then(person => person.homeworld)
  .then(homeworld => fetchNPush(homeworld))



const filmsFetch = (url) => fetch(url)
  .then(response => response.json())
  .then(person => person.films)
  .then(filmsArray => Promise.all(filmsArray)
      .then((film) => {
          film.forEach(film => fetch(film)
            .then(film => film.json())
            .then(film => data.push(film.title))
            .then(() => console.log(data))
        )}
      ))
  // .then(() => console.log(data))
  // .catch(err => err, "this stopped because");

characterFetch(url)
  .then(() => planetFetch(url))
  .then(() => filmsFetch(url))



// fetch('https://swapi.dev/api/people/1')
//   .then(response => response.json())
//   .then(person =>)



  // fs.writeFile('filename.txt', fileContents, 'utf-8')
  //     .then(() => {
  //         console.log("The file is finished being written");
  //     }
  //     .catch(e => {
  //         console.error("Something went wrong when writing the file");
  //     }

    // .then(person => person.vehicles)
    // .then(vehicle => vehicle[0])
    // .then(apiCall => fetch(apiCall))
    // .then(response => response.json())
    // .then(printVehicle => console.log(printVehicle));
