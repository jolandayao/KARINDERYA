import { Link } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'

function OrderHistory() {
  const { paidTransactions } = useRestaurant()

  const paidOrders = [...paidTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const sales = paidOrders.reduce((sum, order) => sum + Number(order.total || 0), 0)

  return (
    <section className="card bg-white border border-base-300 shadow-sm">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div><h3 className="card-title">Paid transactions</h3><p className="text-sm text-brand-gray">Review payments recorded for your orders.</p></div>
          <div className="text-right"><p className="text-xs text-brand-gray">Total sales</p><p className="text-xl font-bold">₱{sales.toFixed(2)}</p></div>
        </div>
        {paidOrders.length === 0 ? (
          <div className="py-10 text-center text-brand-gray">No paid transactions yet. <Link className="link link-primary" to="/orders">View current orders</Link>.</div>
        ) : (
          <div className="overflow-x-auto mt-4"><table className="table table-sm">
            <thead><tr className="bg-base-200 text-xs uppercase"><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Cash</th><th>Change</th></tr></thead>
            <tbody>{paidOrders.map((order) => <tr key={order.id}>
              <td className="font-semibold">#{order.id}</td><td>{order.customerName}</td>
              <td>{order.date ? new Date(order.date).toLocaleString() : '—'}</td>
              <td>{(order.items || []).map((item) => `${item.name} × ${item.quantity}`).join(', ')}</td>
              <td>₱{Number(order.total).toFixed(2)}</td><td>₱{Number(order.cashReceived || 0).toFixed(2)}</td><td>₱{Number(order.change || 0).toFixed(2)}</td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
    </section>
  )
}

export default OrderHistory
