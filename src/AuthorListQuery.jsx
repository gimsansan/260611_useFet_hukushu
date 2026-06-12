import { useQuery } from '@tanstack/react-query';

function AuthorListQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['authors'],
    queryFn: () => fetch('http://localhost:3000/authors').then(res => res.json()),
    staleTime: 30 * 1000, // 30초간 캐시 유지
  });

  if (isLoading) return <p>Loading authors (TanStack Query)…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors (TanStack Query — 30s cache)</h2>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {data.map(a => <li key={a.id}>{a.name}</li>)}
      </ul>
    </div>
  );
}

export default AuthorListQuery;