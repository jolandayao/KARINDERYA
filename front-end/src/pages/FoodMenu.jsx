import { useState } from 'react'
import { categories, foodImageOptions, getFoodImage } from '../data/myDATA'
import { useRestaurant } from '../context/RestaurantContext'

const emptyForm = { name: '', category: 'Ulam', price: '', available: true, image: '' }

function FoodMenu() {
  const { foods, setFoods } = useRestaurant()
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (food) => {
    setEditingId(food.id);
    setForm(food);
    setShowForm(true);
  };

  const handleSave = () => {
    if (form.name.trim() === '') {
      alert('Please enter a food name.');
      return;
    }
    if (Number(form.price) <= 0 || isNaN(Number(form.price))) {
      alert('Please enter a price that is greater than 0.');
      return;
    }

    const newFood = {
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      image: form.image || '',
    };

    if (editingId === null) {
      newFood.id = Date.now();
      setFoods((currentFoods) => [...currentFoods, newFood])
    } else {
      setFoods((currentFoods) => currentFoods.map((food) => (
        food.id === editingId ? { ...newFood, id: editingId } : food
      )))
    }
    setShowForm(false);
  };

  const handleDelete = (foodId) => {
    const foodToDelete = foods.find(f => f.id === foodId);
    const sure = window.confirm('Delete ra ' + foodToDelete?.name + '?');
    if (sure) {
      setFoods((currentFoods) => currentFoods.filter((food) => food.id !== foodId))
    }
  };

  const toggleAvailable = (id) => {
    setFoods((currentFoods) => currentFoods.map((food) => (
      food.id === id ? { ...food, available: !food.available } : food
    )))
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = category === 'All' || food.category === category;
    return matchesSearch && categoryMatches;
  });

  const showImage = (food) => {
    const image = getFoodImage(food);
    if (image) {
      return (
        <img
          src={image}
          alt={food.name}
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center text-xs font-bold">
        {food.name.charAt(0)}
      </div>
    );
  };

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
        <p className="text-sm text-brand-gray">
          Manage the food and drinks available in your karinderya.
        </p>
        <button className="btn btn-primary" onClick={openAddForm}>
          + Add Food
        </button>
      </div>

      <div className="card bg-white border border-base-300">
        <div className="p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg">Food Items</h3>
            <p className="text-xs text-brand-gray">{foods.length} items is in your menu.</p>
          </div>

          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="text"
              className="input input-bordered"
              placeholder="Search foods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="bg-base-200 text-xs uppercase">
                <th className="px-4">Food</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food.id}>
                  <td className="px-4">
                    <div className="flex items-center gap-3">
                      {showImage(food)}
                      <span className="font-medium">{food.name}</span>
                    </div>
                  </td>
                  <td>{food.category}</td>
                  <td>₱{food.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${food.available ? 'badge-success' : 'badge-error'}`}>
                      {food.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-xs btn-outline" onClick={() => openEditForm(food)}>
                        Edit
                      </button>
                      <button className="btn btn-xs btn-outline" onClick={() => toggleAvailable(food.id)}>
                        {food.available ? 'Disable' : 'Enable'}
                      </button>
                      <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDelete(food.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFoods.length === 0 && (
            <p className="text-center py-8 text-brand-gray">No food items found.</p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">{editingId !== null ? 'Edit Food' : 'Add Food'}</h3>
            
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter food name"
            />

            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full mb-3"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full mb-3"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Enter price"
            />

            <label className="label">
              <span className="label-text">Choose a food image</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {foodImageOptions.map((option) => (
                <button
                  key={option.path}
                  type="button"
                  onClick={() => setForm({ ...form, image: option.path })}
                  aria-pressed={form.image === option.path}
                  aria-label={`Choose ${option.name} image`}
                  className={`rounded-lg border-2 p-2 text-left transition-colors ${form.image === option.path ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary/50'}`}
                >
                  <img src={option.path} alt="" className="w-full h-20 object-cover rounded-md" />
                  <span className="block text-sm mt-1">{option.name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-ghost mb-3"
              onClick={() => setForm({ ...form, image: '' })}
            >
              Clear image selection
            </button>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowForm(false)}></div>
        </div>
      )}
    </div>
  );
}

export default FoodMenu;