
import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from './BookCard'

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError('')

        const params = {}

        if (search) params.search = search
        if (genreId) params.genreId = genreId

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books`,
          { params }
        )

        console.log('Books API response:', response.data)

        const booksData = response.data.data

        setBooks(Array.isArray(booksData) ? booksData : [])

      } catch (err) {
        setError('Unable to load books. Please try again.')
        console.error('Error fetching books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [search, genreId])

  if (loading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (books.length === 0) {
    return <p>No books found.</p>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookGrid
