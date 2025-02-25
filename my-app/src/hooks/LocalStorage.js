import { useEffect, useState } from "react"

/**
 * Custom hook which automatically updates cart items when they are added/removed
 * @param {*} key 
 * @param {*} initialValue 
 * @returns 
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === "function") {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}