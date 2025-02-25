"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Paperclip, Bold, Italic, List, Link } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import Cookies from "js-cookie"

interface SendEmailModalProps {
	isOpen: boolean
	onClose: () => void
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({ isOpen, onClose }) => {
	const [to, setTo] = useState("")
	const [subject, setSubject] = useState("")
	const [body, setBody] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const token = Cookies.get("token") // Obtener el token de la cookie
			if (!token) {
				throw new Error("No se encontró el token de autenticación")
			}

			const response = await fetch("http://localhost:3000/email/send", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ to, subject, body }),
			})

			if (!response.ok) {
				throw new Error("Error al enviar el correo")
			}

			const data = await response.json()
			console.log("Correo enviado:", data)
			onClose()
		} catch (error) {
			console.error("Error enviando correo:", error.message)
			setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold">Nuevo Correo</h2>
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700 cursor-pointer"
							>
								<X size={24} />
							</button>
						</div>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<Input
									type="email"
									value={to}
									onChange={(e) => setTo(e.target.value)}
									placeholder="Para:"
									required
									className="w-full"
								/>
							</div>
							<div>
								<Input
									type="text"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									placeholder="Asunto:"
									required
									className="w-full"
								/>
							</div>
							<div className="flex space-x-2 mb-2">
								<Button type="button" variant="outline" size="sm">
									<Bold size={16} />
								</Button>
								<Button type="button" variant="outline" size="sm">
									<Italic size={16} />
								</Button>
								<Button type="button" variant="outline" size="sm">
									<List size={16} />
								</Button>
								<Button type="button" variant="outline" size="sm">
									<Link size={16} />
								</Button>
							</div>
							<textarea
								value={body}
								onChange={(e) => setBody(e.target.value)}
								placeholder="Escribe tu mensaje aquí..."
								required
								className="w-full h-64 px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
							/>
							<div className="flex justify-between items-center">
								<Button type="button" variant="outline">
									<Paperclip size={16} className="mr-2" /> Adjuntar archivo
								</Button>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
									>
										Enviar
									</Button>
								</motion.div>
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default SendEmailModal
