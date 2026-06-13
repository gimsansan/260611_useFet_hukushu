import { useQuery } from "@tanstack/react-query";
import { Author } from "./types";

function AuthorListQuery() {
  const { data, isLoading, error, refetch } = useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: () => fetch("http://localhost:3000/authors").then((res) => res.json()),
    staleTime: 30 * 1000,
  });

  if (isLoading) return <p>Loading authors (TanStack Query)...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors (TanStack Query - 30s cache)</h2>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {(data ?? []).map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorListQuery;
