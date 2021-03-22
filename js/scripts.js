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

/* below is loop version 2.0 (not being used)

for (let i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height > 1.9) {
		document.write(`${pokemonList[i].name} / Height: ${pokemonList[i].height} / Types: ${pokemonList[i].types} (Wow, that's big!)`);
    } else {
	document.write(`${pokemonList[i].name} / Height: ${pokemonList[i].height} / Types: ${pokemonList[i].types}`);
    }
}

*/

// below is loop version 1.0 (in use)

for (let i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height > 1.9) {
		document.write('<p>' + pokemonList[i].name + ' / Height: ' + pokemonList[i].height + ' / Types: ' + pokemonList[i].types + ' (Wow, that\'s big!)</p>');
    } else {
	document.write('<p>' + pokemonList[i].name + ' / Height: ' + pokemonList[i].height + ' / Types: ' + pokemonList[i].types + '</p>');
    }
}
