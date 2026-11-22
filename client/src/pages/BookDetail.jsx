
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function BookDetail() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`
        )
        setBook(response.data)
      } catch (err) {
        setError('Unable to load book details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <p>Loading book details...</p>

  if (error) return <p>{error}</p>

  if (!book) return <p>Book not found.</p>

  return (
    <main>
      <h1>{book.title}</h1>

      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn || 'Not provided'}</p>
      <p><strong>Genre:</strong> {book.genre?.name || 'Uncategorized'}</p>
      <p><strong>Total Copies:</strong> {book.totalCopies}</p>
      <p><strong>Description:</strong> {book.description || 'No description available'}</p>
      <p><strong>Published Year:</strong> {book.publishedYear || 'Not provided'}</p>

      <Link to="/">Back to Catalogue</Link>
    </main>
  )
}

export default BookDetail
