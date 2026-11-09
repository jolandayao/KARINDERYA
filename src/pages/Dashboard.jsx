import { useRestaurant } from '../context/RestaurantContext'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'

function Dashboard() {
  const { orders } = useRestaurant()

  // ---------- STATISTICS ----------
  const paidOrders = orders.filter((order) => order.paymentStatus === 'Paid')
  let totalSales = 0
  for (const order of paidOrders) {
    totalSales = totalSales + order.total
  }

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length
  const completedOrders = orders.filter((order) => order.status === 'Completed').length

  // ---------- RECENT ORDERS ----------
  // Pinakabago muna, 5 lang. Kinopya muna ang array bago i-sort.
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  const getItemsText = (order) => {
    if (order.items.length === 1) {
      return '1 item'
    }
    return order.items.length + ' items'
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Sales" value={'₱' + totalSales.toFixed(2)} note="From paid orders" />
        <StatCard title="Total Orders" value={totalOrders} note="All orders" />
        <StatCard title="Pending Orders" value={pendingOrders} note="Needs attention" />
        <StatCard title="Completed Orders" value={completedOrders} note="Food is done" />
      </div>

      <div className="card bg-white border border-base-300">
        <div className="p-4">
          <h3 className="font-bold text-lg">Recent orders</h3>
          <p className="text-xs text-brand-gray">The latest orders placed.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="bg-base-200 text-xs uppercase">
                <th className="px-4">Order</th>
                <th>Customer</th>
                <th className="hidden sm:table-cell">Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 font-semibold">#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td className="hidden sm:table-cell">{getItemsText(order)}</td>
                  <td>₱{order.total.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentOrders.length === 0 && (
            <p className="text-center py-10 text-brand-gray">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
