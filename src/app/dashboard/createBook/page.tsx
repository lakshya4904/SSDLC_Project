"use client";
import React, { useState } from 'react';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import styles from './createBook.module.css';
import { json } from 'stream/consumers';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublishers] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [publishedDate, setPublishedDate] = useState<string>();
  const [isbn, setIsbn] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.name === 'file') {
        setFile(file);
      } else if (e.target.name === 'coverImage') {
        setCoverImage(file);
      }
    }
  };

  const addBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');


    const formData = new FormData();

    // Append book fields to FormData
    formData.append('title', title)
    formData.append('author', author)
    formData.append('publisher', publisher)
    formData.append('publishedDate', publishedDate ? publishedDate : '')
    formData.append('series', series)
    formData.append('isbn', isbn)
    formData.append('summary', summary)
    formData.append('rating', rating)


    // console.log(file);
    // console.log(coverImage);

    if (coverImage) {
      formData.append('coverImage', coverImage);
      // console.log(formData.get('coverImage'));
    }

    if (file) {
      formData.append('file', file);
      // console.log(formData.get('file'));
    }

    try {

      const res = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(`Book Upload Unsuccessful: ${result.result}`);
      }

      console.log('Book Upload successful:', result);
      //router.push('/dashboard'); // Replace with your desired destination
    } catch (error) {
      console.error('Error during Book Upload :', error);
      setError('Book Upload failed. Please try again.');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className=" p-4">
      <p className="text-center text-xl font-bold mb-4">Create New Book</p>

      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={addBook} className="md:m-5 flex flex-col justify-center gap-3" title='Create New Book'>
        <div className={styles.wrapperGrid}>
          <Input
            label="Book Title"
            value={title || ''}
            onChange={(e) => { setTitle(e.target.value) }}
            required
            variant='bordered'
            className=" "
          />
          <Input
            label="Author"
            value={author || ''}
            onChange={(e) => { setAuthor(e.target.value) }}
            variant='bordered'
            className=" "
          />
          <Input
            label="Publisher"
            value={publisher || ''}
            onChange={(e) => { setPublishers(e.target.value) }}
            variant='bordered'
            className=" "
          />
          <Input
            label="Series"
            value={series || ''}
            onChange={(e) => { setSeries(e.target.value) }}
            variant='bordered'
            className=" "
          />
          <Input
            type="date"
            label="Published Date"
            value={publishedDate ? publishedDate : ''}
            onChange={(e) => { setPublishedDate(e.target.value) }}
            variant='bordered'
            className=" "
          />
          <Input
            label="ISBN"
            value={isbn || ''}
            onChange={(e) => { setIsbn(e.target.value) }}
            variant='bordered'
            className=" "
          />
          <Input
            type="file"
            name="coverImage"
            label="Cover Image"
            onChange={handleFileChange}
            variant='bordered'
            className=" "
          />
          <Input
            type="file"
            name="file"
            label="File"
            onChange={handleFileChange}
            variant='bordered'
            className=" "
          />
          <Input
            type='dropdown'
            name="genre"
            label="Genre"
            value={genre || ''}
            readOnly
            variant='bordered'
            className=" "
          />
          <Select
            label="Favorite Animal"
            placeholder="Select an animal"
            selectionMode="multiple"
            className="w-full"
            variant='bordered'
          >
            <SelectItem key="dog">Dog</SelectItem>
            <SelectItem key="cat">Cat</SelectItem>
            <SelectItem key="hamster">Hamster</SelectItem>
          </Select>
          <Input
            label="Rating"
            value={rating || ''}
            onChange={(e) => { setRating(e.target.value) }}
            variant='bordered'
            className=" "
          />
        </div>
        <Textarea
          label="Summary"
          value={summary || ''}
          onChange={(e) => { setSummary(e.target.value) }}
          variant='bordered'
          className=""
        />

        <div className='flex justify-center'>
          <Button type='submit' disabled={isSubmitting} color='primary' size='lg'>Add Book</Button>
        </div>
      </form>

    </section>
  );
};

export default Page;