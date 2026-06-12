import { useFetch } from './hooks/useFetch';
import FetchLayout from './components/FetchLayout';
import BookForm from './BookForm';

function BookList() {
  const { data, loading, error, refetch } = useFetch('http://localhost:3000/books');

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
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
                {b.title}
                <button onClick={() => handleDelete(b.id)} style={{ marginLeft: '0.5rem' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}

export default BookList;