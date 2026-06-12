import { useState, useEffect } from "react";

const BOOKS_URL = "http://localhost:3000/books";

export default function BookList() {
  const [books, setBooks] = useState([]);       // 데이터
  const [loading, setLoading] = useState(true); // 진행 중
  const [error, setError] = useState(null);     // 실패

  useEffect(() => {
    let cancelled = false;

    async function fetchBooks() {
      try {
        setLoading(true);
        const res = await fetch(BOOKS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {        // 화면이 아직 살아있을 때만
          setBooks(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBooks();
    return () => { cancelled = true; };  // 화면 떠나면 true
  }, []);

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