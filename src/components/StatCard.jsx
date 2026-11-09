function StatCard({ title, value, note }) {
  return (
    <div className="card bg-white border border-base-300">
      <div className="card-body p-4 gap-1">
        <p className="text-xs font-semibold text-brand-gray">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-brand-gray">{note}</p>
      </div>
    </div>
  )
}

export default StatCard
