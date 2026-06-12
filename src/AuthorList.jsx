import useFetch from "./hooks/useFetch";

const AUTHORS_URL = "http://localhost:3000/authors";

export default function AuthorList() {
  const { data: authors, loading, error } = useFetch(AUTHORS_URL);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return <p>에러: {error}</p>;

  return (
    <ul>
      {authors.map((author) => (
        <li key={author.id}>{author.name} — {author.nationality}</li>
      ))}
    </ul>
  );
}