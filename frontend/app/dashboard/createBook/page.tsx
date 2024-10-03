'use client';
import { useState } from 'react';
import { Input, Button, Textarea, Card } from "@nextui-org/react";
import styles from "./createBook.module.css";

const createBookPage = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    authorId: '',
    publisherId: '',
    categoryId: '',
    seriesId: '',
    publicationDate: '',
    isbn: '',
    summary: '',
    coverImageUrl: '',
    fileUrl: '',
    fileSize: '',
    format: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle form change
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setNewBook({
  //     ...newBook,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Handle form submission
  const handleAddBook = () => {

    console.log(newBook);
    //e.preventDefault();
    // setIsSubmitting(true);
    // setError('');

    // try {
    //   const res = await fetch('/api/books', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newBook),
    //   });

    //   const data = await res.json();
    //   if (!data.success) {
    //     throw new Error(data.message || 'Failed to create book');
    //   }

    //   alert('Book created successfully');
    //   setNewBook({
    //     title: '',
    //     authorId: '',
    //     publisherId: '',
    //     categoryId: '',
    //     seriesId: '',
    //     publicationDate: '',
    //     isbn: '',
    //     summary: '',
    //     coverImageUrl: '',
    //     fileUrl: '',
    //     fileSize: '',
    //     format: ''
    //   });
    // } catch (err: any) {
    //   setError(err.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <section className="">


        <p className="text-center text-xl font-bold mb-4">Create New Book</p>
        {error && <p className="text-red-500">{error}</p>}
      <div className={styles.wrapperGrid}>
        <Input
          name="title"
          label="Book Title"
          //placeholder="Book title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
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
          onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
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
          onChange={(e) => setNewBook({ ...newBook, coverImageUrl: e.target.value })}
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
            onClick={(handleAddBook)}
          >
            {isSubmitting ? 'Creating...' : 'Create Book'}
          </Button>
        </div>

      </div>
    </section>

  );
};


export default createBookPage;