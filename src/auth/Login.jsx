// src/auth/Login.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/manage");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center  mt-20">
      <div className="w-full max-w-md p-8 space-y-6 border border-slate-100 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
