import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",      // default client
    clientId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic frontend validations
    if (!form.email || !form.password) {
      return setError("Email and password are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (form.role === "client" && !form.clientId.trim()) {
      return setError("Client ID is required for client role");
    }

    try {
      setLoading(true);

      await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          email: form.email,
          password: form.password,
          role: form.role,
          clientId: form.role === "client" ? form.clientId : null,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess("User registered successfully");
      // optional: auto redirect to login after 1 sec
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-200 outline-none"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-200 outline-none"
            >
              <option value="client">Client</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Client ID (only when role=client) */}
          {form.role === "client" && (
            <div>
              <label className="block text-sm mb-1">Client ID</label>
              <input
                type="text"
                name="clientId"
                className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-200 outline-none"
                placeholder="e.g. AYUSH01"
                value={form.clientId}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-sm text-blue-600 hover:underline w-full text-center"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
