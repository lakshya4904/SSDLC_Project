'use client';
import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import Head from 'next/head';

const RegisterPage = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('tempImage', image);
    } else {
      console.error("No image selected");
      return;
    }
    console.log("image: ", formData.get('tempImage'));

    try {
      const res = await fetch(`http://localhost:3000/api/tempApi`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log('result: ', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Head>
        <title>Register Page</title>
      </Head>
      <div className="w-full max-w-sm p-6  border-medium rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Temp File</h1>
        <form onSubmit={handleRegister} className='flex flex-col gap-3'>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Username</label> */}
            <Input
              type="file"
              label="Upload Cover Image"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
              variant='bordered'
              className="max-w-sm"
            />
          </div>
          <div className="mt-4">
            <Button type="submit" color="primary" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

function setError(arg0: string) {
  throw new Error(arg0 || 'Function not implemented.');
}