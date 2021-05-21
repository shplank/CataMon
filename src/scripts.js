// IIFE

let pokemonRepository = (function(){

  let pokemonArray = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

/* below loads pokemon names and urls from the API */

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
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

/* below adds pokemon to the repository and confirms they are objects */

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonArray.push(pokemon);
      }
    }

/* below returns all pokemon in the repository as array */

  function getAll() {
    return pokemonArray;
  }

/* below creates list items from array as buttons with pokemon names as text */

let pokemonList = document.querySelector('.list-group');

  function addListItem(pokemon){
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'btn-block');
    button.setAttribute('data-target','#pokeModal');
    button.setAttribute('data-toggle','modal');
    pokemonList.appendChild(listItem);
    listItem.appendChild(button);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

/* below creates a modal with pokemon info */

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
    }

/* Below returns details about each pokemon from the API */

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [...details.types];
      item.abilities = [...details.abilities];
    }).catch(function (e) {
      console.error(e);
    });
  }

/*  below fills the modal with pokemon image and details */

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.srcset = pokemon.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + (pokemon.height / 10) + ' m';

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + (pokemon.weight / 10) + ' kg';

    let typesElement = document.createElement('p');
    let types = 'Type(s): ';
    pokemon.types.forEach(function(item) {
      types += '<span>' + item.type.name + ' ' + '</span>';
    });
    typesElement.innerHTML = types;

    let abilitiesElement = document.createElement('p');
    let abilities = 'Abilities: ';
    pokemon.abilities.forEach(function(item) {
      abilities += '<span>' + item.ability.name + ' ' + '</span>';
    });
    abilitiesElement.innerHTML = abilities;
    
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

/* below allows search input to filter pokemon names displayed in the list */

  let searchInput = document.querySelector('#search-input');

  searchInput.addEventListener('input', function(){
    let listGroup = document.querySelectorAll('.list-group-item');
    let value = searchInput.value.toLowerCase();

    listGroup.forEach(function(pokemon){
        if(pokemon.innerText.toLowerCase().indexOf(value) > -1){
            pokemon.style.display = '';
        }else{
            pokemon.style.display = 'none';
        }
    });
});

/* functions assigned self-named keys */

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

/* Below loads the list from the API */

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
