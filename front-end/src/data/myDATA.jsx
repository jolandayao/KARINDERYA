export const categories = ['Ulam', 'Soup', 'Rice', 'Drinks', 'Snacks'];

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

export const foodImageOptions = [
  { name: 'Bulad', path: assetUrl('images/Bulad.jpg') },
  { name: 'Ginamos', path: assetUrl('images/ginamos.jpg') },
  { name: 'Iced Tea', path: assetUrl('images/ice tea.jpg') },
  { name: 'Karne', path: assetUrl('images/karne.jpg') },
  { name: 'Rice', path: assetUrl('images/RICE.jpg') },
  { name: 'Tinapa', path: assetUrl('images/tinapa.jpg') },
  { name: 'Uyap', path: assetUrl('images/Uyap.jpg') },
];

const defaultFoodImages = {
  ginamos: assetUrl('images/ginamos.jpg'),
  bulad: assetUrl('images/Bulad.jpg'),
  uyap: assetUrl('images/Uyap.jpg'),
  tinapa: assetUrl('images/tinapa.jpg'),
  rice: assetUrl('images/RICE.jpg'),
  'iced tea': assetUrl('images/ice tea.jpg'),
  'eut nga isda': assetUrl('images/karne.jpg'),
  karne: assetUrl('images/karne.jpg'),
};

export function getFoodImage(food) {
  if (food.image) {
    return food.image.startsWith('/images/') ? assetUrl(food.image) : food.image;
  }
  return defaultFoodImages[food.name.trim().toLowerCase()] || '';
}

export const initialFoods = [
  { id: 1, name: 'Ginamos', category: 'Ulam', price: 20, available: true, image: assetUrl('images/ginamos.jpg') },
  { id: 2, name: 'Bulad', category: 'Ulam', price: 25, available: true, image: assetUrl('images/Bulad.jpg') },
  { id: 3, name: 'Uyap', category: 'Ulam', price: 30, available: true, image: assetUrl('images/Uyap.jpg') },
  { id: 4, name: 'Tinapa', category: 'Ulam', price: 35, available: true, image: assetUrl('images/tinapa.jpg') },
  { id: 6, name: 'Rice', category: 'Rice', price: 15, available: true, image: assetUrl('images/RICE.jpg') },
  { id: 7, name: 'Iced Tea', category: 'Drinks', price: 25, available: true, image: assetUrl('images/ice tea.jpg') },
];

export const initialOrders = [];