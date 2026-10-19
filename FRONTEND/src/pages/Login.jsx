import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid Username or Password");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">

            <ShieldCheck
              size={34}
              className="text-indigo-600"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="text-center mt-4 mb-6">

          <h1 className="text-4xl font-bold text-indigo-600">
            VerifyQR
          </h1>

          <p className="text-gray-500 mt-2">
            QR Based Certificate Verification
          </p>

          <h2 className="text-2xl font-bold mt-6 text-gray-800">
            Administrator Login
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Sign in to access the VerifyQR Dashboard
          </p>

        </div>

        {/* Error */}

        {error && (

          <div className="bg-red-100 text-red-600 rounded-xl p-3 mb-4 text-center text-sm">

            {error}

          </div>

        )}

        {/* Form */}

        <form onSubmit={handleLogin}>

          {/* Username */}

          <div className="relative mb-4">

            <User
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-xl border py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>

          {/* Password */}

          <div className="relative mb-6">

            <Lock
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl border py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white py-3 rounded-xl text-lg font-semibold"
          >
            {loading
              ? "Signing In..."
              : "Login Securely →"}
          </button>

        </form>

      </div>

    </div>
  );
}