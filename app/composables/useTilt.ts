/**
 * Tilt effect composable
 * Creates a 3D tilt effect based on mouse position
 */

interface TiltOptions {
  /** Maximum tilt angle in degrees */
  maxTilt?: number
  /** Perspective distance in pixels */
  perspective?: number
  /** Animation speed (0-1, lower is slower) */
  speed?: number
  /** Enable skew effect */
  enableSkew?: boolean
  /** Skew factor */
  skewFactor?: number
}

interface TiltState {
  targetX: number
  targetY: number
  currentX: number
  currentY: number
  skewX: number
  skewY: number
}

export const useTilt = (options: TiltOptions = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    speed = 0.1,
    enableSkew = true,
    skewFactor = 0.01,
  } = options

  const elementRef = ref<HTMLElement | null>(null)
  const state = reactive<TiltState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    skewX: 0,
    skewY: 0,
  })

  let animationId: number | null = null
  let isActive = false

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    state.targetX = -percentY * maxTilt
    state.targetY = percentX * maxTilt

    if (enableSkew) {
      state.skewX = percentX * maxTilt * skewFactor
      state.skewY = percentX * maxTilt * skewFactor
    }
  }

  const handleMouseLeave = (): void => {
    state.targetX = 0
    state.targetY = 0
    state.skewX = 0
    state.skewY = 0
  }

  const animate = (): void => {
    if (!isActive) return

    state.currentX = lerp(state.currentX, state.targetX, speed)
    state.currentY = lerp(state.currentY, state.targetY, speed)

    if (elementRef.value) {
      let transform = `perspective(${perspective}px) rotateX(${state.currentX}deg) rotateY(${state.currentY}deg)`

      if (enableSkew) {
        const currentSkewX = lerp(0, state.skewX, speed)
        const currentSkewY = lerp(0, state.skewY, speed)
        transform += ` skewX(${currentSkewX}deg) skewY(${currentSkewY}deg)`
      }

      elementRef.value.style.transform = transform
    }

    animationId = requestAnimationFrame(animate)
  }

  const init = (el: HTMLElement): void => {
    elementRef.value = el
    isActive = true

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    // Start animation loop
    animate()
  }

  const destroy = (): void => {
    isActive = false

    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    if (elementRef.value) {
      elementRef.value.removeEventListener('mousemove', handleMouseMove)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
      elementRef.value.style.transform = ''
      elementRef.value = null
    }
  }

  onUnmounted(destroy)

  return {
    init,
    destroy,
    state: readonly(state),
  }
}

/**
 * Parallax tilt effect for child elements
 * Based on data-mouse-parallax attribute
 */
export const useParallaxTilt = () => {
  const containerRef = ref<HTMLElement | null>(null)
  let animationId: number | null = null
  let isActive = false

  const targets: Map<HTMLElement, { targetX: number; targetY: number; currentX: number; currentY: number }> = new Map()

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()
    const xMouse = e.clientX - rect.left - rect.width / 2
    const yMouse = e.clientY - rect.top - rect.height / 2

    const elements = containerRef.value.querySelectorAll<HTMLElement>('[data-mouse-parallax]')

    elements.forEach((el) => {
      const factor = parseFloat(el.dataset.mouseParallax || '1')
      const xFinal = xMouse * factor * 0.1 * -1
      const yFinal = yMouse * factor * 0.1 * -1

      if (!targets.has(el)) {
        targets.set(el, { targetX: 0, targetY: 0, currentX: 0, currentY: 0 })
      }

      const state = targets.get(el)!
      state.targetX = xFinal
      state.targetY = yFinal
    })
  }

  const handleMouseLeave = (): void => {
    targets.forEach((state) => {
      state.targetX = 0
      state.targetY = 0
    })
  }

  const animate = (): void => {
    if (!isActive) return

    targets.forEach((state, el) => {
      state.currentX = lerp(state.currentX, state.targetX, 0.1)
      state.currentY = lerp(state.currentY, state.targetY, 0.1)

      const skewX = state.currentX * 0.01
      const skewY = state.currentX * 0.01

      el.style.transform = `translate(${state.currentX}px, ${state.currentY}px) skewX(${skewX}deg) skewY(${skewY}deg)`
    })

    animationId = requestAnimationFrame(animate)
  }

  const init = (container: HTMLElement): void => {
    containerRef.value = container
    isActive = true

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    animate()
  }

  const destroy = (): void => {
    isActive = false

    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    if (containerRef.value) {
      containerRef.value.removeEventListener('mousemove', handleMouseMove)
      containerRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }

    targets.forEach((_, el) => {
      el.style.transform = ''
    })
    targets.clear()

    containerRef.value = null
  }

  onUnmounted(destroy)

  return {
    init,
    destroy,
  }
}
