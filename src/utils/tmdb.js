import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "fr-FR",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const httpStatus = error.response?.status;
    const tmdbCode = error.response?.data?.status_code;

    if (httpStatus === 400 && tmdbCode === 22) {
      toast.error("Page invalide !");
    } else if (httpStatus === 400) {
      toast.error("Paramètre invalide.");
    } else if (httpStatus === 401 && tmdbCode === 7) {
      toast.error("Clef API manquante ou invalide.");
    } else if (httpStatus === 401) {
      toast.error("Problème d'authentification.");
    } else if (httpStatus === 404) {
      toast.error("Cette ressource n'existe pas ou plus.");
    } else if (httpStatus === 429) {
      toast.error("Trop de requêtes, ralentis !");
    } else {
      toast.error("Une erreur est survenue, réessaie plus tard.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;