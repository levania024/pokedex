import { Pokemon } from './models/Pokemon.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null

  // AppState.js
  /** @type {{ name:string, url:string }[]} */
  wildPokemon = []

  /** @type {Pokemon | null} */
  activePokemon = null

  /**@type {Pokemon[]}*/
  myPokemon = []
}

export const AppState = createObservableProxy(new ObservableAppState())