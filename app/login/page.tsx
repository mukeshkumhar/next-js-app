"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from 'react'

function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        }).then((result) => {
            if (result?.error) {
                alert("Login failed: " + result.error);
            } else {
                router.push("/home"); // Redirect to home page on success
            }
        })
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
        <h1 className="text-2xl font-bold">Login Page</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 mt-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Login
            </button>
            <div className="text-sm text-gray-500 mt-2">
                Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
            </div>
        </form>
    </div>
  )
}

export default LoginPage