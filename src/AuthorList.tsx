import FetchLayout from "./components/FetchLayout";
import useFetch from "./hooks/useFetch";
import { Author } from "./types";

const AUTHORS_URL = "http://localhost:3000/authors";

export default function AuthorList() {
  const { data, loading, error, refetch } = useFetch<Author[]>(AUTHORS_URL);

  return (
    <div>
      <h2>저자 목록</h2>
      <FetchLayout
        loading={loading}
        error={error}
        data={data}
        refetch={refetch}
        renderList={(authors) => (
          <ul>
            {authors.map((author) => (
              <li key={author.id}>{author.name} - {author.nationality}</li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}