import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const AuthPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true)

	const toggleForm = () => {
		setIsLogin(!isLogin)
	}

	const handleLogin = () => {
		console.log("User logged in")
	}

	const handleRegister = () => {
		console.log("User registered")
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-white p-4">
			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="bg-white shadow-lg rounded-lg p-8"
				>
					<AnimatePresence mode="wait">
						{isLogin ? (
							<motion.div
								key="login"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.3 }}
							>
								<LoginForm onLogin={handleLogin} />
							</motion.div>
						) : (
							<motion.div
								key="register"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<RegisterForm onRegister={handleRegister} />
							</motion.div>
						)}
					</AnimatePresence>
					<motion.button
						className="mt-6 w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-200 transition-colors duration-300"
						onClick={toggleForm}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{isLogin ? "Create an account" : "Already have an account? Login"}
					</motion.button>
				</motion.div>
			</div>
		</div>
	)
}

export default AuthPage
