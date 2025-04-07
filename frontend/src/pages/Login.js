import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/login", { email, password })
            .then((res) => {
                if (res.data === "Login success") {
                    setSuccessMessage("Login successfully ✅");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    setErrorMessage(res.data);
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
                setErrorMessage("Something went wrong");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Log In
                </button>

                {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                )}

                <div className="text-center mt-4">
                    <p>Don’t have an account?</p>
                    <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
