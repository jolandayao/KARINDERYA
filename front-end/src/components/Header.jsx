import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { assetUrl } from '../data/myDATA'

const pageInfo = {
  '/': {
    title: 'Dashboard',
    subtitle: "Here is what is happening in your karinderya today.",
  },
  '/menu': {
    title: 'Food Menu',
    subtitle: 'Add, edit, and organize food menu.',
  },
  '/orders/new': {
    title: 'New Order',
    subtitle: 'Select items and create a new customer order.',
  },
  '/orders': {
    title: 'Orders',
    subtitle: 'Track, update, and process payments for orders.',
  },
  '/history': {
    title: 'Order History',
    subtitle: 'Review all paid transactions.',
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Manage your restaurant information.',
  },
}

function Header() {
  const location = useLocation()
  const page = pageInfo[location.pathname] || { title: 'FloraEatery', subtitle: '' }

  const [admin, setAdmin] = useState({
    name: 'Flora Admin',
    role: 'Administrator',
    avatar: assetUrl('images/flora tiindahan.png'),
  })

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem('flora-settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setAdmin({
            name: parsed.adminName || 'Flora Admin',
            role: parsed.adminRole || 'Administrator',
            avatar: parsed.adminAvatar?.startsWith('/images/')
              ? assetUrl(parsed.adminAvatar)
              : parsed.adminAvatar || assetUrl('images/flora tiindahan.png'),
          })
        } catch {}
      }
    }

    loadSettings()
    window.addEventListener('settings-updated', loadSettings)
    window.addEventListener('storage', loadSettings)

    return () => {
      window.removeEventListener('settings-updated', loadSettings)
      window.removeEventListener('storage', loadSettings)
    }
  }, [])

  return (
    <header className="flex items-start justify-between gap-3 bg-white border-b border-base-300 px-3 sm:px-4 md:px-8 py-4 sm:py-5">
      <div className="flex items-start gap-3">
       
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-square btn-ghost lg:hidden -ml-2"
          aria-label="Open menu"
        >
          ☰
        </label>

        <div>
          <p className="text-[11px] font-bold tracking-widest text-primary uppercase">
            FloraEatery / {page.title}
          </p>
          <h2 className="text-3xl font-bold mt-1">{page.title}</h2>
          <p className="text-sm text-brand-gray mt-1">{page.subtitle}</p>
        </div>
      </div>

      
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold leading-tight">{admin.name}</p>
          <p className="text-xs text-brand-gray">{admin.role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-yellow-50 border border-primary overflow-hidden flex items-center justify-center text-xs font-bold">
          {admin.avatar ? (
            <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" />
          ) : (
            'FA'
          )}
        </div>
      </div>
    </header>
  )
}

export default Header


