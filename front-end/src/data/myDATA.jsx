export const categories = ['Ulam', 'Soup', 'Rice', 'Drinks', 'Snacks'];

export const foodImageOptions = [
  { name: 'Bulad', path: '/images/Bulad.jpg' },
  { name: 'Ginamos', path: '/images/ginamos.jpg' },
  { name: 'Iced Tea', path: '/images/ice tea.jpg' },
  { name: 'Karne', path: '/images/karne.jpg' },
  { name: 'Rice', path: '/images/RICE.jpg' },
  { name: 'Tinapa', path: '/images/tinapa.jpg' },
  { name: 'Uyap', path: '/images/Uyap.jpg' },
];

const defaultFoodImages = {
  ginamos: '/images/ginamos.jpg',
  bulad: '/images/Bulad.jpg',
  uyap: '/images/Uyap.jpg',
  tinapa: '/images/tinapa.jpg',
  rice: '/images/RICE.jpg',
  'iced tea': '/images/ice tea.jpg',
  'eut nga isda': '/images/karne.jpg',
  karne: '/images/karne.jpg',
};

export function getFoodImage(food) {
  return food.image || defaultFoodImages[food.name.trim().toLowerCase()] || '';
}

export const initialFoods = [
  { id: 1, name: 'Ginamos', category: 'Ulam', price: 20, available: true, image: '/images/ginamos.jpg' },
  { id: 2, name: 'Bulad', category: 'Ulam', price: 25, available: true, image: '/images/Bulad.jpg' },
  { id: 3, name: 'Uyap', category: 'Ulam', price: 30, available: true, image: '/images/Uyap.jpg' },
  { id: 4, name: 'Tinapa', category: 'Ulam', price: 35, available: true, image: '/images/tinapa.jpg' },
  { id: 6, name: 'Rice', category: 'Rice', price: 15, available: true, image: '/images/RICE.jpg' },
  { id: 7, name: 'Iced Tea', category: 'Drinks', price: 25, available: true, image: '/images/ice tea.jpg' },
];

export const initialOrders = [];