import type React from "react"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { FiMail, FiLock, FiUser } from "react-icons/fi"

interface RegisterFormProps {
	onRegister: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [error, setError] = useState<string>("")

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await fetch("http://localhost:3000/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			})

			if (!response.ok) {
				throw new Error("Registration failed")
			}

			onRegister()
		} catch (err) {
			setError("Registration failed")
		}
	}

	return (
		<form onSubmit={handleRegister} className="space-y-4">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
				Register
			</h2>
			<div className="relative">
				<FiUser className="absolute top-3 left-3 text-gray-400" />
				<input
					id="register-name"
					type="text"
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
					required
					className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
					placeholder="Name"
				/>
			</div>
			<div className="relative">
				<FiMail className="absolute top-3 left-3 text-gray-400" />
				<input
					id="register-email"
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
					id="register-password"
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
				Register
			</motion.button>
			{error && <p className="text-red-500 text-center">{error}</p>}
		</form>
	)
}

export default RegisterForm
