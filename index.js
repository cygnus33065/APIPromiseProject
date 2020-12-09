const { promises } = require('fs');
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
  .then(() => console.log(data))
  // const fetchNPush = new Promise((resolve,) => (
  // resolve((url) => fetch(url)
  // .then(response => response.json())
  // .then(object => object.name)
  // .then(name => data.push(name))
  // ))


const characterFetch = (url) => fetchNPush(url)

const planetFetch = (url) => fetch(url)
  .then(response => response.json())
  .then(person => person.homeworld)
  .then(homeworld => fetchNPush(homeworld))


// const filmsFetch = (url) => fetch(url)
//   .then(response => response.json())
//   .then(person => person.films)

// const makeilms = function(cb){
let filmFetch = (film) => {
  fetch(film)
  .then(film => film.json())
  .then(film => data.push(film.title))
  .then(() => console.log(data))
}

const filmsFetch = (url) => fetch(url)
  .then(response => response.json())
  .then(person => person.films)
  // .then(person => console.log(person, '50'))
  .then(filmsArray => filmsArray.forEach(film => {
    filmFetch(film)
  }));



  //  .then Promise.all(filmsArray)
  //     .then((film) => {
  //         film.forEach(film => fetch(film)
  //           .then(film => film.json())
  //           .then(film => data.push(film.title))
  //           .then(() => console.log(data))
  //       )}
  //     ))
  // .then(() => console.log(data))
  // .catch(err => err, "this stopped because");

  // Promise.all(cb)
  //     .then((film) => {
  //       console.log(film)
  //         film.forEach(film => fetch(film)
  //           .then(film => film.json())
  //           .then(film => data.push(film.title))
  //           // .then(() => console.log(data))
  //       )}
  //     )
      // })

  //   }

let fileContents = ''

const SetData = (data) =>{
  console.log(data);
  const name = data.splice(0,1)
  const planet = data.splice(0,1)
  console.log(data, 73)
  const films = data.join(', ')
  // console.log(films)
fileContents = `My name is ${name} and I am from ${planet}.
I starred in the following films: ${films}`
}

// const masterFunc = new Promise (characterFetch(url))
//   .then(() => planetFetch(url))
//   .then(() => filmsFetch(url))
//   // .then((cb) => makeFilms(cb))
//   // .then(() => console.log(data))
//   .then(() => SetData(data))
//   .then(() => console.log(fileContents))
// declare new promise



const masterFunc = (url) => {
  return new Promise ((resolve, reject) => {
    characterFetch(url)
  .then(() => planetFetch(url))
  .then(() => filmsFetch(url))
  // .then((cb) => makeFilms(cb))
  // .then(() => console.log(data))
  .then(() => console.log(data))
  .then(setTimeout(() => SetData(data), 6000))
  .then(() => console.log(fileContents))
  // .then(everything => resolve (everything))
  })
  // console.log(fileContents);
}


masterFunc(url);
// setTimeout(() => console.log(fileContents), 5000);
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
