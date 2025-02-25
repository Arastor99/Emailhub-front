import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import { Mail, Trash2, Star } from "lucide-react"
import ConfirmationModal from "./ConfirmationModal"

interface Email {
	address: string
	type: "gmail" | "outlook" | "other" | "unknown"
	isPrimary: boolean
}

const ProfileData: React.FC = () => {
	const [userName, setUserName] = useState("Álvaro")
	const [linkedEmails, setLinkedEmails] = useState<Email[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalAction, setModalAction] = useState<
		"delete" | "setPrimary" | null
	>(null)
	const [emailToConfirm, setEmailToConfirm] = useState<string | null>(null)

	// Función para obtener los correos vinculados
	const fetchLinkedEmails = async () => {
		const token = Cookies.get("token")
		if (!token) {
			console.log("No token found")
			return
		}

		try {
			const response = await fetch("http://localhost:3000/email", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				setLinkedEmails(data.emails) // Actualiza el estado con los correos obtenidos
			} else {
				console.error("Failed to fetch emails")
			}
		} catch (error) {
			console.error("Error fetching emails:", error)
		}
	}

	// Efecto para cargar los correos al montar el componente
	useEffect(() => {
		fetchLinkedEmails()
	}, [])

	// Función para eliminar un correo
	const handleDeleteEmail = (emailToDelete: string) => {
		setEmailToConfirm(emailToDelete)
		setModalAction("delete")
		setIsModalOpen(true)
	}

	const confirmDeleteEmail = async () => {
		const token = Cookies.get("token")
		if (!token) {
			console.log("No token found")
			return
		}

		try {
			const response = await fetch("http://localhost:3000/email/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ email: emailToConfirm }),
			})

			if (response.ok) {
				// Actualiza el estado local eliminando el correo
				setLinkedEmails((prevEmails) =>
					prevEmails.filter((email) => email.address !== emailToConfirm)
				)
			} else {
				console.error("Failed to delete email")
				alert("Failed to delete email. Please try again.")
			}
		} catch (error) {
			console.error("Error deleting email:", error)
			alert("An error occurred while deleting the email.")
		}
		setIsModalOpen(false)
		setEmailToConfirm(null)
	}

	// Función para establecer un correo como primario
	const handleSetPrimary = (emailToSetPrimary: string) => {
		setEmailToConfirm(emailToSetPrimary)
		setModalAction("setPrimary")
		setIsModalOpen(true)
	}

	const confirmSetPrimary = async () => {
		const token = Cookies.get("token")
		if (!token) {
			console.log("No token found")
			return
		}

		try {
			const response = await fetch("http://localhost:3000/email/set-primary", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ email: emailToConfirm }),
			})

			if (response.ok) {
				// Actualiza el estado local marcando el correo como primario
				setLinkedEmails((prevEmails) =>
					prevEmails.map((email) => ({
						...email,
						isPrimary: email.address === emailToConfirm,
					}))
				)
			} else {
				console.error("Failed to set primary email")
				alert("Failed to set primary email. Please try again.")
			}
		} catch (error) {
			console.error("Error setting primary email:", error)
			alert("An error occurred while setting the primary email.")
		}
		setIsModalOpen(false)
		setEmailToConfirm(null)
	}

	return (
		<div className="max-w-4xl mx-auto p-8">
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-3xl font-bold text-blue-800 mb-8"
			>
				User Profile
			</motion.h1>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="bg-white shadow-lg rounded-lg p-6 mb-8 border-l-4 border-blue-500"
			>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<p className="mt-1 text-xl text-gray-900">{userName}</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Primary Email
					</label>
					<p className="mt-1 text-xl text-blue-600">
						{linkedEmails.find((email) => email.isPrimary)?.address ||
							"No primary email set"}
					</p>
				</div>
			</motion.div>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="text-2xl font-semibold text-blue-800 mb-4"
			>
				Linked Emails
			</motion.h2>
			<div className="space-y-4">
				{linkedEmails.length === 0 ? (
					<p className="text-gray-500">No linked emails found.</p>
				) : (
					linkedEmails.map((email, index) => (
						<motion.div
							key={email.address}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
							className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between border-l-4 border-blue-500"
						>
							<div className="flex items-center">
								<Mail className="w-5 h-5 text-blue-600 mr-3" />
								<div>
									<p className="text-lg font-medium text-gray-900">
										{email.address}
									</p>
									<p className="text-sm text-gray-500">{email.type}</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleSetPrimary(email.address)}
									className={`text-blue-500 hover:text-blue-600 transition-colors duration-300 ${
										email.isPrimary ? "opacity-100" : "opacity-50"
									}`}
									disabled={email.isPrimary}
								>
									<Star
										className={`w-5 h-5 ${
											email.isPrimary ? "fill-current" : ""
										}`}
									/>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleDeleteEmail(email.address)}
									className="text-red-600 hover:text-red-800 transition-colors duration-300"
									disabled={email.isPrimary}
								>
									<Trash2 className="w-5 h-5" />
								</motion.button>
							</div>
						</motion.div>
					))
				)}
			</div>

			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={
					modalAction === "delete" ? confirmDeleteEmail : confirmSetPrimary
				}
				title={modalAction === "delete" ? "Delete Email" : "Set Primary Email"}
				message={
					modalAction === "delete"
						? `Are you sure you want to delete ${emailToConfirm}?`
						: `Are you sure you want to set ${emailToConfirm} as your primary email?`
				}
			/>
		</div>
	)
}

export default ProfileData
