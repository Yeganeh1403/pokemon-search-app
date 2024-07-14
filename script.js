const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const types = document.getElementById("types");
const img = document.getElementById("sprite");

const searchPokemon = () => {
  const inputValue = searchInput.value;

  let id;
  const regex = /^([1-9][0-9]?[0-9]?[0-9]?[0-9]?)$/;
  if (inputValue === "Red") {
   alert("Pokémon not found"); 
  }
  else if (inputValue === "Pikachu") {
    id = 25;
  }
  else if (inputValue === "94") {
    id = 94;
  }
  else if (regex.test(inputValue)) {
    id = inputValue;
  }
  else {
    alert ("Pokémon not found");
  };
  
  
  types.innerHTML = "";
  fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
    .then(response => response.json())
    .then(data => {
      pokemonName.innerText = "Name: " + data.results[id - 1].name;
      pokemonId.innerText = "Id: " + id;

      fetch(data.results[id - 1].url)
    .then(response => response.json())
    .then(data => {
      pokemonHeight.innerText = pokemonHeight.innerText + data.height;
      pokemonWeight.innerText = pokemonWeight.innerText + data.weight;
      pokemonHp.innerText = data.stats[0].base_stat;
      pokemonAttack.innerText = data.stats[1].base_stat;
      pokemonDefense.innerText = data.stats[2].base_stat;
      spAttack.innerText = data.stats[3].base_stat;
      spDefense.innerText = data.stats[4].base_stat;
      pokemonSpeed.innerText = data.stats[5].base_stat;
      types.innerHTML = `<p>Type: ${data.types.map((typ) => typ.type.name.toUpperCase()).join(", ")}</p>`;

      img.src = data.sprites.front_default;
    })
    .catch(error => console.error('Error:', error));
})
    .catch(error => console.error('Error:', error));

}

searchButton.addEventListener("click", searchPokemon);