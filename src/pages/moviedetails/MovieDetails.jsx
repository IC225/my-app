import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useTMDB } from '../../contexts/TmdbContext'
import { Link } from 'react-router'
import './MovieDetails.css'
import tmdb from '../../utils/tmdb'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useTMDB()
  const [movie, setMovie] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`)
        setMovie(response.data)
      } catch {
        navigate('/404')
      }
    }

    const fetchSimilar = async () => {
  try {
    const response = await tmdb.get(`/movie/${id}/similar`)
    setSimilarMovies(response.data.results)
  } catch {
    // silencieux
  }
}

    const fetchReviews = async () => {
  try {
    const response = await tmdb.get(`/movie/${id}/reviews`)
    setReviews(response.data.results)
  } catch {
    // silencieux
  }
}

    fetchMovie()
    fetchSimilar()
    fetchReviews()
  }, [id])

  if (!movie) return <p style={{ color: 'white', padding: '40px' }}>Chargement...</p>

  const isFav = favorites.some(f => f.id === movie.id)

  return (
    <div className="movie-details">
      <div className="details-hero">
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
          className="details-poster"
        />
        <div className="details-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
          <p><strong>Langue d'origine :</strong> {movie.original_language.toUpperCase()}</p>
          <p><strong>Date de sortie :</strong> {movie.release_date}</p>
          <p><strong>Note :</strong> ⭐ {movie.vote_average.toFixed(1)}/10</p>
          <p className="overview">{movie.overview}</p>
          <button
            onClick={() => toggleFavorite(movie)}
            className={isFav ? 'fav-btn active' : 'fav-btn'}
          >
            {isFav ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'}
          </button>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="similar-section">
          <h2>Films similaires</h2>
          <div className="similar-grid">
            {similarMovies.slice(0, 6).map((film) => (
              <Link to={`/movie/${film.id}`} key={film.id} className="similar-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                  alt={film.title}
                />
                <p>{film.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Avis</h2>
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <strong>{review.author}</strong>
                {review.author_details.rating && (
                  <span>⭐ {review.author_details.rating}/10</span>
                )}
              </div>
              <p>{review.content.slice(0, 300)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieDetails