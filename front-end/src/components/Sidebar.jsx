import { NavLink } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'


const links = [
  { path: '/', label: 'Dashboard' },
  { path: '/menu', label: 'Food Menu' },
  { path: '/orders/new', label: 'New Order' },
  { path: '/orders', label: 'Orders' },
  { path: '/history', label: 'Order History' },
  { path: '/settings', label: 'Settings' },
]

function Sidebar() {
  const { settings } = useRestaurant()
  const isOpen = settings.isOpen !== false

  // Closes the sidebar on small screens after clicking a link
  const closeSidebar = () => {
    const toggle = document.getElementById('sidebar-drawer')
    if (toggle) toggle.checked = false
  }

  return (
    <aside className="w-64 min-h-full flex flex-col bg-neutral text-neutral-content px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary overflow-hidden flex items-center justify-center text-xl font-bold">
          <img src="/images/flora tiindahan.png" alt="FloraEatery Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">FloraEatery</h1>
          <p className="text-[10px] font-semibold tracking-widest text-gray-400">
            KARINDERYA SYSTEM
          </p>
        </div>
      </div>

      {/* Section label */}
      <p className="px-2 mb-3 text-[11px] font-semibold tracking-widest text-gray-500">
        WORKSPACE
      </p>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ' +
              (isActive
                ? 'bg-primary text-primary-content font-semibold'
                : 'text-gray-300 hover:bg-gray-800')
            }
          >
            {({ isActive }) => (
              <>
                {/* Filled dot when active, hollow dot when not */}
                <span
                  className={
                    'w-2 h-2 rounded-full border ' +
                    (isActive
                      ? 'bg-primary-content border-primary-content'
                      : 'border-gray-400')
                  }
                ></span>
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer (stays at the bottom) */}
      <div className="mt-auto pt-4 border-t border-gray-800 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center text-xs font-bold">
          FE
        </div>
        <div>
          <p className="text-xs font-bold">FloraEatery</p>
          <p className={`text-[11px] font-medium ${isOpen ? 'text-success' : 'text-error'}`}>
            {isOpen ? '● Open for orders' : '● Closed'}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
