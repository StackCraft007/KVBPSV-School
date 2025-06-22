import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { LanguageProvider } from "../../context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      // Store the access token for dashboard compatibility
      if (data && data.session && data.session.access_token) {
        localStorage.setItem("supabase.auth.token", data.session.access_token);
      }
      navigate("/admin/dashboard");
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center">
          <form onSubmit={handleLogin} className="max-w-sm w-full mx-auto my-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">Admin Login</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-2 p-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          </form>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Login;