import FetchLayout from "./components/FetchLayout";

const BOOKS_URL = "http://localhost:3000/books";

export default function BookList() {
  return (
    <FetchLayout
      title="책 목록"
      url={BOOKS_URL}
      renderList={({ data }) => (
        <ul>
          {data.map((book) => (
            <li key={book.id}>{book.title} ({book.year})</li>
          ))}
        </ul>
      )}
    />
  );
}