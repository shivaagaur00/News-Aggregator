import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginReporter } from "./../../API/ReporterLogin";
function ReporterLogin() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginReporter({ uniqueId: name, password: password });
      if (res.status === 200) {
        navigate(`/Reporter/${name}`);
      } else {
        setError(res.data.message || "An error occurred during login.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid input. Please check your credentials.");
      } else if (err.response && err.response.status === 401) {
        setError("Unauthorized. Incorrect username or password.");
      } else if (err.response && err.response.status === 404) {
        setError("Reporter not found. Please check your username.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Login as Reporter</h2>
        </div>

        <div className="mt-8 space-y-6">
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
                onChange={(e) => setname(e.target.value)}
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
export default ReporterLogin;
