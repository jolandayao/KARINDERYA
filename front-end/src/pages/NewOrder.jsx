import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'

function NewOrder() {
  const navigate = useNavigate()
  const { foods, addOrder, settings } = useRestaurant()
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [quantities, setQuantities] = useState({})
  const [error, setError] = useState('')
  const availableFoods = foods.filter((food) => food.available)
  const selectedItems = availableFoods.filter((food) => Number(quantities[food.id]) > 0)
  const total = selectedItems.reduce(
    (sum, food) => sum + food.price * Number(quantities[food.id]),
    0,
  )

  const updateQuantity = (foodId, value) => {
    setQuantities((current) => ({ ...current, [foodId]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!customerName.trim()) {
      setError('Enter a customer name to continue.')
      return
    }
    if (selectedItems.length === 0) {
      setError('Choose at least one available menu item.')
      return
    }

    const now = new Date()
    const order = {
      id: `FE-${now.getTime()}`,
      customerName: customerName.trim(),
      tableNumber: tableNumber.trim(),
      items: selectedItems.map((food) => ({
        foodId: food.id,
        name: food.name,
        price: food.price,
        quantity: Number(quantities[food.id]),
      })),
      total,
      currency: settings.currency,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      cashReceived: 0,
      change: 0,
      date: now.toISOString(),
    }

    addOrder(order)
    navigate('/orders')
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
      <section className="card bg-white border border-base-300 shadow-sm">
        <div className="card-body gap-4">
          <div>
            <h3 className="card-title">Select menu items</h3>
            <p className="text-sm text-brand-gray">Set the quantity for each item in this order.</p>
          </div>
          {availableFoods.length === 0 ? (
            <div className="alert">No items are currently available. Update the menu before taking an order.</div>
          ) : (
            <div className="divide-y divide-base-300">
              {availableFoods.map((food) => (
                <div key={food.id} className="py-3 flex flex-wrap items-center gap-3">
                  {food.image && <img src={food.image} alt="" className="w-12 h-12 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-32">
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-sm text-brand-gray">{food.category} · {settings.currency}{Number(food.price).toFixed(2)}</p>
                  </div>
                  <label className="form-control w-24">
                    <span className="label-text text-xs mb-1">Quantity</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      className="input input-bordered input-sm"
                      value={quantities[food.id] ?? ''}
                      onChange={(event) => updateQuantity(food.id, event.target.value)}
                      aria-label={`Quantity for ${food.name}`}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className="card bg-white border border-base-300 shadow-sm xl:sticky xl:top-4">
        <div className="card-body gap-4">
          <h3 className="card-title">Order details</h3>
          {error && <div role="alert" className="alert alert-error text-sm">{error}</div>}
          <label className="form-control">
            <span className="label-text mb-1">Customer name *</span>
            <input className="input input-bordered w-full" value={customerName} onChange={(event) => setCustomerName(event.target.value)} required />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Table number (optional)</span>
            <input className="input input-bordered w-full" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)} />
          </label>
          <div className="divider my-0" />
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{settings.currency}{total.toFixed(2)}</span></div>
          <button className="btn btn-primary w-full" type="submit" disabled={!availableFoods.length}>Create Order</button>
          <Link className="btn btn-ghost" to="/menu">Manage menu</Link>
        </div>
      </aside>
    </form>
  )
}

export default NewOrder
