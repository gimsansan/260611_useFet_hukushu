import FetchLayout from "./components/FetchLayout";

const AUTHORS_URL = "http://localhost:3000/authors";

export default function AuthorList() {
  return (
    <FetchLayout
      title="저자 목록"
      url={AUTHORS_URL}
      renderList={({ data }) => (
        <ul>
          {data.map((author) => (
            <li key={author.id}>{author.name} — {author.nationality}</li>
          ))}
        </ul>
      )}
    />
  );
}