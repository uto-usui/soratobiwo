/**
 *
 */
class duplicateText {
  /**
   *
   * @param target
   */
  constructor(target) {
    this.target = target

    this._setWrapper()
    this._duplicate()
  }

  _setWrapper() {
    const position = getComputedStyle(this.target).position

    if (
      position !== 'fixed' &&
      position !== 'absolute' &&
      position !== 'relative'
    ) {
      this.target.style.position = 'relative'
    }

    this.target.style.height = this.target.clientHeight + 'px'
    this.target.style.width = this.target.clientWidth + 'px'
  }

  _duplicate() {
    this.target.innerHTML = `
<div class="duplicate duplicate--original" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
  ${this.target.innerText}
</div>
<div class="duplicate duplicate--copy" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
  ${this.target.innerText}
</div>`
  }
}
export default duplicateText
