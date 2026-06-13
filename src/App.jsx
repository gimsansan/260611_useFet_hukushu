import { Routes, Route, NavLink } from 'react-router-dom';
import BookList from './BookList';
import AuthorList from './AuthorList';
import AuthorListQuery from './AuthorListQuery';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <NavLink to="/books"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Books (useFetch)
        </NavLink>
        <NavLink to="/authors"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Authors (useFetch)
        </NavLink>
        <NavLink to="/authors-query"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Authors (TanStack)
        </NavLink>
      </nav>

      <ErrorBoundary>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors-query" element={<AuthorListQuery />} />
          <Route path="*" element={<BookList />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;