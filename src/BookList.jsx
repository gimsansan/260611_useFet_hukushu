import { useFetch } from './hooks/useFetch';
import FetchLayout from './components/FetchLayout';
import BookForm from './BookForm';

function BookList() {
  const { data, loading, error, refetch } = useFetch('http://localhost:3000/books');

  return (
    <div>
      <BookForm onAdded={refetch} />
      <FetchLayout
        loading={loading}
        error={error}
        data={data}
        onRefetch={refetch}
        renderList={(books) => (
          <ul>
            {books.map((b) => <li key={b.id}>{b.title}</li>)}
          </ul>
        )}
      />
    </div>
  );
}

export default BookList;