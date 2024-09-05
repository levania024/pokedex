import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { api } from "./AxiosService.js"

class SandboxPokemonService {
    async savePokemon() {
        const spellToSave = AppState.activePokemon
        const response = await api.post('api/spells', spellToSave)
        console.log('SAVED pokemon 🧙‍♂️💾', response.data);
        const pokemon = new Pokemon(response.data)
        AppState.myPokemon.push(pokemon)

        AppState.emit('activePokemon')
    }
    setActiveSpell(pokemonId) {
        // NOTE we have all of the data that we need to display currently in the AppState, no need for a network request
        const foundSpell = AppState.myPokemon.find(Pokemon => Pokemon.id == pokemonId)
        AppState.activePokemon = foundSpell
    }

    async getMyPokemon() {
        const response = await api.get('api/pokemon')
        console.log('My Pokemon response:', response.data);
        const pokemonList = response.data.map(pokemonData => new Pokemon(pokemonData))
        AppState.myPokemon = pokemonList
    }

    async catchPokemon() {
        const caughtPokemon = AppState.activePokemon
        const response = await api.post('api/pokemon', caughtPokemon)

        console.log('Caught Pokemon:', response.data)
        const newCaughtPokemon = new Pokemon(response.data)
        AppState.myPokemon.push(newCaughtPokemon)

        AppState.emit('myPokemon')
    }

}

export const sandboxPokemonService = new SandboxPokemonService()