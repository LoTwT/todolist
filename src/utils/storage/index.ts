import type { Nullable } from "@/types"

export const getLocalStorage = <T>(key: string): Nullable<T> => {
  const res = localStorage.getItem(key)
  return res ? JSON.parse(res) : null
}

export const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value))

export const removeLocalStorage = (key: string) => localStorage.removeItem(key)
