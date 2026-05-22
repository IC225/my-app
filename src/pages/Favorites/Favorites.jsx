import { useTMDB } from '../../contexts/TmdbContext'
import './Favorites.css'

const Favorites = () => {
  const { favorites, toggleFavorite } = useTMDB()

  return (
    <div className="home">
      <h2 style={{ color: 'white', padding: '20px 40px' }}>Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p style={{ color: '#aaa', padding: '0 40px' }}>Aucun film en favori.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <p>{movie.title}</p>
                <button onClick={() => toggleFavorite(movie)} className="fav-btn active">
                  ❤️ Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites