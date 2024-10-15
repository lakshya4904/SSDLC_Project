"use client";
import React, { useState } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import styles from './createBook.module.css';
import { IBook, initializeBook } from '@/lib/models/book';

const Page = () => {
  const [newBook, setNewBook] = useState<IBook>(initializeBook({}));
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (e.target.name === 'file') {
            setBookFile(file);
            setNewBook({
                ...newBook,
                filename: newBook.title || file.name,
                format: file.type,
            });
        } else if (e.target.name === 'coverImage') {
            setCoverImage(file);
        }
    }
  };

  const addBook = async () => {
    setIsSubmitting(true);
    setError('');


    try {
      const formData = new FormData();

      // Append book fields to FormData
      for (const key in newBook) {
        formData.append(key, (newBook as any)[key]);
      }

      if (coverImage) {
        const renamedCoverImage = new File([coverImage], newBook.title || coverImage.name, { type: coverImage.type });
        formData.append('coverImage', renamedCoverImage);
    }

    // Append the main book file with the new name
    if (bookFile) {
        const renamedFile = new File([bookFile], newBook.title || bookFile.name, { type: bookFile.type });
        formData.append('file', renamedFile);
    }

      console.log(newBook);
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      console.log("success" + result.success);
      if (!result.success) {
        setError(result.message || 'Failed to add book');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="">
      <p className="text-center text-xl font-bold mb-4">Create New Book</p>
      <form onSubmit={(e) => { e.preventDefault(); addBook(); }} className="m-5 flex flex-col justify-center gap-3" title='Create New Book'>
        <div className={styles.wrapperGrid}>
          <Input
            name="title"
            label="Book Title"
            value={newBook?.title || ''}
            onChange={handleInputChange}
            required
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="authors"
            label="Authors"
            value={newBook?.author || ''}
            onChange={handleInputChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="publishers"
            label="Publishers"
            value={newBook?.publishers || ''}
            onChange={handleInputChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="series"
            label="Series"
            value={newBook?.series || ''}
            onChange={handleInputChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            type="date"
            name="publishedDate"
            label="Published Date"
            value={newBook?.publishedDate ? newBook.publishedDate.toISOString().split('T')[0] : ''}
            onChange={handleInputChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="isbn"
            label="ISBN"
            value={newBook?.isbn || ''}
            onChange={handleInputChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            type="file"
            name="coverImage"
            label="Upload Cover Image"
            onChange={handleFileChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            type="file"
            name="file"
            label="Upload File"
            onChange={handleFileChange}
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="filename"
            label="Filename"
            value={newBook?.filename || ''}
            readOnly
            variant='bordered'
            className="max-w-sm"
          />
          <Input
            name="format"
            label="Format"
            value={newBook?.format || ''}
            readOnly
            variant='bordered'
            className="max-w-sm"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <Textarea
          name="summary"
          label="Summary"
          value={newBook?.summary || ''}
          onChange={handleInputChange}
          variant='bordered'
          className=""
        />

        <div className='flex justify-center'>
          <Button onClick={addBook} disabled={isSubmitting} color='primary' size='lg'>Add Book</Button>
        </div>
      </form>

    </section>
  );
};

export default Page;