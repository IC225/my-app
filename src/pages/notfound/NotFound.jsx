import { Link } from 'react-router'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="home-link">← Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound