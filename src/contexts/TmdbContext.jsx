import { createContext, useContext, useState, useEffect } from "react";

export const TmdbContext = createContext();
export const useTMDB = () => useContext(TmdbContext);

export const TmdbProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const value = {
    movies,
    setMovies,
    page,
    setPage,
    favorites,
    toggleFavorite,
    genres,
    setGenres,
  };

  return <TmdbContext.Provider value={value}>{children}</TmdbContext.Provider>;
};