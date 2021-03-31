// array of pokemon

let pokemonRepository = (function () {

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

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

// below is the forEach loop (in use)

pokemonRepository.getAll().forEach(function(list) {
  if (list.height > 1.9) {
    document.write('<p>' + list.name + ' / Height: ' + list.height + ' / Types: ' + list.types.join(', ') + ' (Wow, that\'s big!)</p>');
  } else {
	document.write('<p>' + list.name + ' / Height: ' + list.height + ' / Types: ' + list.types.join(', ') + '</p>');
  }
});
