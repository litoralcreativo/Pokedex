const get = async (
  url = "https://pokeapi.co/api/v2/pokemon/",
  random = true
) => {
  try {
    if (random) {
      const rand = Math.round(Math.random() * 898);
      const response = await fetch(`${url}${rand}`);
      const pokemon = await response.json();
      return pokemon;
    } else {
      const response = await fetch(url);
      const pokemon = await response.json();
      return pokemon;
    }
  } catch (e) {
    console.error(e);
  }
};

const getByType = async (
  type = 1,
  position = 0,
  url = "https://pokeapi.co/api/v2/type/"
) => {
  try {
    const response = await fetch(`${url}${type}`);
    const pokemon = await response.json();
    return get(pokemon.pokemon[position].pokemon.url, false);
  } catch (e) {
    console.error(e);
  }
};

class PokeDex {
  active = true;
  pokemon = null;
  pokemonTypes = [
    {
      id: 1,
      name: "normal",
      count: 130,
      current: 1,
    },
    {
      id: 2,
      name: "fighting",
      count: 78,
      current: 1,
    },
    {
      id: 3,
      name: "flying",
      count: 135,
      current: 1,
    },
    {
      id: 4,
      name: "poison",
      count: 85,
      current: 1,
    },
    {
      id: 5,
      name: "ground",
      count: 82,
      current: 1,
    },
    {
      id: 6,
      name: "rock",
      count: 89,
      current: 1,
    },
    {
      id: 7,
      name: "bug",
      count: 96,
      current: 1,
    },
    {
      id: 8,
      name: "ghost",
      count: 73,
      current: 1,
    },
    {
      id: 9,
      name: "steel",
      count: 77,
      current: 1,
    },
    {
      id: 10,
      name: "fire",
      count: 88,
      current: 1,
    },
    {
      id: 11,
      name: "water",
      count: 162,
      current: 1,
    },
    {
      id: 12,
      name: "grass",
      count: 124,
      current: 1,
    },
    {
      id: 13,
      name: "electric",
      count: 89,
      current: 1,
    },
    {
      id: 14,
      name: "psychic",
      count: 123,
      current: 1,
    },

    {
      id: 15,
      name: "ice",
      count: 58,
      current: 1,
    },

    {
      id: 16,
      name: "dragon",
      count: 78,
      current: 1,
    },

    {
      id: 17,
      name: "dark",
      count: 76,
      current: 1,
    },
    {
      id: 18,
      name: "fairy",
      count: 72,
      current: 1,
    },
  ];
  typeIndex = 1;
  constructor() {
    this.catchDomElements();
    this.getNewPokemon();
    this.activeToogle();
  }

  async getNewPokemon() {
    this.pokemon = await getByType(
      this.typeIndex,
      this.pokemonTypes[this.typeIndex - 1].current
    );
    this.showData();
  }

  async changeIndex(delta) {
    if (delta == -1) {
      if (this.typeIndex != 1) {
        this.typeIndex -= 1;
      }
    } else {
      if (this.typeIndex != 18) {
        this.typeIndex += 1;
      }
    }
    this.pokemon = await getByType(
      this.typeIndex,
      this.pokemonTypes[this.typeIndex - 1].current
    );
    this.showData();
  }

  async changePokemonByIndexInType(delta) {
    let min = 1;
    let max = this.pokemonTypes[this.typeIndex - 1].count;
    let current = this.pokemonTypes[this.typeIndex - 1].current;

    if (delta == -1) {
      if (current != min) {
        this.pokemonTypes[this.typeIndex - 1].current -= 1;
      }
    } else {
      if (current != max) {
        this.pokemonTypes[this.typeIndex - 1].current += 1;
      }
    }
    this.pokemon = await getByType(
      this.typeIndex,
      this.pokemonTypes[this.typeIndex - 1].current
    );
    this.showData();
  }

  catchDomElements() {
    this.nameElement = document.getElementById("poke-name");
    this.imageElement = document.getElementById("poke-img");
    this.ledElement = document.getElementById("elementLed");
    this.typeElement = document.getElementById("poke-type");
    this.abilitiesContainer = document.getElementById("abilitiesContainer");

    // stats
    this.hp_stat = document.getElementById("hp_stat");
    this.atk_stat = document.getElementById("atk_stat");
    this.satk_stat = document.getElementById("satk_stat");
    this.def_stat = document.getElementById("def_stat");
    this.sdef_stat = document.getElementById("sdef_stat");
    this.speed_stat = document.getElementById("speed_stat");
  }

  showData() {
    if (this.active) {
      this.nameElement.innerText = this.pokemon.name.toUpperCase();
      this.imageElement.src =
        this.pokemon.sprites.other["official-artwork"].front_default;
      this.ledElement.style.backgroundColor = `var(--${
        this.pokemonTypes[this.typeIndex - 1].name
      })`;
      this.typeElement.innerText = "";
      this.pokemon.types.forEach(
        (element) => (this.typeElement.innerText += `(${element.type.name})`)
      );
      let abilities = this.pokemon.abilities;
      this.abilitiesContainer.innerHTML = "";
      abilities.forEach((item, i) => {
        let abiElement = `<p class="poke-ability">${i + 1}) ${
          item.ability.name
        }</p>`;
        this.abilitiesContainer.innerHTML += abiElement;
      });
      this.setStats();
    }
  }

  setStats() {
    /* 
    this.hp_stat.innerHTML = "HP: " + this.pokemon.stats[0].base_stat;
    this.atk_stat.innerHTML = "ATK: " + this.pokemon.stats[1].base_stat;
    this.satk_stat.innerHTML = "DEF: " + this.pokemon.stats[2].base_stat;
    this.def_stat.innerHTML = "S-ATK: " + this.pokemon.stats[3].base_stat;
    this.sdef_stat.innerHTML = "S-DEF: " + this.pokemon.stats[4].base_stat;
    this.speed_stat.innerHTML = "SPEED: " + this.pokemon.stats[5].base_stat;
     */
    this.turnStatsLeds("hp_leds", 255, 0);
    this.turnStatsLeds("atk_leds", 190, 1);
    this.turnStatsLeds("def_leds", 250, 2);
    this.turnStatsLeds("satk_leds", 194, 3);
    this.turnStatsLeds("sdef_leds", 250, 4);
    this.turnStatsLeds("speed_leds", 200, 5);
  }

  turnStatsLeds(id, max, s) {
    let hpLeds = document.getElementById(id).getElementsByClassName("led");
    let activeLeds = parseInt(
      (this.pokemon.stats[s].base_stat * hpLeds.length) / max
    );
    for (let i = 0; i < 10; i++) {
      if (i + 1 <= activeLeds) {
        hpLeds[i].style.backgroundColor = "var(--on)";
      } else {
        hpLeds[i].style.backgroundColor = "var(--darkGrey)";
      }
    }
  }

  activeToogle() {
    this.active = !this.active;
    if (this.active) {
      this.imageElement.className = "";
      document.getElementById("rightPanel").className = "rp-active";
      this.ledElement.style.backgroundColor = `var(--${
        this.pokemonTypes[this.typeIndex - 1].name
      })`;
      this.showData();
    } else {
      this.imageElement.className = "disable";
      document.getElementById("rightPanel").className = "rp-disable";
      this.ledElement.style.backgroundColor = "var(--darkGrey)";
    }
  }
}

let pokedex;
const start = () => {
  pokedex = new PokeDex();
};

const changeType = (delta) => {
  pokedex.changeIndex(delta);
};

const changeIndex = (delta) => {
  pokedex.changePokemonByIndexInType(delta);
};

window.onload = start();
