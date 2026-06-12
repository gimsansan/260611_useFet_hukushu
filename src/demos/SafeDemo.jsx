import { useState, useEffect } from "react";

const BOOKS_URL = "http://localhost:3000/books";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function SafeDemo() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // ✅ 안전장치

    async function fetchBooks() {
      try {
        setLoading(true);
        await delay(2000);
        const res = await fetch(BOOKS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          console.log("✅ SafeDemo: 아직 마운트 상태 → setBooks 호출");
          setBooks(data);
          setError(null);
        } else {
          console.log("🛡️ SafeDemo: 이미 언마운트 → setBooks 건너뜀");
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBooks();
    return () => {
      cancelled = true;
      console.log("🚪 SafeDemo 언마운트됨 — cancelled = true");
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