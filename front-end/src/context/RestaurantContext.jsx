import { createContext, useContext, useEffect, useState } from 'react'
import { initialFoods } from '../data/myDATA'

const RestaurantContext = createContext(null)

const STORAGE_KEYS = {
  foods: 'foods-v6',
  settings: 'flora-settings',
}

const DEFAULT_SETTINGS = {
  restaurantName: 'FloraEatery',
  tagline: 'Karinderya Ordering System',
  address: 'Tanjay, Negros Oriental',
  contactNumber: '09283847575',
  isOpen: true,
  currency: '₱',
  adminName: 'Flora Admin',
  adminRole: 'Administrator',
  adminAvatar: '',
}

function readArray(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key)
    if (savedValue === null) return fallback

    const parsedValue = JSON.parse(savedValue)
    return Array.isArray(parsedValue) ? parsedValue : fallback
  } catch (error) {
    console.error(`Could not load ${key} from local storage.`, error)
    return fallback
  }
}

// Use an object copy so updating settings never changes the shared defaults.
function readSettings() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEYS.settings)
    if (savedValue === null) return DEFAULT_SETTINGS

    const parsedValue = JSON.parse(savedValue)
    if (!parsedValue || typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
      return DEFAULT_SETTINGS
    }

    return { ...DEFAULT_SETTINGS, ...parsedValue }
  } catch (error) {
    console.error('Could not load restaurant settings from local storage.', error)
    return DEFAULT_SETTINGS
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Could not save ${key} to local storage.`, error)
  }
}

export function RestaurantProvider({ children }) {
  const [foods, setFoods] = useState(() => readArray(STORAGE_KEYS.foods, initialFoods))
  const [orders, setOrders] = useState([])
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.foods, foods)
  }, [foods])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings)
  }, [settings])

  const paidTransactions = orders.filter((order) => order.paymentStatus === 'Paid')

  const resetData = () => {
    setFoods(initialFoods)
    setOrders([])
    setSettings(DEFAULT_SETTINGS)
  }

  const addOrder = (order) => {
    setOrders((currentOrders) => [order, ...currentOrders])
  }

  const updateOrder = (orderId, changes) => {
    setOrders((currentOrders) => currentOrders.map((order) => (
      order.id === orderId ? { ...order, ...changes } : order
    )))
  }

  const value = {
    foods,
    setFoods,
    orders,
    setOrders,
    settings,
    setSettings,
    paidTransactions,
    resetData,
    addOrder,
    updateOrder,
  }

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components -- This module keeps the provider and its context hook together.
export function useRestaurant() {
  const context = useContext(RestaurantContext)

  if (context === null) {
    throw new Error('useRestaurant must be used inside RestaurantProvider.')
  }

  return context
}
