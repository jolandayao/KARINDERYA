import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'

const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled']

function Orders() {
  const { orders, updateOrder } = useRestaurant()
  const [paymentOrder, setPaymentOrder] = useState(null)
  const [cashReceived, setCashReceived] = useState('')
  const [error, setError] = useState('')

  const updateStatus = (orderId, status) => {
    updateOrder(orderId, { status })
  }

  const recordPayment = (event) => {
    event.preventDefault()
    const amount = Number(cashReceived)
    if (!Number.isFinite(amount) || amount < paymentOrder.total) {
      setError(`Cash received must be at least ${paymentOrder.total.toFixed(2)}.`)
      return
    }
    updateOrder(paymentOrder.id, {
      paymentStatus: 'Paid',
      cashReceived: amount,
      change: amount - paymentOrder.total,
    })
    setPaymentOrder(null)
    setCashReceived('')
  }

  return (
    <section className="card bg-white border border-base-300 shadow-sm">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h3 className="card-title">Current orders</h3><p className="text-sm text-brand-gray">Update preparation status and record payments.</p></div>
          <Link to="/orders/new" className="btn btn-primary">+ New Order</Link>
        </div>
        {error && <div role="alert" className="alert alert-error mt-4">{error}</div>}
        {orders.length === 0 ? (
          <div className="py-10 text-center"><p className="text-brand-gray mb-4">No orders yet. Create your first order to get started.</p><Link to="/orders/new" className="btn btn-outline">Create an order</Link></div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="table table-sm">
              <thead><tr className="bg-base-200 text-xs uppercase"><th>Order / Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead>
              <tbody>{orders.map((order) => (
                <tr key={order.id}>
                  <td><span className="font-semibold">#{order.id}</span><br /><span className="text-xs text-brand-gray">{order.customerName}{order.tableNumber ? ` · Table ${order.tableNumber}` : ''}</span></td>
                  <td>{(order.items || []).map((item) => `${item.name} × ${item.quantity}`).join(', ')}</td>
                  <td>₱{Number(order.total).toFixed(2)}</td>
                  <td><select className="select select-bordered select-xs" value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} aria-label={`Status for order ${order.id}`}>{ORDER_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td>
                  <td><span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{order.paymentStatus || 'Unpaid'}</span></td>
                  <td>{order.paymentStatus === 'Paid' ? <span className="text-xs text-brand-gray">Paid · change ₱{Number(order.change || 0).toFixed(2)}</span> : <button className="btn btn-xs btn-outline" onClick={() => { setError(''); setPaymentOrder(order); setCashReceived('') }}>Record payment</button>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>

      {paymentOrder && <div className="modal modal-open modal-bottom sm:modal-middle" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <form className="modal-box" onSubmit={recordPayment}>
          <h3 id="payment-title" className="font-bold text-lg">Record payment</h3>
          <p className="text-sm text-brand-gray mt-1">Order #{paymentOrder.id} · Total ₱{paymentOrder.total.toFixed(2)}</p>
          {error && <div role="alert" className="alert alert-error mt-4">{error}</div>}
          <label className="form-control mt-4"><span className="label-text mb-1">Cash received</span><input type="number" min={paymentOrder.total} step="0.01" required className="input input-bordered" value={cashReceived} onChange={(event) => setCashReceived(event.target.value)} /></label>
          {Number(cashReceived) >= paymentOrder.total && <p className="mt-3 text-sm">Change: <strong>₱{(Number(cashReceived) - paymentOrder.total).toFixed(2)}</strong></p>}
          <div className="modal-action"><button type="button" className="btn btn-ghost" onClick={() => setPaymentOrder(null)}>Cancel</button><button type="submit" className="btn btn-primary">Confirm payment</button></div>
        </form>
        <button className="modal-backdrop" aria-label="Close payment dialog" onClick={() => setPaymentOrder(null)} />
      </div>}
    </section>
  )
}

export default Orders
