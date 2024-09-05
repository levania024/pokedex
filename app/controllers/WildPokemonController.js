import { AppState } from "../AppState.js";
import { wildPokemonService } from "../services/WildPokemonService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class WildPokemonController {
    constructor() {
        console.log('load the pokemon to the page');
        AppState.on('wildPokemon', this.drawWildPokemonList)
        AppState.on('activePokemon', this.drawActivePokemon)
        this.getWildPokemon()
    }

    // WildPokemonController.js
    drawWildPokemonList() {
        const pokemon = AppState.wildPokemon
        let wildPokemonContent = ''
        pokemon.forEach(poke => {
            wildPokemonContent += ` 
            <div class="my-1">
            <button onclick="app.WildPokemonController.getActivePokemon('${poke.name}')" class="btn btn-outline rounded-pill text-success">${poke.name}</button>
          </div>`
        });
        setHTML('pokemon-list', wildPokemonContent)
    }

    drawActivePokemon() {
        if (AppState.activePokemon == null) return

        setHTML('pokemon-details', AppState.activePokemon.detailsHTMLTemplate)
    }


    async getWildPokemon() {
        try {
            await wildPokemonService.getWildPokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error)
        }
    }

    async getActivePokemon(pokeName) {
        try {
            await wildPokemonService.getActivePokemon(pokeName)
        } catch (error) {
            Pop.error(error)
            console.error(error)
        }
    }
}