import { Link } from 'react-router'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>MYFLIX</h1>
      </Link>
      <nav>
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/favorites" className="nav-link">❤️ Favoris</Link>
      </nav>
    </header>
  )
}

export default Header