import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './pages/home/Home'
import Favorites from './pages/favorites/Favorites'
import MovieDetails from './pages/movieDetails/MovieDetails'
import NotFound from './pages/notFound/NotFound'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}

export default App