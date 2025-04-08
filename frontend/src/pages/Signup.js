import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // ✅ New state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signup data:", { name, email, password }); // 👈 Add this
    
        try {
            const response = await axios.post("http://localhost:5000/api/signup", {
                name,
                email,
                password,
            });
            if (response.status === 201) {
                setSuccessMessage("Signup successfull")
                navigate("/");
              }
        } catch (err) {
            console.error("Signup error (frontend):", err); // 👈 Add this
            alert("Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
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
                    Sign Up
                </button>

                {/* ✅ Success Message */}
                {successMessage && (
                    <p className="mt-4 text-green-600 text-center font-medium">
                        {successMessage}
                    </p>
                )}

                <div className="text-center mt-4">
                    <p>Already have an account?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline"
                    >
                        Log In
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Signup;
