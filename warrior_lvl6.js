class Player {
  
  constructor() {
    this._health = 20
    this.goForward = function (warrior) {
      if (warrior.feel().isCaptive()) {
        warrior.rescue()
        this._health = warrior.health()
        return
      }
      if (!warrior.feel().isEmpty()) {
        warrior.attack()
        this._health = warrior.health()
        return
      }
      if (warrior.health() < this._health && warrior.feel().isEmpty() && warrior.health() < 13) {
        warrior.walk('backward')
        this._health = warrior.health()
        return
      }      
      if (warrior.health() < 17 && warrior.health() >=  this._health) { 
        warrior.rest()
        this._health = warrior.health()
        return
      } 
      warrior.walk() 
      this._health = warrior.health()
    }
    this.goBackward = function (warrior) {
      if (warrior.feel('backward').isCaptive()) {
          warrior.rescue('backward')
        } else {
          if (!warrior.feel('backward').isEmpty()) {
            warrior.attack('backward') 
          } else { 
            if (warrior.health() < 13) { 
              if (warrior.health() >=  this._health) {
                warrior.rest()
              } else { 
                warrior.walk('backward') 
              }
            } else warrior.walk('backward')
          }
        }
        this._health = warrior.health()
    }
    this.direction = 'backward'
  }
  
  playTurn(warrior) {
    if (warrior.feel('backward').isWall()) {
      this.direction = 'forward'
    }
    if (this.direction === 'forward') {
      this.goForward(warrior)
    } else {
      this.goBackward(warrior)
    }
  }

}