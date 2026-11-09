import { useState } from 'react'
import { categories } from '../data/myDATA'
import { useRestaurant } from '../context/RestaurantContext'
import FoodTable from '../components/FoodTable'
import FoodFormModal from '../components/FoodFormModal'

const emptyForm = { name: '', category: 'Ulam', price: '', available: true, image: '' }

function FoodMenu() {
  const { foods, setFoods } = useRestaurant()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const openAddForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEditForm = (food) => {
    setEditingId(food.id)
    setForm(food)
    setShowForm(true)
  }

  const handleSave = () => {
    if (form.name.trim() === '') {
      alert('Please enter a food name.')
      return
    }
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert('Please enter a price greater than 0.')
      return
    }

    const newFood = {
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      image: form.image || '',
    }

    if (editingId === null) {
      newFood.id = Date.now()
      setFoods([...foods, newFood])
    } else {
      setFoods(foods.map((food) => (food.id === editingId ? newFood : food)))
    }
    setShowForm(false)
  }

  const handleDelete = (food) => {
    if (window.confirm('Delete ' + food.name + '?')) {
      setFoods(foods.filter((f) => f.id !== food.id))
    }
  }

  const toggleAvailable = (id) => {
    setFoods(foods.map((f) => (f.id === id ? { ...f, available: !f.available } : f)))
  }

  const filteredFoods = foods.filter((food) => {
    const nameMatches = food.name.toLowerCase().includes(search.toLowerCase())
    const categoryMatches = category === 'All' || food.category === category
    return nameMatches && categoryMatches
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <p className="text-sm text-brand-gray">
          Manage the food and drinks available in your karinderya.
        </p>
        <button className="btn btn-primary w-full sm:w-auto" onClick={openAddForm}>
          + Add Food
        </button>
      </div>

      <div className="card bg-white border border-base-300">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg">Food Items</h3>
            <p className="text-xs text-brand-gray">{foods.length} items in your menu</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="select select-sm w-full sm:w-auto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              className="input input-sm w-full sm:w-56"
              placeholder="Search foods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <FoodTable
          foods={filteredFoods}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onToggle={toggleAvailable}
        />
      </div>

      {showForm && (
        <FoodFormModal
          title={editingId !== null ? 'Edit Food' : 'Add Food'}
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default FoodMenu
