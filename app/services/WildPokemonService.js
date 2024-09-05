import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { pokeApi } from "./AxiosService.js"

class WildPokemonService {
    async getActivePokemon(pokeName) {
        const response = await pokeApi.get(`/pokemon/${pokeName}`)
        console.log('Active Pokemon response:', response.data)

        const newPokemon = new Pokemon(response.data)
        AppState.activePokemon = newPokemon
    }

    // WildPokemonService.js
    async getWildPokemon() {
        const response = await pokeApi.get('pokemon?limit=151')
        console.log('response', response.data)

        AppState.wildPokemon = response.data.results
        console.log(AppState.wildPokemon);
    }

}
export const wildPokemonService = new WildPokemonService()