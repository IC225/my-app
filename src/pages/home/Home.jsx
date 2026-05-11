import { useEffect, useState } from 'react'
import './Home.css'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=fr-FR&page=${page}`
      )
      const data = await response.json()
      setMovies(data.results)
      setTotalPages(data.total_pages)
    }
    fetchMovies()
  }, [page])

  return (
    <div className="home">
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ← Précédent
        </button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Suivant →
        </button>
      </div>
    </div>
  )
}

export default Home