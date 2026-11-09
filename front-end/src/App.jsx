import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import FoodMenu from './pages/FoodMenu'
import NewOrder from './pages/NewOrder'
import Orders from './pages/Orders'
import OrderHistory from './pages/OrderHistory'
import Settings from './pages/Settings'
import Footer from './components/Footer'

function App() {
  return (
    
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

     
      <div className="drawer-content flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<FoodMenu />} />
            <Route path="/orders/new" element={<NewOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>

     
      <div className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
