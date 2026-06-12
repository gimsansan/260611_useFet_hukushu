import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import FetchLayout from './components/FetchLayout';
import BookForm from './BookForm';

function BookList() {
  const { data, loading, error, refetch } = useFetch('http://localhost:3000/books');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditingId(null);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <BookForm onAdded={refetch} />
      <FetchLayout
        loading={loading}
        error={error}
        data={data}
        onRefetch={refetch}
        renderList={(books) => (
          <ul>
            {books.map((b) => (
              <li key={b.id}>
                {editingId === b.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(b.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {b.title}
                    <button onClick={() => startEdit(b)} style={{ marginLeft: '0.5rem' }}>Edit</button>
                    <button onClick={() => handleDelete(b.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}

export default BookList;