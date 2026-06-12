import { useState } from 'react';

function BookForm({ onAdded }) {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('1');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, authorId }),
      });
      if (!res.ok) throw new Error('Failed to add');
      setTitle('');
      onAdded();  // 부모에게 refetch 요청
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="책 제목"
        disabled={submitting}
      />
      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        <option value="1">Author 1</option>
        <option value="2">Author 2</option>
        <option value="3">Author 3</option>
      </select>
      <button disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Book'}
      </button>
    </form>
  );
}

export default BookForm;