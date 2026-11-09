import { createContext, useContext, useState, useEffect } from 'react'
import { initialFoods, initialOrders } from '../data/myDATA'

const RestaurantContext = createContext()

function loadFromStorage(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {

  }
  return defaultValue
}


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

export function useRestaurant() {
  return useContext(RestaurantContext)
}
