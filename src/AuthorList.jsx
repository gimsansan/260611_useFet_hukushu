import useFetch from "./hooks/useFetch";

const AUTHORS_URL = "http://localhost:3000/authors";

export default function AuthorList() {
  const { data: authors, loading, error, refetch } = useFetch(AUTHORS_URL);

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
        {authors.map((a) => (
          <li key={a.id}>{a.name} — {a.nationality}</li>
        ))}
      </ul>
    </div>
  );
}