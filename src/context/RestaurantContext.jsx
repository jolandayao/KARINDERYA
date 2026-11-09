import { createContext, useContext, useState, useEffect } from 'react'
import { initialFoods, initialOrders } from '../data/myDATA'

// 1. Lalagyan ng shared data
const RestaurantContext = createContext()

// Kunin ang data sa LocalStorage. Kung wala o sira, gamitin ang sample data.
function loadFromStorage(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // sirang data: balik sa sample
  }
  return defaultValue
}

// 2. Provider: may hawak ng data at nagbabahagi nito
export function RestaurantProvider({ children }) {
  const [foods, setFoods] = useState(() => loadFromStorage('foods', initialFoods))
  const [orders, setOrders] = useState(() => loadFromStorage('orders', initialOrders))

  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods))
  }, [foods])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const sharedData = { foods, setFoods, orders, setOrders }

  return (
    <RestaurantContext.Provider value={sharedData}>
      {children}
    </RestaurantContext.Provider>
  )
}

// 3. Maikling paraan para kunin ang shared data
// eslint-disable-next-line react-refresh/only-export-components
export function useRestaurant() {
  return useContext(RestaurantContext)
}
