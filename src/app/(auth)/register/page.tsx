'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import Head from 'next/head';

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Implement your registration logic here, e.g., API call, validation
    if (username && email && password) {
      // Successful registration, redirect to login page or dashboard
      router.push('/login'); // Replace with your desired destination
    } else {
      // Handle registration failure, e.g., display an error message
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-800">
      <Head>
        <title>Register Page</title>
      </Head>
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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