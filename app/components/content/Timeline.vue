<script setup lang="ts">
import type { LiveEvent } from '~/types'

interface Props {
  listData: LiveEvent[]
}

const props = defineProps<Props>()

const { formatDate } = useFormatDate()

// Group events by year (descending)
const groupedByYear = computed(() => {
  const groups: { year: string; events: LiveEvent[] }[] = []
  const yearMap = new Map<string, LiveEvent[]>()

  for (const event of props.listData) {
    const year = event.date.slice(0, 4)
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(event)
  }

  // Sort years descending
  const sortedYears = [...yearMap.keys()].sort((a, b) => b.localeCompare(a))
  for (const year of sortedYears) {
    const events = yearMap.get(year)!
    // Sort events within year descending by date
    events.sort((a, b) => b.date.localeCompare(a.date))
    groups.push({ year, events })
  }

  return groups
})
</script>

<template>
  <div class="timeline">
    <div
      v-for="group in groupedByYear"
      :key="group.year"
      class="timeline__group"
    >
      <div class="timeline__year">
        <span class="timeline__year-dot" />
        <span class="timeline__year-label">{{ group.year }}</span>
      </div>

      <ul class="timeline__list">
        <li
          v-for="event in group.events"
          :key="event.id"
          class="timeline__item"
        >
          <time class="timeline__date">{{ formatDate(event.date) }}</time>
          <span class="timeline__title">{{ event.title }}</span>
          <span class="timeline__place">{{ event.place }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/sass/foundation/mixin/mixin" as *;

.timeline {
  position: relative;
  padding-left: calc(100vw * 20 / 375);

  @include desktop {
    padding-left: calc(100vw * 30 / 1024);
  }

  // Vertical line
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background-color: $color-gray-level2;
  }
}

.timeline__group {
  & + & {
    margin-top: calc(100vw * 30 / 375);

    @include desktop {
      margin-top: calc(100vw * 30 / 1024);
    }
  }
}

.timeline__year {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
  margin-bottom: calc(100vw * 15 / 375);

  @include desktop {
    gap: calc(100vw * 10 / 1024);
    margin-bottom: calc(100vw * 15 / 1024);
  }
}

.timeline__year-dot {
  position: absolute;
  left: calc(100vw * -20 / 375 - 4px);
  width: 9px;
  height: 9px;
  background-color: $color-primary;
  border-radius: 50%;

  @include desktop {
    left: calc(100vw * -30 / 1024 - 4px);
  }
}

.timeline__year-label {
  font-family: $font-Nunito;
  font-size: calc(100vw * 22 / 375);
  font-weight: $font-Nunito-bold;
  color: $color-white;
  letter-spacing: 0.05em;

  @include desktop {
    font-size: calc(100vw * 24 / 1024);
  }
}

.timeline__list {
  display: flex;
  flex-direction: column;
  gap: calc(100vw * 10 / 375);

  @include desktop {
    gap: calc(100vw * 8 / 1024);
  }
}

.timeline__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: calc(100vw * 10 / 375);
  border-bottom: 1px solid rgba($color-gray-level2, 0.3);

  @include desktop {
    flex-direction: row;
    align-items: baseline;
    gap: calc(100vw * 20 / 1024);
    padding-bottom: calc(100vw * 8 / 1024);
  }
}

.timeline__date {
  font-family: $font-Nunito;
  font-size: calc(100vw * 11 / 375);
  font-weight: $font-Nunito-bold;
  color: $color-gray-level3;
  letter-spacing: 0.02em;
  white-space: nowrap;

  @include desktop {
    font-size: calc(100vw * 11 / 1024);
    min-width: calc(100vw * 120 / 1024);
  }
}

.timeline__title {
  font-size: calc(100vw * 13 / 375);
  font-weight: bold;
  color: $color-white;
  line-height: 1.4;

  @include desktop {
    font-size: calc(100vw * 13 / 1024);
    flex: 1;
  }
}

.timeline__place {
  font-size: calc(100vw * 11 / 375);
  color: $color-gray-level2;

  @include desktop {
    font-size: calc(100vw * 11 / 1024);
    min-width: calc(100vw * 160 / 1024);
    text-align: right;
  }
}
</style>
