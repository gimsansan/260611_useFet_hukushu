import useFetch from "./hooks/useFetch";

const BOOKS_URL = "http://localhost:3000/books";

export default function BookList() {
  const { data: books, loading, error } = useFetch(BOOKS_URL);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return <p>에러: {error}</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title} ({book.year})</li>
      ))}
    </ul>
  );
}