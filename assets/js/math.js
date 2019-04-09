export function shuffle([...arr]) {
  const array = [...arr]
  let m = array.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[array[m], array[i]] = [array[i], array[m]]
  }
  return array
}

/**
 * 線形補間 0から1のまでの値を、任意の範囲に相当する値に変換する。
 * @param x
 * @param y
 * @param p
 * @returns {Number}
 */
export function lerp(x, y, p) {
  return x + (y - x) * p
}

/**
 * ノーマライズ 任意の範囲のある値を、0から1の範囲の値に変換する。
 * @param x {Number}
 * @param y {Number}
 * @param p {Number}
 * @returns {Number}
 */
export function norm(x, y, p) {
  return (p - x) / (y - x)
}

/**
 * 新しい範囲における現在の値を、現在の範囲を元に変換して返す
 * map(a, b, c, d, e)   aを範囲b-cから別の範囲d-eへ変換する
 * @param value {Number}
 * @param fromMin {Number} 変換前の最小
 * @param fromMax {Number} 変換前の最大
 * @param toMin {Number} 変換後の最小
 * @param toMax {Number} 変換後の最大
 */
export function map(value, fromMin, fromMax, toMin, toMax) {
  let result = 0

  result =
    value <= fromMin
      ? toMin
      : value >= fromMax
      ? toMax
      : (() => {
          const ratio = (toMax - toMin) / (fromMax - fromMin)
          return (value - fromMin) * ratio + toMin
        })()

  return result
}

/**
 * ２点間の距離を求める
 * @param x0 {number}
 * @param y0 {number}
 * @param x1 {number}
 * @param y1 {number}
 * @returns {number}
 */
export function distance(x0, y0, x1, y1) {
  return Math.hypot(x1 - x0, y1 - y0)
}

/**
 *
 * @param max
 * @returns {number}
 */
export function randomNum(max) {
  return Math.trunc(Math.random() * max)
}

/**
 *
 * @param min
 * @param max
 * @returns {number}
 */
export function randRange(min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min)
}

/**
 * 任意の桁でまるめる関数
 * @param {number} value 切り上げする数値
 * @param {number} base どの桁で切り上げするか（10→10の位、0.1→小数第１位）
 * @return {number} 切り上げした値
 */
export function orgTrunc(value, base) {
  return Math.trunc(value * base) / base
}
