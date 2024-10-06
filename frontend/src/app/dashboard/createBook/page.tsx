'use client';
import { useState } from 'react';
import { Input, Button, Textarea, Card } from "@nextui-org/react";
import styles from "./createBook.module.css";
import { Book, BookProps, initBook } from '@/app/types/book';
// import Book from '@/lib/models/book';

const createBookPage = () => {

  const [newBook, setNewBook] = useState<Book>(initBook);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const addBook = async () => {

    //e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log(newBook);
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();
      console.log("success"+result.success)
      if (result.success) {
        console.log("Book added successfully");
      } else {
        setError(result.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setError("An error occurred while adding the book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="">


        <p className="text-center text-xl font-bold mb-4">Create New Book</p>
        {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className={styles.wrapperGrid}>
        <Input
          name="title"
          label="Book Title"
          //placeholder="Book title"
          value={newBook.title}
          onChange={handleChange}
          isRequired
          variant={"bordered"}
          className={" w-5/12"}
        />
        {/* <Input
          name="authorId"
          label="Author ID"
          placeholder="Author ID"
          value={form.authorId}
          onChange={handleChange}
          fullWidth
          required
        />
        <Input
          name="publisherId"
          label="Publisher ID"
          placeholder="Publisher ID"
          value={form.publisherId}
          onChange={handleChange}
          fullWidth
          required
        />
        <Input
          name="categoryId"
          label="Category ID"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
          fullWidth
          required
        />
        <Input
          name="seriesId"
          label="Series ID"
          placeholder="Series ID (Optional)"
          value={form.seriesId}
          onChange={handleChange}
          fullWidth
        />
        <Input
          name="publicationDate"
          label="Publication Date"
          type="date"
          value={form.publicationDate}
          onChange={handleChange}
          fullWidth
        /> */}
        <Input
          name="isbn"
          label="ISBN"
          value={newBook.isbn}
          onChange={handleChange}
          isRequired
          variant={"bordered"}
          className={"max-w-sm"}
        />
        {/* <Textarea
          name="summary"
          label="Summary"
          placeholder="Book summary"
          value={form.summary}
          onChange={handleChange}
          fullWidth
          required
        /> */}
        <Input
          name="coverImageUrl"
          label="Cover Image URL"
          value={newBook.coverImageUrl}
          onChange={handleChange}
          variant={"bordered"}
          className={"max-w-sm"}
        />
        {/* <Input
          name="fileUrl"
          label="File URL"
          placeholder="File URL"
          value={form.fileUrl}
          onChange={handleChange}
          fullWidth
          required
        />
        <Input
          name="fileSize"
          label="File Size (MB)"
          placeholder="File Size"
          value={form.fileSize}
          onChange={handleChange}
          fullWidth
          required
        />
        <Input
          name="format"
          label="Format (e.g. pdf, epub)"
          placeholder="Format"
          value={form.format}
          onChange={handleChange}
          fullWidth
          required
        /> */}
        <div className={"flex items-center w-full"}>
          <Button
            type="submit"
            color="primary"
            //disabled={isSubmitting}
            onClick={(addBook)}
          >
            {isSubmitting ? 'Creating...' : 'Create Book'}
          </Button>
        </div>

      </div>
    </section>

  );
};


export default createBookPage;