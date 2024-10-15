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
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { setUser } = useUser(); // Using the UserContext
  const [error, setError] = useState<string | null>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login authentication
    console.log(`email:${email} pwd: ${password}`);

    const response = await fetch(`http://localhost:3000/api/users?email=${email}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = await response.json();

    // user will be array of User. check if email is present in user array
    const foundUser = user.result.find((u: any) => u.email === email);

    if (foundUser) {
      // if present, check if password is correct
      if (foundUser.password === password) {
        // if correct, set user in global context and redirect to homepage
        setUser(foundUser);

        if (rememberMe) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);
          localStorage.setItem('user', JSON.stringify({ ...foundUser, expiry: expiryDate }));
        }

        router.push('/');
      } else {
        // if incorrect, show error message
        setError('Invalid email or password');
      }
    } else {
      // if email is not present, show error message
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="md:w-2/6 border-small rounded-lg p-4 flex flex-col gap-4">

        <h2 className='m-4 justify-center flex '>Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <Input label="Email"
          variant="bordered"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value.trim())}
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
            <Checkbox type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}>
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
