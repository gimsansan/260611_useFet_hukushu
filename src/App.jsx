import BookList from "./BookList";
import AuthorList from "./AuthorList";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>책 목록 (4단계 — 재사용)</h1>
      <BookList />

      <h1>저자 목록</h1>
      <AuthorList />
    </div>
  );
}