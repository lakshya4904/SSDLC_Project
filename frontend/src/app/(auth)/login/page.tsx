'use client';
import React, { useState } from 'react';
import { Button, Input, Card, CardBody, Checkbox } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '@/app/context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useUser(); // Using the UserContext

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login authentication
    console.log(`email:${email} pwd: ${password}`);

    const response = await fetch(`http://localhost:3000/api/users/${email}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = await response.json();

    if (email === user.result.email && password == user.result.password) {

      // const mockUser: User = {
      //   id: 1,
      //   username: 'John Doe',
      //   profileImageURL: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      //   email: email,
      //   password: password,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   type: ''
      // };

      // console.log('correct email and password');
      setUser(user); // Save user in global context and localStorage
      router.push('/'); // Redirect to homepage or dashboard after login

    } else {
      // console.log('Invalid email or password');
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="md:w-2/6 border-small rounded-lg p-4 flex flex-col gap-4">

        <h2 className='m-4 justify-center flex '>Login</h2>
        <Input label="Email"
          variant="bordered"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          size='sm'
          className=''
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button className="my-auto focus:outline-none items-center" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          size='sm'
          className=''
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-between">
            <Checkbox type="checkbox">
              <span className="">Remember me</span>
            </Checkbox>
          <Link href={"/forgot-password"} className='underline hover:text-blue-500 duration-300'>Forgot Password?</Link>
        </div>
        <Button className="primary_button" type="submit" onClick={handleLogin}>Login</Button>

        <div className="flex justify-center">
          <span>Don't have an account,&nbsp;
            <Link href={"/register"} className='underline hover:text-blue-500 duration-300'>Register</Link>
          </span>

        </div>
      </div>
    </div>
  );
};

export default Login;


// function setUser(mockUser: { id: number; username: string; profileImageURL: string; email: string; password: string; createdAt: Date; updatedAt: Date; }) {
//   throw new Error('Function not implemented.');
// }

function setError(arg0: string) {
  throw new Error(arg0 ||'Function not implemented.');
}

