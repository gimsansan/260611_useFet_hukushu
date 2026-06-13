export interface Book {
  id: string;
  title: string;
  authorId: string;
  year: number;
}

export interface Author {
  id: string;
  name: string;
  nationality: string;
}
