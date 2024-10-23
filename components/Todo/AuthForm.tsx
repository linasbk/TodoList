"use client";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  // const { login } = useAuth();
  // const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const userData = await fetch('/api/auth/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ username: 'admin', password: 'password' }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => res.json());

  //   if (userData) {
  //     login(userData);
  //     router.push('/');
  //   }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
        <label>
            Username
            <input type="text" name="username" />
        </label>
        <label>
            Password
            <input type="password" name="password" />
        </label>
        <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;