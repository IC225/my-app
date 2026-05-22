import { useEffect, useState } from 'react'
import { useTMDB } from '../../contexts/TmdbContext'
import './Home.css'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import tmdb from '../../utils/tmdb'
import EmptyState from '../../components/EmptyState/EmptyState'

const Home = () => {
  const { movies, setMovies, page, setPage, favorites, toggleFavorite, genres, setGenres } = useTMDB()
  const [totalPages, setTotalPages] = useState(1)
  const [activeFilters, setActiveFilters] = useState({})

  const { register, handleSubmit } = useForm({
    defaultValues: {
      with_genres: '',
      sort_by: 'popularity.desc',
    }
  })

  useEffect(() => {
    if (genres.length > 0) return
    const fetchGenres = async () => {
      const response = await tmdb.get('/genre/movie/list')
      setGenres(response.data.genres)
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await tmdb.get('/discover/movie', {
        params: {
          ...activeFilters,
          page,
        }
      })
      setMovies(response.data.results)
      setTotalPages(response.data.total_pages)
    }
    fetchMovies()
  }, [page, activeFilters])

  const onSubmit = (filters) => {
    setPage(1)
    setActiveFilters(filters)
  }

  return (
    <div className="home">
      <form onSubmit={handleSubmit(onSubmit)} className="filters-form">
        <select {...register('with_genres')}>
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>

        <select {...register('sort_by')}>
          <option value="popularity.desc">Popularité ↓</option>
          <option value="popularity.asc">Popularité ↑</option>
          <option value="vote_average.desc">Note ↓</option>
          <option value="vote_average.asc">Note ↑</option>
          <option value="release_date.desc">Date de sortie ↓</option>
          <option value="release_date.asc">Date de sortie ↑</option>
        </select>

        <button type="submit">Filtrer</button>
      </form>

      {movies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <div className="movie-info">
                <p>{movie.title}</p>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={favorites.some(f => f.id === movie.id) ? 'fav-btn active' : 'fav-btn'}
                >
                  {favorites.some(f => f.id === movie.id) ? '❤️ Retirer' : '🤍 Favoris'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>← Précédent</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Suivant →</button>
      </div>
    </div>
  )
}

export default Home