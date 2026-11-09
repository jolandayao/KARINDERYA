import { Link } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'

// link  sa daisy ui    bahhaah: https://daisyui.com/components/footer/
function Footer() {
  const { settings } = useRestaurant()

  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content px-6 py-6 md:px-10 border-t border-gray-800">
    
      <nav>
        <h6 className="footer-title">Pages</h6>
        <Link to="/menu" className="link link-hover">Food Menu</Link>
        <Link to="/orders/new" className="link link-hover">New Order</Link>
        <Link to="/orders" className="link link-hover">Orders</Link>
        <Link to="/history" className="link link-hover">Order History</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Contact</h6>
        <p>{settings.restaurantName} Karinderya</p>
        <p>{settings.address}</p>
        <p>{settings.contactNumber}</p>
      </nav>

      <nav>
        <h6 className="footer-title">About</h6>
        <p>Karinderya Ordering System</p>
        <p>© 2026 {settings.restaurantName}</p>
      </nav>
    </footer>
  )
}

export default Footer