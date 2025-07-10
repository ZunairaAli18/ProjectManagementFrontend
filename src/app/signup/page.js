'use client';
import { useState } from "react";
import Navbar from "../components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api/api";

export default function SignUpPage(){
    const router=useRouter();
    const [form, setForm]=useState({
        name: '',
        email: '',
        role: '',
        password:'',
        confirmPassword:'',
        age: '',
    gender: '',
    bloodGroup: '',
    });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(form.password!==form.confirmPassword){
            alert("Passwords donot match!");
            setForm((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
    return;
        }
        if (form.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    setForm((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
    return;
  }
        console.log("Form Submitted", form);
        try{
          const result=await createUser(form);
          alert(result.message);
          router.push('/dashboard');
        }catch(error){
          console.error('Error:', error.message);
          alert(error.message);

        }
        
     
    }

    return(
        
        <div className="bg-[#F9F3EF] min-h-screen">
            <Navbar/>
            <div className="flex items-center justify-center">
                <form className="mt-15 bg-[#F6F6F6] p-8 rounded-xl shadow-xl w-[600px] h-[950px]" onSubmit={handleSubmit}>
                    <h2 className="text-7xl text-center font-extrabold mb-6  text-blue-800">Sign Up</h2>
                    <div className="mb-6"> 
                        <label className="block mb-2 font-bold text-2xl">Name</label>
                        <input type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required/>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-2xl">Email</label>
                        <input  type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
                        />
                    </div>
                  <div className="mb-6">
  <label className="block mb-2 font-bold text-2xl">Age</label>
  <input
    type="number"
    name="age"
    value={form.age}
    onChange={handleChange}
    placeholder="Enter age"
    className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>
<div className="mb-6">
  <label className="block mb-2 font-bold text-2xl">Gender</label>
  <select
    name="gender"
    value={form.gender}
    onChange={handleChange}
    className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>

<div className="mb-6">
  <label className="block mb-2 font-bold text-2xl">Blood Group</label>
  <select
    name="bloodGroup"
    value={form.bloodGroup}
    onChange={handleChange}
    className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select blood group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
  </select>
</div>

                    

                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-2xl">Password</label>
                        <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create new Password"
                        className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required/>
                        <input
  type="password"
  name="confirmPassword"
  value={form.confirmPassword}
  onChange={handleChange}
  placeholder="Retype new Password"
  className="w-full bg-blue-100 border border-gray-400 px-4 py-2 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
                    </div >
<button
          type="submit"
          className="mt-3 h-[60px] w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700 transition text-2xl"
        >
          Sign Up
        </button>
        <p className="mt-6 text-center text-lg font-medium text-gray-700">
  Already have an account?{" "}
  <Link href="/login" className="text-blue-600 hover:underline font-semibold">
    Log in
  </Link>
</p>

                </form>
            </div>
        </div>
    );
}