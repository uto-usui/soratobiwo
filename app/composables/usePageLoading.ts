import { useMainStore } from '~/stores/main'
import { storeToRefs } from 'pinia'

/**
 * 初回表示のローダーを閉じるタイミングを決める。
 * ローダーが出きってから delay 待って pageReady を立てる。
 * ページ移動では pageReady を戻さないので、ローダーは初回だけ出る（移動時は pageTransition のフェード）。
 *
 * @param delay - Time in ms to wait after loader is fully visible (default: 200)
 */
export function usePageLoading(delay = 200) {
  const store = useMainStore()
  const { loaderEntered } = storeToRefs(store)

  watch(loaderEntered, (entered) => {
    if (entered) {
      setTimeout(() => {
        store.setPageReady(true)
      }, delay)
    }
  })
}
