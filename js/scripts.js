// IIFE

let pokemonRepository = (function(){

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let loading = document.querySelector('#loading-icon');

// below allows pokemon to be added to the repository

  function add(pokemon) {
  	if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
      }
    }

// below returns all pokemon in the repository

  function getAll() {
    return pokemonList;
  }

// below loads items from the API

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

// Below returns details from the API

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [...details.types];
    }).catch(function (e) {
      console.error(e);
    });
  }

// below creates list items as buttons

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('.pokemonName');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

// below creates a loading message

  function showLoadingMessage() {
    loading.appendChild('Loading');
  }

  function hideLoadingMessage() {

  }

// below creates a modal with pokemon info

  function showDetails(pokemon) {
	pokemonRepository.loadDetails(pokemon).then(function () {
		showModal(pokemon);
	});
  }

  let modalContainer = document.querySelector('#modal-container');

function showModal(pokemon) {
	modalContainer.innerHTML = '';

	let modal = document.createElement('div');
	modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + (pokemon.height / 10) + " m";

    let weightElement = document.createElement('p');
    weightElement.innerText = "Weight: " + (pokemon.weight / 10) + " kg";

    let typesElement = document.createElement('p');
    let types = 'Type(s): ';
    pokemon.types.forEach(function(item) {
      types += '<p>' + item.type.name + '</p>';
    });
    typesElement.innerHTML = types;
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);

	modalContainer.classList.add('is-visible');
  }

// below provides options to hide the modal

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
		hideModal();
	}
});

modalContainer.addEventListener('click', (e) => {
	let target = e.target;
	if (target === modalContainer) {
		hideModal();
	}
});

// functions assigned self-named keys

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Below loads the list from the API

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
