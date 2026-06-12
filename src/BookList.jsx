import useFetch from "./hooks/useFetch";

const BOOKS_URL = "http://localhost:3000/books";

export default function BookList() {
  const { data: books, loading, error, refetch } = useFetch(BOOKS_URL);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return (
    <div>
      <p>에러: {error}</p>
      <button onClick={refetch}>다시 시도</button>
    </div>
  );

  return (
    <div>
      <button onClick={refetch}>새로고침</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} ({book.year})</li>
        ))}
      </ul>
    </div>
  );
}