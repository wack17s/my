class Player {
  
  constructor () {
    this._health = 20
    this._direction = 'backward'    
    this.go = (warrior) => {
      if (warrior.feel(this._direction).isCaptive()) {
        warrior.rescue(this._direction)
        this._health = warrior.health()
        return
      }
      if (!warrior.feel(this._direction).isEmpty() && !warrior.feel(this._direction).isWall()) {
        warrior.attack(this._direction)
        this._health = warrior.health()
        return
      }
      if (warrior.health() < this._health && warrior.feel().isEmpty() && warrior.health() < 13) {
        warrior.walk((this._direction == 'backward') ? 'forward' : 'backward')
        this._health = warrior.health()
        return
      }      
      if (warrior.health() < 17 && warrior.health() >=  this._health) { 
        warrior.rest()
        this._health = warrior.health()
        return
      } 
      warrior.walk(this._direction) 
      this._health = warrior.health()
    }
  }
  
  playTurn (warrior) {
    if (warrior.feel().isWall()) {
      warrior.pivot(this._direction)
      this._direction = (this._direction === 'backward') ? 'forward' : 'backward'
      return
    }
    this.go(warrior)
  }

}
