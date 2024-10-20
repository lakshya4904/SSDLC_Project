'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import Head from 'next/head';

const RegisterPage = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.name === 'profileImage') {
        setProfileImage(file);
      }
    }
  };



  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();

    // console.log(formData);

    // Append User fields to FormData

    if (password != confirmPassword) {
      setError('Password does not match');
    } else {
      // Implement your registration logic here, e.g., API call, validation
      if (username && email && password) {

        //console.log(profileImage);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);


        if (profileImage) {
          formData.set('profileImage', profileImage);
        }
        //console.log('profileImage: ', formData.get('profileImage'));


        try {
          const checkUserExists = async (param:string,value:string) => {
            const res = await fetch(`http://localhost:3000/api/users?${param}=${value}`);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data.result;
          };
          
          let userExists = await checkUserExists('username',username);
          if (userExists) {
            setError('Username already exists');
            return;
          }

          userExists = await checkUserExists('email',email);
          if (userExists) {
            setError('Email already exists');
            return;
          }

          const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            body: formData
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const result = await res.json();

          console.log('Registration successful:', result);
          router.push('/login'); // Replace with your desired destination
        } catch (error) {
          console.error('Error during registration:', error);
          setError('Registration failed. Please try again.');
        }
      } else {
        // Handle registration failure, e.g., display an error message
        setError('Please fill in all fields');
      }

    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Head>
        <title>Register Page</title>
      </Head>
      <div className="w-full max-w-sm p-6  border-medium rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister} className='flex flex-col gap-3'>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Username</label> */}
            <Input
              type="file"
              name="profileImage"
              label="Upload Cover Image"
              onChange={handleProfileImage}
              variant='bordered'
              className="max-w-sm"
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Username</label> */}
            <Input
              type="text"
              name='username'
              placeholder="Enter your username"
              value={username || ''}
              onChange={(e) => { setUsername(e.target.value) }}
              className=""
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Email</label> */}
            <Input
              type="email"
              name='email'
              placeholder="Enter your email"
              value={email || ''}
              onChange={(e) => { setEmail(e.target.value) }}
              className=""
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Password</label> */}
            <Input
              type="password"
              name='password'
              placeholder="Password"
              value={password || ''}
              onChange={(e) => { setPassword(e.target.value) }}
              className=""
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700 font-bold mb-2">Password</label> */}
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword || ''}
              onChange={(e) => { setConfirmPassword(e.target.value) }}
              className=""
            />
          </div>
          <div className="mt-4">
            <Button type="submit" color="primary" className="w-full">
              Register
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

function setError(arg0: string) {
  throw new Error(arg0 || 'Function not implemented.');
}