'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import Head from 'next/head';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    // Implement your forgot password logic here, e.g., API call, email sending
    if (email) {
      // Send password reset link or instructions
      alert('Password reset email sent');
      // Redirect to login page or a confirmation page
      router.push('/login');
    } else {
      // Handle forgot password failure, e.g., display an error message
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-800">
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
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
          <div className="mt-4">
            <Button type="submit" color="primary" className="w-full">
              Send Reset Link
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Remembered your password? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;