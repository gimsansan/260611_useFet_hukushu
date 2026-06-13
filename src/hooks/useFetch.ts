import { useState, useEffect, useCallback, useRef } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const doFetch = useCallback(async () => {
    cancelledRef.current = false;
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: T = await res.json();
      if (!cancelledRef.current) { setData(json); setError(null); }
    } catch (err) {
      if (!cancelledRef.current) setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    doFetch();
    return () => { cancelledRef.current = true; };
  }, [doFetch]);

  useEffect(() => {
    const onFocus = () => doFetch();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [doFetch]);

  return { data, loading, error, refetch: doFetch };
}