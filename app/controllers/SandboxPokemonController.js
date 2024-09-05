import { AppState } from "../AppState.js";
import { sandboxPokemonService } from "../services/SandboxPokemonService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class SandboxPokemonController {
    constructor() {
        console.log('SandboxPokemonController loaded');
        AppState.on('user', this.getMyPokemon)
        AppState.on('myPokemon', this.drawMyPokemon)
    }

    async getMyPokemon() {
        try {
            await sandboxPokemonService.getMyPokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error)
        }
    }

    drawMyPokemon() {
        const pokemon = AppState.myPokemon
        let CaughtPokemonHTML = ''
        pokemon.forEach(pokemon => CaughtPokemonHTML += pokemon.CaughtPokemonTemplate)

        setHTML('caught-pokemon', CaughtPokemonHTML)
    }
    async savePokemon() {
        try {
            await sandboxPokemonService.savePokemon()
        } catch (error) {
            Pop.error(error)
            console.error(error)
        }
    }


    async catchPokemon() {
        try {
            await sandboxPokemonService.catchPokemon()
            Pop.success(`You caught ${AppState.activePokemon.name}!`)
        } catch (error) {
            Pop.error(error)
            console.error(error)
        }
    }

    setActivePokemon(pokemonId) {
        sandboxPokemonService.setActiveSpell(pokemonId)
    }
}