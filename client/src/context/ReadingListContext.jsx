import { createContext, useContext, useReducer, useEffect } from 'react'

const ReadingListContext = createContext(null)

const initialState = {
  books: JSON.parse(localStorage.getItem('readingList') || '[]'),
}

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      if (state.books.some((book) => book.id === action.payload.id)) {
        return state
      }

      return {
        ...state,
        books: [...state.books, action.payload],
      }

    case 'REMOVE_BOOK':
      return {
        ...state,
        books: state.books.filter(
          (book) => book.id !== action.payload
        ),
      }

    case 'CLEAR_LIST':
      return {
        ...state,
        books: [],
      }

    default:
      return state
  }
}

export function ReadingListProvider({ children }) {
  const [state, dispatch] = useReducer(
    readingListReducer,
    initialState
  )

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(state.books))
  }, [state.books])

  const addBook = (book) => {
    dispatch({ type: 'ADD_BOOK', payload: book })
  }

  const removeBook = (bookId) => {
    dispatch({ type: 'REMOVE_BOOK', payload: bookId })
  }

  const clearList = () => {
    dispatch({ type: 'CLEAR_LIST' })
  }

  return (
    <ReadingListContext.Provider
      value={{
        books: state.books,
        addBook,
        removeBook,
        clearList,
      }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}

export function useReadingList() {
  return useContext(ReadingListContext)
}