export interface Book {
  id: string;
  title: string;
  authorId: string; // Can be replaced by an Author object if needed
  publisherId: string; // Can be replaced by a Publisher object if needed
  genreId: string; // Can be replaced by a Category object if needed
  seriesId?: string; // Optional, since not all books may belong to a series
  publicationDate?: number;
  isbn: string;
  summary?: string;
  coverImageUrl: string;
  fileUrl?: string;
  fileSize?: number;
  format?: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}