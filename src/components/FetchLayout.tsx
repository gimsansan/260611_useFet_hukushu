import { ReactNode } from "react";

interface FetchLayoutProps<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  refetch: () => void;
  renderList: (data: T) => ReactNode;
}

function FetchLayout<T>({ loading, error, data, refetch, renderList }: FetchLayoutProps<T>) {
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>에러: {error}</p>;
  if (!data) return null;

  return (
    <div>
      <button onClick={refetch}>🔄 새로고침</button>
      {renderList(data)}
    </div>
  );
}

export default FetchLayout;