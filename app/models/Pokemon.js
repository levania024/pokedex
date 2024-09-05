export class Pokemon {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.weight = data.weight || ''
    this.height = data.height || ''
    this.cries = data.cries || {}
    this.species = data.species || {}
    this.move = data.moves && data.moves.length > 0 ? data.moves[0].version_group_details : []
    this.nickName = data.nickName || ''
    this.defense = data.stats ? data.stats.find(stat => stat.stat.name == 'defense')?.base_stat : ''
    this.attack = data.stats ? data.stats.find(stat => stat.stat.name == 'attack')?.base_stat : ''
    this.speed = data.stats ? data.stats.find(stat => stat.stat.name == 'speed')?.base_stat : ''
    this.types = data.types ? data.types.map(type => type.type?.name || '') : []
    this.health = data.stats ? data.stats.find(stat => stat.stat.name == 'hp')?.base_stat : ''
    this.img = data.sprites?.front_default || ''
    this.backImg = data.sprites?.back_default || ''
  }

  get detailsHTMLTemplate() {
    return `
        <div class="card border border-success bg-black m-2 p-3 text-success">
        <h3>${this.name}</h3>
        </div>
        <div class="text-center">
        <img src="${this.img}" alt="${this.name}" class="img-fluid pokemon-image">
        </div>
        <div class="card w-100 mb-3 pokemon-card text-success bg-black border border-success">
          <div class="card-body">
              <div class="mb-3">
                ${this.types.map(type => `<button class="btn btn-primary me-2">${type}</button>`).join('')}
              </div>
              <p>Health: <span class="text-end"> ${this.health}</span>hp</p>
              <p>Attack: <span> ${this.attack}</span>ap</p>
              <p>Defense: <span> ${this.defense}</span>dp</p>
              <p>Speed: <span> ${this.speed}</span>spd</p>
              <p>Weight: <span> ${this.weight}</span>hg</p>
              <p>Height: <span> ${this.height}</span>dm</p>
            </div>
            </div>
            <div class="text-center m-1">
              <button onclick="app.SandboxPokemonController.catchPokemon()" class="btn btn-primary">Catch 'em</button>
            </div>
        `
  }

  get CaughtPokemonTemplate() {
    return `
    <div class="card mb-2 bg-dark text-light">
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <img src="${this.img}" alt="${this.name}" class="img-fluid mb-2" style="max-height: 100px;">
        <p class="card-text">Type: ${this.types.join(', ')}</p>
        <button onclick="app.SandboxPokemonController.setActivePokemon('${this.id}')" class="btn btn-outline-primary btn-sm">View Details</button>
      </div>
    </div>
    `
  }
}