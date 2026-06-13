import useFetch from "./hooks/useFetch";
import FetchLayout from "./components/FetchLayout";
import { Book } from "./types.ts";

function BookList() {
  const { data, loading, error, refetch } = useFetch<Book[]>("http://localhost:3000/books");

  return (
    <FetchLayout
      loading={loading}
      error={error}
      data={data}
      refetch={refetch}
      renderList={(books) => (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title} ({book.year})</li>
          ))}
        </ul>
      )}
    />
  );
}

export default BookList;