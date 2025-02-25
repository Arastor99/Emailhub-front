import type React from "react"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Search, Send, Calendar, Filter, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select } from "../ui/select"

import SendEmailModal from "../ui/SendEmailModal"
import Sidebar from "./SideBar"

interface Email {
	id: string
	subject: string
	bodyPreview: string
	receivedDateTime: string
	sender: {
		emailAddress: {
			name: string
			address: string
		}
	}
}

const HomePage: React.FC = () => {
	const [emails, setEmails] = useState<Email[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [sortBy, setSortBy] = useState<string>("date")
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		const fetchEmails = async () => {
			try {
				const token = Cookies.get("token")
				if (!token) {
					throw new Error("No se encontró el token de autenticación")
				}

				const response = await fetch("http://localhost:3000/email/inbox", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				})

				if (!response.ok) {
					throw new Error("Error al obtener los correos electrónicos")
				}

				const data = await response.json()
				setEmails(data.data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchEmails()
	}, [])

	const filteredEmails = emails
		.filter(
			(email) =>
				email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
				email.sender.emailAddress.address
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			if (sortBy === "date") {
				return (
					new Date(b.receivedDateTime).getTime() -
					new Date(a.receivedDateTime).getTime()
				)
			} else if (sortBy === "sender") {
				return a.sender.emailAddress.name.localeCompare(
					b.sender.emailAddress.name
				)
			}
			return 0
		})

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 p-8 overflow-y-auto">
				<div className="max-w-4xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-bold text-gray-800">
							Bandeja de Entrada
						</h1>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								onClick={() => setIsModalOpen(true)}
								className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 flex items-center cursor-pointer"
							>
								<Send className="mr-2 h-5 w-5" />
								<span>Nuevo correo</span>
							</Button>
						</motion.div>
					</div>

					<div className="flex space-x-4 mb-6">
						<Select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="w-1/3"
						>
							<option value="date">Ordenar por fecha</option>
							<option value="sender">Ordenar por remitente</option>
						</Select>
						<div className="relative w-15/3">
							<Input
								type="text"
								placeholder="Buscar por asunto o remitente..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 w-full"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
						</div>
					</div>

					<AnimatePresence>
						{loading ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="flex justify-center items-center h-64"
							>
								<motion.div
									animate={{
										rotate: 360,
										transition: {
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
										},
									}}
								>
									<Loader2 className="h-12 w-12 text-primary" />
								</motion.div>
							</motion.div>
						) : error ? (
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="text-red-500 text-center"
							>
								{error}
							</motion.p>
						) : filteredEmails.length === 0 ? (
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="text-gray-500 text-center"
							>
								No hay correos electrónicos que coincidan con tu búsqueda.
							</motion.p>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="space-y-4"
							>
								{filteredEmails.map((email, index) => (
									<motion.div
										key={email.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ delay: index * 0.1 }}
										className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
									>
										<div className="flex justify-between items-center">
											<h2 className="text-lg font-semibold text-gray-800">
												{email.subject}
											</h2>
											<div className="flex items-center text-sm text-gray-500">
												<Calendar className="mr-2 h-4 w-4" />
												{new Date(email.receivedDateTime).toLocaleString()}
											</div>
										</div>
										<p className="text-gray-600 mt-2">{email.bodyPreview}</p>
										<div className="flex items-center mt-4 text-sm text-gray-500">
											<Filter className="mr-2 h-4 w-4" />
											<span>
												De: {email.sender.emailAddress.name} (
												{email.sender.emailAddress.address})
											</span>
										</div>
									</motion.div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
			<SendEmailModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	)
}

export default HomePage
