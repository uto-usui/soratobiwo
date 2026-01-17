/**
 * Mouse follow effect composable
 * Creates smooth mouse-following animation for interactive elements
 */

interface MouseFollowOptions {
  /** Maximum offset in pixels */
  maxOffset?: number
  /** Animation speed (0-1, lower is slower) */
  speed?: number
  /** Scale on hover */
  hoverScale?: number
  /** Enable rotation effect */
  enableRotation?: boolean
  /** Rotation factor */
  rotationFactor?: number
}

interface MouseFollowState {
  offsetX: number
  offsetY: number
  scale: number
  rotation: number
  isHovered: boolean
}

export const useMouseFollow = (options: MouseFollowOptions = {}) => {
  const {
    maxOffset = 10,
    speed = 0.15,
    hoverScale = 1.05,
    enableRotation = false,
    rotationFactor = 0.1,
  } = options

  const elementRef = ref<HTMLElement | null>(null)
  const state = reactive<MouseFollowState>({
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    rotation: 0,
    isHovered: false,
  })

  let targetX = 0
  let targetY = 0
  let targetScale = 1
  let targetRotation = 0
  let animationId: number | null = null
  let isActive = false

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!elementRef.value || !state.isHovered) return

    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate offset based on mouse position relative to center
    targetX = ((e.clientX - centerX) / rect.width) * maxOffset * 2
    targetY = ((e.clientY - centerY) / rect.height) * maxOffset * 2

    if (enableRotation) {
      targetRotation = ((e.clientX - centerX) / rect.width) * rotationFactor * 10
    }
  }

  const handleMouseEnter = (): void => {
    state.isHovered = true
    targetScale = hoverScale
  }

  const handleMouseLeave = (): void => {
    state.isHovered = false
    targetX = 0
    targetY = 0
    targetScale = 1
    targetRotation = 0
  }

  const animate = (): void => {
    if (!isActive) return

    state.offsetX = lerp(state.offsetX, targetX, speed)
    state.offsetY = lerp(state.offsetY, targetY, speed)
    state.scale = lerp(state.scale, targetScale, speed)
    state.rotation = lerp(state.rotation, targetRotation, speed)

    if (elementRef.value) {
      let transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`
      if (enableRotation) {
        transform += ` rotate(${state.rotation}deg)`
      }
      elementRef.value.style.transform = transform
    }

    animationId = requestAnimationFrame(animate)
  }

  const init = (el: HTMLElement): void => {
    elementRef.value = el
    isActive = true

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

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
      elementRef.value.removeEventListener('mouseenter', handleMouseEnter)
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
 * Magnetic button effect
 * Creates a magnetic pull effect when mouse is near the element
 */
export const useMagneticButton = (options: { strength?: number; radius?: number } = {}) => {
  const { strength = 0.3, radius = 100 } = options

  const elementRef = ref<HTMLElement | null>(null)
  let animationId: number | null = null
  let isActive = false

  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < radius) {
      const pull = (1 - distance / radius) * strength
      targetX = distanceX * pull
      targetY = distanceY * pull
    } else {
      targetX = 0
      targetY = 0
    }
  }

  const handleMouseLeave = (): void => {
    targetX = 0
    targetY = 0
  }

  const animate = (): void => {
    if (!isActive) return

    currentX = lerp(currentX, targetX, 0.15)
    currentY = lerp(currentY, targetY, 0.15)

    if (elementRef.value) {
      elementRef.value.style.transform = `translate(${currentX}px, ${currentY}px)`
    }

    animationId = requestAnimationFrame(animate)
  }

  const init = (el: HTMLElement): void => {
    elementRef.value = el
    isActive = true

    // Listen on document to detect mouse near element
    document.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    animate()
  }

  const destroy = (): void => {
    isActive = false

    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    document.removeEventListener('mousemove', handleMouseMove)

    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
      elementRef.value.style.transform = ''
      elementRef.value = null
    }
  }

  onUnmounted(destroy)

  return {
    init,
    destroy,
  }
}
