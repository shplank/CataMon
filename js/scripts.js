// IIFE

let pokemonRepository = (function () {

// array of pokemon

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

// Below allows pokemon to be added to the repository

  function add(pokemon) {
  	if (typeof pokemon !== object) {
  		alert('Please try again!');
  	} else {
  		if (typeof pokemon !== Object.keys(pokemonList)) {
  			alert('Please try again!');
  		} else {
      pokemonList.push(pokemon);
      }
    }
  }

// Below returns all pokemon in the repository

  function getAll() {
    return pokemonList;
  }

// Below logs a pokemon's name

  function showDetails(pokemon) {
	console.log(pokemon.name. pokemon.height, pokemon.types);
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('.pokemonName');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(pokemon) {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

// below is the forEach loop

pokemonRepository.getAll().forEach(function(pokemon) {

  pokemonRepository.addListItem(pokemon);

});
