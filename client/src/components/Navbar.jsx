import { Link, useNavigate } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function Navbar() {
  const { books } = useReadingList()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Library System
      </Link>

      <div className="nav-links">
        <Link to="/">Books</Link>

        <Link to="/reading-list">
          Reading List ({books.length})
        </Link>

        <Link to="/space-booking">
          Book Space
        </Link>

        {localStorage.getItem('token') ? (
          <button onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar