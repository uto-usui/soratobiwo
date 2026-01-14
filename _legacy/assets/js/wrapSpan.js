/**
 * new wrapSpan(document.querySelector('#el'))
 */
class wrapSpan {
  constructor(target, delay = 0.02, delayMode = 'straight', duration = 0) {
    this.target = target
    this.delay = delay
    this.delayMode = delayMode
    this.duration = duration

    /**
     * テキストの配列
     * @type {*[]}
     */
    const text = [...this.target.innerHTML]
    /**
     * 元の文字列を破棄
     * @type {string}
     */
    this.target.innerHTML = ''
    /**
     * タグをスキップするためのフラグ
     * @type {boolean}
     */
    let skip = false
    /**
     *
     * @type {string}
     */
    let html = ''
    //
    /**
     * 格納した文字の量
     * @type {number}
     */
    let counter = 0
    /**
     * 配列化したテキストを span で包む
     */
    text.forEach(el => {
      /**
       * タグが始まったら skip フラグを true
       */
      if (el === '<') {
        /**
         * フラグを立てる
         * @type {boolean}
         */
        skip = true
        html += el
        /**
         * タグが始まったら skip フラグを false
         */
      } else if (el === '>') {
        /**
         * フラグをリセット
         * @type {boolean}
         */
        skip = false
        html += el
        /**
         * skip中に成型しておいた html を格納
         * @type {string}
         */
        this.target.innerHTML += html
        /**
         * リセット
         * @type {string}
         */
        html = ''
      } else {
        /**
         * 通常処理
         */
        // eslint-disable-next-line no-lonely-if
        if (skip === false) {
          /**
           * 空白文字の時は span で囲わない
           */
          if (el === ' ') {
            this.target.innerHTML += el
          } else {
            this.target.innerHTML += `<span style="display: inline-block; transition-delay: ${this._getDelay(
              counter,
            )}s">${el}</span>`
            counter++
          }
          /**
           * skip 中は タグ成型用の html に格納
           */
        } else {
          html += el
        }
      }
    })

    return this
  }

  /**
   *
   * @param num
   * @returns {number}
   * @private
   */
  _getDelay(num) {
    if (this.delayMode === 'straight') {
      return num * this.delay + this.duration
    } else if (this.delayMode === 'random') {
      return this._randomNum(this.duration) + this.delay
    }
  }

  /**
   *
   * @param max
   * @returns {number}
   * @private
   */
  _randomNum(max) {
    return this._orgTrunc(Math.random() * max, 100)
  }

  /**
   * 桁をまるめる
   * @param value
   * @param base
   * @returns {number}
   * @private
   */
  _orgTrunc(value, base) {
    return Math.trunc(value * base) / base
  }
}

export default wrapSpan
