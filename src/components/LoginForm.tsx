"use client"

import React, { useState, FormEvent, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { FiMail, FiLock } from "react-icons/fi"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

interface LoginFormProps {
	onLogin: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [error, setError] = useState<string>("")
	const navigate = useNavigate()
	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})

			if (!response.ok) {
				throw new Error("Invalid credentials")
			}

			const data = await response.json()
			Cookies.set("token", data.access_token, {
				expires: 7,
				secure: true,
				sameSite: "strict",
			})
			onLogin()
			navigate("/home")
		} catch (err) {
			setError("Invalid credentials")
		}
	}

	return (
		<form onSubmit={handleLogin} className="space-y-4">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
				Login
			</h2>
			<div className="relative">
				<FiMail className="absolute top-3 left-3 text-gray-400" />
				<input
					id="login-email"
					type="email"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					required
					className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
					placeholder="Email"
				/>
			</div>
			<div className="relative">
				<FiLock className="absolute top-3 left-3 text-gray-400" />
				<input
					id="login-password"
					type="password"
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					required
					className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
					placeholder="Password"
				/>
			</div>
			<motion.button
				type="submit"
				className="w-full bg-gray-800 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-300"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				Login
			</motion.button>
			{error && <p className="text-red-500 text-center">{error}</p>}
		</form>
	)
}

export default LoginForm
