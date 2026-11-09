import { Link } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'

function Dashboard() {
  const { foods, orders, settings } = useRestaurant()

  const sales = orders
    .filter((order) => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + Number(order.total || 0), 0)
  const pendingOrders = orders.filter((order) => ['Completed', 'Cancelled'].includes(order.status)).length

  return (
    <div className="space-y-6">
      <section className="card bg-neutral text-neutral-content shadow-md">
        <div className="card-body flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className={`badge mb-2 ${settings.isOpen === false ? 'badge-error' : 'badge-success'}`}>{settings.isOpen === false ? 'Store Closed' : 'Open for Orders'}</span>
            <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {settings.adminName || 'Flora Admin'}! 🍲</h2>
            <p className="text-sm text-gray-300 mt-1">A summary of {settings.restaurantName || 'FloraEatery'} operations.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/orders/new" className="btn btn-primary text-neutral font-bold">+ New Order</Link>
            <Link to="/menu" className="btn btn-outline text-white border-white hover:bg-white hover:text-black">Manage Menu</Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Sales" value={`₱${sales.toFixed(2)}`} link="/history" label="View history →" />
        <Stat title="Total Menu Items" value={foods.length} link="/menu" label="View menu →" />
        <Stat title="Total Orders" value={orders.length} link="/orders" label="View orders →" />
        <Stat title="Open Orders" value={pendingOrders} link="/orders" label="Manage orders →" />
      </div>

      <section className="card bg-white border border-base-300 shadow-sm">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title">Recent orders</h3>
          {orders.length === 0 ? <p className="py-6 text-brand-gray">No orders yet. <Link className="link link-primary" to="/orders/new">Create your first order</Link>.</p> : (
            <div className="overflow-x-auto"><table className="table table-sm">
              <thead><tr className="bg-base-200 text-xs uppercase"><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Payment</th></tr></thead>
              <tbody>{[...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((order) => <tr key={order.id}>
                <td className="font-semibold">#{order.id}</td><td>{order.customerName}</td><td>₱{Number(order.total).toFixed(2)}</td>
                <td><span className="badge badge-outline">{order.status}</span></td><td>{order.paymentStatus || 'Unpaid'}</td>
              </tr>)}</tbody>
            </table></div>
          )}
        </div>
      </section>
    </div>
  )
}

function Stat({ title, value, link, label }) {
  return <div className="card bg-white border border-base-300 shadow-sm p-5">
    <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">{title}</p>
    <div className="flex items-baseline justify-between gap-2 mt-2"><h3 className="text-2xl font-bold">{value}</h3><Link to={link} className="text-xs text-primary font-semibold hover:underline">{label}</Link></div>
  </div>
}

export default Dashboard
