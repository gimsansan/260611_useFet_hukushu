import { Routes, Route, NavLink } from 'react-router-dom';
import BookList from './BookList';
import AuthorList from './AuthorList';

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <NavLink to="/books"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Books
        </NavLink>
        <NavLink to="/authors"
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          Authors
        </NavLink>
      </nav>

      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="*" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;