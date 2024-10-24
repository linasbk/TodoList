"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import AddTodo from '../components/Todo/Addtodo';


export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) {
    router.push('/signIn');
    return null;
  }
  return (
    <>
      <AddTodo />
    </>
  );
}
