import { useState, useEffect, useCallback, useRef } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);           // ① let → useRef

  const doFetch = useCallback(async () => {     // ② effect 밖으로 분리
    cancelledRef.current = false;
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!cancelledRef.current) { setData(json); setError(null); }
    } catch (err) {
      if (!cancelledRef.current) setError(err.message);
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    doFetch();
    return () => { cancelledRef.current = true; };
  }, [doFetch]);

  return { data, loading, error, refetch: doFetch }; // ③ refetch 노출
}