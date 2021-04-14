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

// Below creates list items as buttons

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

// Below loads items from the API

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

// Below returns details from the API

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

// below shows a modal

function showModal(title, text) {
	let modalContainer = document.querySelector('#modal-container');
	modalContainer.innerHTML = '';

	let modal = document.createElement('div');
	modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

	modalContainer.classList.add('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
	showModal('Modal Title', 'This is the modal content!');
});

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

let closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText('Close');
closeButtonElement.addEventListener('click', hideModal);

window.addEventListener('keydown', (e) => {
	let modalContainer = document.querySelector('#modal-container');
	if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
		hideModal();
	}
});

modalContainer.addEventListener('click', (e) => {
	let target = e.target;
	if (target === modalContainer) {
		hideModal();
	}
})

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
