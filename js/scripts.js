// IIFE

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Below allows pokemon to be added to the repository

  function add(pokemon) {
  	if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
      } else {
      	console.log("Please try again");
      }
    }

// Below returns all pokemon in the repository

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('.pokemonName');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Below logs a pokemon's name

  function showDetails(item) {
	pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Below loads the list from the API

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

/* original array of pokemon

  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"]},
  	{ name: "Ivysaur", height: 1, types: ["grass", "poison"]},
	{ name: "Venusaur", height: 2, types: ["grass", "poison"]},
	{ name: "Charmander", height: 0.6, types: ["fire"]},
	{ name: "Charmeleon", height: 1.1, types: ["fire"]},
	{ name: "Charizard", height: 1.7, types: ["fire", "flying"]},
	{ name: "Squirtle", height: 0.5, types: ["water"]},
	{ name: "Wartortle", height: 1, types: ["water"]},
	{ name: "Blastoise", height: 1.6, types: ["water"]},
	{ name: "Caterpie", height: 0.3, types: ["bug"]},
	{ name: "Metapod", height: 0.7, types: ["bug"]},
	{ name: "Butterfree", height: 1.1, types: ["bug", "flying"]},
	{ name: "Weedle", height: 0.3, types: ["bug", "poison"]},
	{ name: "Kakuna", height: 0.6, types: ["bug", "poison"]},
	{ name: "Beedrill", height: 1, types: ["bug", "poison"]},
	{ name: "Pidgey", height: 0.3, types: ["flying", "normal"]},
	{ name: "Pidgeotto", height: 1.1, types: ["flying", "normal"]},
	{ name: "Pidgeot", height: 1.5, types: ["flying", "normal"]}
	];

*/