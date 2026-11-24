import { useMainStore } from '~/stores/main'
import { storeToRefs } from 'pinia'

/**
 * Composable to handle page loading transition timing.
 * Waits for the loader's enter transition to complete,
 * then waits an additional delay before setting pageReady to true.
 *
 * @param delay - Time in ms to wait after loader is fully visible (default: 200)
 */
export function usePageLoading(delay = 200) {
  const store = useMainStore()
  const { loaderEntered } = storeToRefs(store)

  // Watch for loader enter transition completion
  // Wait specified delay after loader is fully visible, then set pageReady
  watch(loaderEntered, (entered) => {
    if (entered) {
      setTimeout(() => {
        store.setPageReady(true)
      }, delay)
    }
  })

  // Reset page ready on unmount to trigger loader for next page
  onBeforeUnmount(() => {
    store.setPageReady(false)
  })
}
