import { useState, useEffect } from "react";

const BOOKS_URL = "http://localhost:3000/books";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function LeakDemo() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ❌ cancelled 체크 없음 — 일부러 빠뜨린 것
    async function fetchBooks() {
      try {
        setLoading(true);
        await delay(2000); // 2초 지연 → 이 사이에 언마운트 유도
        const res = await fetch(BOOKS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("❌ LeakDemo: setBooks 호출 (언마운트 여부 무관)");
        setBooks(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    return () => {
      console.log("🚪 LeakDemo 언마운트됨");
    };
  }, []);

  if (loading) return <p>⏳ 로딩 중... (2초 지연 — 지금 숨겨봐!)</p>;
  if (error)   return <p>에러: {error}</p>;

  return (
    <ul>
      {books.map((b) => <li key={b.id}>{b.title}</li>)}
    </ul>
  );
}