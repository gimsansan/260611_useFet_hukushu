const { data, setData, loading, error, refetch } = useFetch('http://localhost:3000/books');

const handleDelete = async (id) => {
  const prev = data;               // 롤백용 백업
  setData(data.filter(b => b.id !== id));  // 즉시 UI 반영

  try {
    const res = await fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
  } catch (err) {
    setData(prev);                  // 실패 시 롤백
    alert(err.message);
  }
};