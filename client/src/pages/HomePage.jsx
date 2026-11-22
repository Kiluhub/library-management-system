
import { useEffect, useState } from 'react'
import axios from 'axios'
import BookGrid from '../components/BookGrid'
import SearchBar from '../components/SearchBar'

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`
        )
        setGenres(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error('Failed to load genres:', error)
      }
    }

    fetchGenres()
  }, [])

  return (
    <main>
      <h1>Library Management System</h1>
      <h2>Explore Our Books</h2>

      <SearchBar onSearch={setSearch} />

      <select
        value={genreId}
        onChange={(e) => setGenreId(e.target.value)}
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <BookGrid search={search} genreId={genreId} />
    </main>
  )
}

export default HomePage
