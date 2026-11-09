// Listahan ng pagkain: table sa malaking screen, cards sa maliit na screen
function FoodImage({ food }) {
  if (food.image) {
    return <img src={food.image} alt={food.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
  }
  return (
    <div className="w-10 h-10 shrink-0 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center text-sm font-bold">
      {food.name.charAt(0)}
    </div>
  )
}

function FoodActions({ food, onEdit, onDelete }) {
  return (
    <div className="flex gap-1">
      <button className="btn btn-xs" onClick={() => onEdit(food)}>Edit</button>
      <button className="btn btn-xs btn-error btn-soft" onClick={() => onDelete(food)}>Delete</button>
    </div>
  )
}

function FoodTable({ foods, onEdit, onDelete, onToggle }) {
  if (foods.length === 0) {
    return <p className="text-center py-10 text-brand-gray">No foods found.</p>
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden divide-y divide-base-300">
        {foods.map((food) => (
          <div key={food.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <FoodImage food={food} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{food.name}</p>
                <p className="text-xs text-brand-gray">{food.category}</p>
              </div>
              <p className="font-bold">₱{food.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-sm"
                  checked={food.available}
                  onChange={() => onToggle(food.id)}
                />
                {food.available ? 'Available' : 'Not available'}
              </label>
              <FoodActions food={food} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>
        ))}
      </div>

      {/* Tablet at laptop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="bg-base-200 text-xs uppercase">
              <th className="px-4">Food</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td className="px-4">
                  <div className="flex items-center gap-3">
                    <FoodImage food={food} />
                    <span className="font-semibold">{food.name}</span>
                  </div>
                </td>
                <td>{food.category}</td>
                <td>₱{food.price.toFixed(2)}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm"
                    checked={food.available}
                    onChange={() => onToggle(food.id)}
                  />
                </td>
                <td>
                  <FoodActions food={food} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FoodTable
