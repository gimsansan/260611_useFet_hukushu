import useFetch from "../hooks/useFetch";

export default function FetchLayout({ title, url, renderList }) {
  const { data, loading, error, refetch } = useFetch(url);

  if (loading && !data) return <p>로딩 중...</p>;
  if (error && !data) return (
    <div>
      <p>에러: {error}</p>
      <button onClick={refetch}>다시 시도</button>
    </div>
  );

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={refetch} disabled={loading}>
        {loading ? "불러오는 중..." : "새로고침"}
      </button>
      {renderList({ data, loading, refetch })}
    </div>
  );
}