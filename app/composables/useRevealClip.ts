/**
 * Reveal Clip effect composable
 * Uses Web Animations API for clip-path animations
 */

type Direction = 'lr' | 'rl' | 'tb' | 'bt'

interface RevealOptions {
  /** Animation duration in milliseconds */
  duration?: number
  /** CSS easing function */
  easing?: string
  /** Delay before animation starts in milliseconds */
  delay?: number
}

interface ClipPaths {
  from: string
  to: string
}

const clipPathMap: Record<Direction, { reveal: ClipPaths; hide: ClipPaths }> = {
  lr: {
    reveal: { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' },
    hide: { from: 'inset(0 0 0 0)', to: 'inset(0 0 0 100%)' },
  },
  rl: {
    reveal: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' },
    hide: { from: 'inset(0 0 0 0)', to: 'inset(0 100% 0 0)' },
  },
  tb: {
    reveal: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' },
    hide: { from: 'inset(0 0 0 0)', to: 'inset(100% 0 0 0)' },
  },
  bt: {
    reveal: { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' },
    hide: { from: 'inset(0 0 0 0)', to: 'inset(0 0 100% 0)' },
  },
}

export const useRevealClip = (options: RevealOptions = {}) => {
  const {
    duration = 800,
    easing = 'cubic-bezier(0.77, 0, 0.175, 1)',
    delay = 0,
  } = options

  /**
   * Reveal an element with clip-path animation
   */
  const reveal = (
    element: HTMLElement,
    direction: Direction = 'lr',
    customOptions?: Partial<RevealOptions>
  ): Animation => {
    const { from, to } = clipPathMap[direction].reveal
    const finalDuration = customOptions?.duration ?? duration
    const finalEasing = customOptions?.easing ?? easing
    const finalDelay = customOptions?.delay ?? delay

    return element.animate(
      [
        { clipPath: from },
        { clipPath: to },
      ],
      {
        duration: finalDuration,
        easing: finalEasing,
        delay: finalDelay,
        fill: 'forwards',
      }
    )
  }

  /**
   * Hide an element with clip-path animation
   */
  const hide = (
    element: HTMLElement,
    direction: Direction = 'lr',
    customOptions?: Partial<RevealOptions>
  ): Animation => {
    const { from, to } = clipPathMap[direction].hide
    const finalDuration = customOptions?.duration ?? duration
    const finalEasing = customOptions?.easing ?? easing
    const finalDelay = customOptions?.delay ?? delay

    return element.animate(
      [
        { clipPath: from },
        { clipPath: to },
      ],
      {
        duration: finalDuration,
        easing: finalEasing,
        delay: finalDelay,
        fill: 'forwards',
      }
    )
  }

  /**
   * Reveal with color overlay effect
   */
  const revealWithOverlay = async (
    element: HTMLElement,
    overlayElement: HTMLElement,
    direction: Direction = 'lr',
    customOptions?: Partial<RevealOptions>
  ): Promise<void> => {
    const finalDuration = customOptions?.duration ?? duration

    // First, reveal the overlay
    const overlayAnimation = reveal(overlayElement, direction, {
      ...customOptions,
      duration: finalDuration * 0.5,
    })

    await overlayAnimation.finished

    // Then reveal the content and hide the overlay
    const contentAnimation = reveal(element, direction, {
      ...customOptions,
      duration: finalDuration * 0.5,
    })

    hide(overlayElement, direction === 'lr' ? 'rl' : direction === 'rl' ? 'lr' : direction === 'tb' ? 'bt' : 'tb', {
      ...customOptions,
      duration: finalDuration * 0.5,
    })

    await contentAnimation.finished
  }

  /**
   * Staggered reveal for multiple elements
   */
  const revealStaggered = (
    elements: HTMLElement[],
    direction: Direction = 'lr',
    staggerDelay = 100,
    customOptions?: Partial<RevealOptions>
  ): Animation[] => {
    return elements.map((element, index) =>
      reveal(element, direction, {
        ...customOptions,
        delay: (customOptions?.delay ?? delay) + index * staggerDelay,
      })
    )
  }

  /**
   * Set initial hidden state
   */
  const setHidden = (element: HTMLElement, direction: Direction = 'lr'): void => {
    const { from } = clipPathMap[direction].reveal
    element.style.clipPath = from
  }

  /**
   * Set visible state
   */
  const setVisible = (element: HTMLElement): void => {
    element.style.clipPath = 'inset(0 0 0 0)'
  }

  return {
    reveal,
    hide,
    revealWithOverlay,
    revealStaggered,
    setHidden,
    setVisible,
  }
}

/**
 * Auto-reveal on scroll using Intersection Observer
 */
export const useRevealOnScroll = (options: RevealOptions & { threshold?: number } = {}) => {
  const { threshold = 0.1, ...revealOptions } = options
  const { reveal, setHidden } = useRevealClip(revealOptions)

  const observedElements: Map<HTMLElement, { direction: Direction; revealed: boolean }> = new Map()
  let observer: IntersectionObserver | null = null

  const init = (): void => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const config = observedElements.get(element)

            if (config && !config.revealed) {
              config.revealed = true
              reveal(element, config.direction)
            }
          }
        })
      },
      { threshold }
    )
  }

  const observe = (element: HTMLElement, direction: Direction = 'lr'): void => {
    if (!observer) init()

    setHidden(element, direction)
    observedElements.set(element, { direction, revealed: false })
    observer?.observe(element)
  }

  const unobserve = (element: HTMLElement): void => {
    observer?.unobserve(element)
    observedElements.delete(element)
  }

  const destroy = (): void => {
    observer?.disconnect()
    observer = null
    observedElements.clear()
  }

  onUnmounted(destroy)

  return {
    observe,
    unobserve,
    destroy,
  }
}
