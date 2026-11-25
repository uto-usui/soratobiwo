export function pick<T extends object, K extends keyof T>(item: T, keys: readonly K[]): Pick<T, K> {
  const picked = {} as Pick<T, K>
  for (const key of keys) picked[key] = item[key]
  return picked
}
