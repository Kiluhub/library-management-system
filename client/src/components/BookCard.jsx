import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function BookCard({ book }) {
  const { books, addBook, removeBook } = useReadingList()

  const isAdded = books.some(
    (item) => item.id === book.id
  )

  return (
    <div className="book-card">
      <h3>{book.title}</h3>

      <p>Author: {book.author}</p>

      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>

      <p>Available copies: {book.totalCopies}</p>

      <Link to={`/books/${book.id}`}>
        View Details
      </Link>

      <button
        onClick={() =>
          isAdded
            ? removeBook(book.id)
            : addBook(book)
        }
      >
        {isAdded ? 'Remove from Reading List' : 'Add to Reading List'}
      </button>
    </div>
  )
}

export default BookCard