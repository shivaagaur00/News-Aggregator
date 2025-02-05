import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../API/AdministratorLogin";
import { useAdminContext } from "../Context/AdminContext";

function AdministratorLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setNews } = useAdminContext();
  const { news } = useAdminContext;
  
  const handleLogin = async () => {
    console.log("Confirmation");
    try {
      const res = await loginAdmin({ name, password });
      if (res.status === 200) {
        const out = res.data.out;
        setNews(out);
        navigate(`/Administrator/${name}`);
      } else {
        setError(res.data.message || "An error occurred during login.");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Invalid input. Please check your credentials.");
      } else if (err.response?.status === 401) {
        setError("Unauthorized. Incorrect username or password.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">
            Welcome back! Please login to your account.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 block mb-2">Username</label>
              <input
                id="name"
                type="text"
                required
                className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300 block mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-105"
          >
            Sign in
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Forgot your password?{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                Reset it here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdministratorLogin;
