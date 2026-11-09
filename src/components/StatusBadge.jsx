// Kulay ng badge para sa bawat status
const badgeColors = {
  Pending: 'badge-warning',
  Preparing: 'badge-info',
  Ready: 'badge-success',
  Completed: 'badge-neutral',
}

function StatusBadge({ status }) {
  const color = badgeColors[status]

  return <span className={'badge badge-soft ' + color}>{status}</span>
}

export default StatusBadge
