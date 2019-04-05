/**
 * ユーザーエージェントが、Mobileかどうかを真偽値で返す
 * Mobile = true:  phone
 * Mobile = false: PC, Tablet
 * @returns {boolean}
 */
const checkUa = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  let mobile = false

  /**
   * ios, android, blackberry
   */
  if (
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('ipod') > 0 ||
    (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) ||
    (ua.indexOf('bb') > 0 && ua.indexOf('mobile') > 0)
  ) {
    mobile = true
  }

  return mobile
}

export default checkUa()
