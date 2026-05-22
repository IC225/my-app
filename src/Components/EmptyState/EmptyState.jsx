import './EmptyState.css'

const EmptyState = () => {
  return (
    <div className="empty-state">
      <p>😕</p>
      <h2>Aucun film trouvé</h2>
      <p>Essaie avec d'autres filtres !</p>
    </div>
  )
}

export default EmptyState