import React from "react"
import { motion } from "framer-motion"
import { Inbox, RefreshCw, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index: React.FC = () => {
	const navigate = useNavigate()
	const redirectAuth = () => {
		navigate("/auth")
	}
	return (
		<div className="min-h-screen bg-white text-gray-800 font-sans">
			{/* Header */}
			<header className="py-6 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-3xl font-bold text-indigo-600">EmailHub</h1>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
							onClick={redirectAuth}
						>
							Sign Up
						</motion.button>
					</motion.div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center"
				>
					<h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
						Unify Your Email Experience
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Manage all your email accounts in one place. Seamlessly switch
						between Gmail, Outlook, and more.
					</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
						onClick={redirectAuth}
					>
						Get Started
					</motion.button>
				</motion.div>

				{/* Features Section */}
				<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
					{[
						{
							icon: Inbox,
							title: "Unified Inbox",
							description:
								"Access all your emails from different providers in one centralized inbox.",
						},
						{
							icon: RefreshCw,
							title: "Seamless Switching",
							description:
								"Effortlessly switch between different email accounts with a single click.",
						},
						{
							icon: Shield,
							title: "Enhanced Security",
							description:
								"Your data is encrypted and protected with state-of-the-art security measures.",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="flex flex-col items-center text-center"
						>
							<feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</motion.div>
					))}
				</div>

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-20 text-center"
				>
					<h2 className="text-3xl font-bold mb-4">
						Ready to Simplify Your Email Management?
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Join thousands of users who have streamlined their email workflow
						with EmailHub.
					</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
						onClick={redirectAuth}
					>
						Start Your Free Trial
					</motion.button>
				</motion.div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-100 py-8 mt-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<p className="text-gray-600">
								&copy; 2023 EmailHub. All rights reserved.
							</p>
						</div>
						<div className="flex space-x-6">
							<a
								href="#"
								className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
							>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Index
