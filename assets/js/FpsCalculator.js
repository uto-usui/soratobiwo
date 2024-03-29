export class FpsCalculator {
  constructor() {
    this._isRunning = false
    this._beginTime = Date.now()
    this._prevTime = this._beginTime
    this._frames = 0
  }

  start() {
    if (this._isRunning) {
      return null
    }

    this._beginTime = Date.now()
    this._prevTime = this._beginTime
    this._frames = 0

    this._isRunning = true
    const loop = () => {
      if (!this._isRunning) {
        return null
      }
      this._update()
      requestAnimationFrame(loop)
    }
    loop()
  }

  stop() {
    this._isRunning = false
    this._frames = 0
  }

  _update() {
    this._frames++
    const prevTime = this._prevTime
    const time = Date.now()

    if (time > prevTime + 1000) {
      console.log(Math.trunc((this._frames * 1000) / (time - prevTime)))
      this._prevTime = time
      this._frames = 0
    }

    this._beginTime = time
  }
}
