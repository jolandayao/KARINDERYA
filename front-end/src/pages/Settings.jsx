import { useState } from 'react'
import { useRestaurant } from '../context/RestaurantContext'

function Settings() {
  const { settings, setSettings, resetData } = useRestaurant()
  const [savedMessage, setSavedMessage] = useState(false)
  const [error, setError] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    if (!settings.restaurantName.trim()) {
      setError('Enter a karinderya name before saving.')
      return
    }
    setSettings({ ...settings, restaurantName: settings.restaurantName.trim() })
    setError('')
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all food items, orders, and settings to default?')) {
      resetData()
      setSavedMessage(false)
      setError('')
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {savedMessage && (
        <div role="status" className="alert alert-success shadow-sm">
          <span>Settings saved successfully!</span>
        </div>
      )}
      {error && <div role="alert" className="alert alert-error shadow-sm">{error}</div>}

      <div className="card bg-white border border-base-300 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg font-bold mb-4">Karinderya Information</h3>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Karinderya Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.restaurantName}
                  onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Tagline / Subtitle</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Contact Number</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.contactNumber}
                  onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="divider pt-2">Admin Profile</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Admin Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.adminName || 'Flora Admin'}
                  onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Admin Role</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.adminRole || 'Administrator'}
                  onChange={(e) => setSettings({ ...settings, adminRole: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-base-200">
              <div>
                <p className="font-medium">Store Status</p>
                <p className="text-xs text-brand-gray">Toggle whether the karinderya is open for orders</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.isOpen}
                onChange={(e) => setSettings({ ...settings, isOpen: e.target.checked })}
              />
            </div>

            <div className="card-actions justify-end pt-4">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card bg-white border border-base-300 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg font-bold text-error mb-2">DELIKADO</h3>
          <p className="text-sm text-brand-gray mb-4">
            Resetting data will restore the default sample food items and orders. This action cannot be undone.
          </p>
          <div>
            <button type="button" className="btn btn-outline btn-error" onClick={handleResetData}>
              Reset All Data to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
