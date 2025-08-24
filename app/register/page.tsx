"use client";
import { useRouter } from "next/navigation";
import React from "react";

function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
      })

      const data = await res.json();
      if (!res.ok) {
        // const errorData = await res.json();
        throw new Error(data.error || "Registration failed");
        
      }
      
      alert("Registration successful");
      console.log(data);
      router.push("/home");

    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
      console.error("Error details:", error);
      
    }
  }; 

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Register Page</h1>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4 mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
      <div className="mt-4">
        <p>Already have an account? <a href="/login" className="underline">Login</a></p>
      </div>
    </div>
  );
}

export default RegisterPage;