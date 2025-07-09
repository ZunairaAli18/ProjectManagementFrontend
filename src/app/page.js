'use client';
import { useRouter } from "next/navigation";

export default function HomePage(){
  const router=useRouter();
  const handleLogin=()=> router.push('/login');
  const handleSignUp=()=> router.push('/signup');
  return(
    <div>
      <h1 className="text-3xl font-bold">Welcome to HomePage</h1>
      <div className="space-x-4">
        <button onClick={handleLogin} className="bg-blue-600 text-white">Login</button>
        <button onClick={handleSignUp} className="bg-blue-600 text-white">SignUp</button>
      </div>
    </div>
  );
}