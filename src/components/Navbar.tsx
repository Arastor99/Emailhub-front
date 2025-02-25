import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { FaGoogle, FaMicrosoft } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

interface CustomJwtPayload {
	name: string
	email: string
	sub: string
}

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [userName, setUserName] = useState<string | null>(null)
	const navigate = useNavigate()
	const toggleModal = () => setIsModalOpen(!isModalOpen)

	const handleLogout = () => {
		// Eliminar el token de la cookie
		Cookies.remove("token")
		// Redirigir a la página de autenticación
		navigate("/auth")
	}

	useEffect(() => {
		const token = Cookies.get("token")
		if (token) {
			const decodedToken = jwtDecode<CustomJwtPayload>(token)
			setUserName(decodedToken.name)
			console.log(decodedToken)
		}
	}, [])

	return (
		<nav className="p-4 border-b border-gray-300 text-gray-800 pb-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">EmailHub</div>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							{userName || "Usuario"}{" "}
							<ChevronDownIcon
								className="w-5 h-5 -mr-1 text-blue-600 hover:text-violet-800"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>
					<Transition
						as={React.Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-gray-300 text-black" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											onClick={toggleModal}
										>
											Añadir email
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-gray-300 text-black" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
										>
											Perfil
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-gray-300 text-black" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											onClick={handleLogout}
										>
											Cerrar sesión
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 flex items-center justify-center z-50"
						onClick={toggleModal}
					>
						<div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="bg-white p-8 rounded-lg shadow-xl z-10"
							onClick={(e) => e.stopPropagation()}
						>
							<h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
								Añadir Email
							</h2>
							<div className="grid grid-cols-2 gap-6">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-red-500 text-white rounded-lg text-lg cursor-pointer"
									onClick={() => {
										window.location.href =
											"https://accounts.google.com/o/oauth2/v2/auth?client_id=612229873675-lpd9s4c044ure0q08erjs517tokdl33c.apps.googleusercontent.com&redirect_uri=http://localhost:5173/auth/callback&response_type=code&scope=https://mail.google.com%20openid%20email&access_type=offline&prompt=consent"
									}}
								>
									<FaGoogle className="text-5xl mb-4" />
									<span>Añadir Gmail</span>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-blue-500 text-white rounded-lg text-lg"
								>
									<FaMicrosoft className="text-5xl mb-4" />
									<span>Añadir Outlook</span>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-gray-500 text-white rounded-lg text-lg col-span-2"
								>
									<MdEmail className="text-5xl mb-4" />
									<span>Añadir otro email</span>
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
