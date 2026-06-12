import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

function BookListPaged() {
  const [page, setPage] = useState(1);
  const perPage = 3;

  const { data, loading, error } = useFetch(
    `http://localhost:3000/books?_page=${page}&_per_page=${perPage}`
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data?.data ?? [];
  const totalPages = data?.pages ?? 1;

  return (
    <div>
      <h2>Books (Paged)</h2>
      <ul>
        {books.map((b) => <li key={b.id}>{b.title}</li>)}
      </ul>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page <= 1}>
          Prev
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookListPaged;