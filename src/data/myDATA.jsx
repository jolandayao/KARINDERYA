// Mga kategorya ng pagkain
export const categories = ['Ulam', 'Sabaw', 'Gulay', 'Extras', 'Drinks']

// Sample na listahan ng pagkain
export const initialFoods = [
  { id: 1, name: 'Ginamos', category: 'Ulam', price: 20, available: true, image: '' },
  { id: 2, name: 'Bulad', category: 'Ulam', price: 25, available: true, image: '' },
  { id: 3, name: 'Uyap', category: 'Ulam', price: 30, available: true, image: '' },
  { id: 4, name: 'Tinapa', category: 'Ulam', price: 35, available: true, image: '' },
  { id: 5, name: 'Eut nga isda', category: 'Ulam', price: 40, available: true, image: '' },
  { id: 6, name: 'Rice', category: 'Extras', price: 15, available: true, image: '' },
  { id: 7, name: 'Iced Tea', category: 'Drinks', price: 25, available: true, image: '' },
]

// Sample na orders (para may laman ang Dashboard)
// Ang bawat item ay kumokopya ng pangalan at presyo ng pagkain sa oras ng order
export const initialOrders = [
  {
    id: 'FE-1001',
    customerName: 'Maria Santos',
    tableNumber: '3',
    items: [
      { foodId: 1, name: 'Ginamos', price: 20, quantity: 2 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 2 },
    ],
    total: 70,
    status: 'Completed',
    paymentStatus: 'Paid',
    cashReceived: 100,
    change: 30,
    date: '2026-11-02T08:15:00',
  },
  {
    id: 'FE-1002',
    customerName: 'Jose Reyes',
    tableNumber: '',
    items: [
      { foodId: 4, name: 'Tinapa', price: 35, quantity: 1 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 1 },
      { foodId: 7, name: 'Iced Tea', price: 25, quantity: 1 },
    ],
    total: 75,
    status: 'Completed',
    paymentStatus: 'Paid',
    cashReceived: 100,
    change: 25,
    date: '2026-11-02T09:05:00',
  },
  {
    id: 'FE-1003',
    customerName: 'Ana Cruz',
    tableNumber: '5',
    items: [
      { foodId: 2, name: 'Bulad', price: 25, quantity: 2 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 2 },
    ],
    total: 80,
    status: 'Ready',
    paymentStatus: 'Unpaid',
    cashReceived: 0,
    change: 0,
    date: '2026-11-02T10:20:00',
  },
  {
    id: 'FE-1004',
    customerName: 'Carlo Garcia',
    tableNumber: '2',
    items: [
      { foodId: 3, name: 'Uyap', price: 30, quantity: 1 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 1 },
    ],
    total: 45,
    status: 'Preparing',
    paymentStatus: 'Unpaid',
    cashReceived: 0,
    change: 0,
    date: '2026-11-02T10:45:00',
  },
  {
    id: 'FE-1005',
    customerName: 'Liza Gomez',
    tableNumber: '',
    items: [
      { foodId: 5, name: 'Eut nga isda', price: 40, quantity: 1 },
      { foodId: 7, name: 'Iced Tea', price: 25, quantity: 1 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 1 },
    ],
    total: 80,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    cashReceived: 0,
    change: 0,
    date: '2026-11-02T11:10:00',
  },
  {
    id: 'FE-1006',
    customerName: 'Ben Tan',
    tableNumber: '7',
    items: [
      { foodId: 1, name: 'Ginamos', price: 20, quantity: 1 },
      { foodId: 6, name: 'Rice', price: 15, quantity: 1 },
    ],
    total: 35,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    cashReceived: 0,
    change: 0,
    date: '2026-11-02T11:30:00',
  },
]
