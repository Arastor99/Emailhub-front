import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	ChevronDown,
	Home,
	Settings,
	Bell,
	BarChart2,
	User,
	Plus,
	Mail,
	LogOut,
} from "lucide-react"
import { FaGoogle, FaMicrosoft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface CustomJwtPayload {
	name: string
	email: string
	sub: string
}

const Sidebar: React.FC = () => {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [userName, setUserName] = useState<string | null>(null)
	const navigate = useNavigate()

	const toggleMenu = (menu: string) => {
		setActiveMenu(activeMenu === menu ? null : menu)
	}

	const toggleModal = () => setIsModalOpen(!isModalOpen)

	const handleLogout = () => {
		Cookies.remove("token")
		navigate("/auth")
	}

	const MenuItem: React.FC<{
		icon: React.ElementType
		text: string
		submenu?: string[]
		onClick?: () => void
	}> = ({ icon: Icon, text, submenu, onClick }) => (
		<div>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => {
					if (submenu) {
						toggleMenu(text)
					} else if (onClick) {
						onClick()
					}
				}}
				className={`w-full flex items-center justify-between p-2 rounded-md ${
					activeMenu === text ? "bg-blue-600" : "hover:bg-blue-700"
				} transition-colors duration-300`}
			>
				<div className="flex items-center">
					<Icon className="w-5 h-5 mr-3" />
					<span>{text}</span>
				</div>
				{submenu && (
					<ChevronDown
						className={`w-4 h-4 transition-transform duration-200 ${
							activeMenu === text ? "transform rotate-180" : ""
						}`}
					/>
				)}
			</motion.button>
			{submenu && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{
						height: activeMenu === text ? "auto" : 0,
						opacity: activeMenu === text ? 1 : 0,
					}}
					transition={{ duration: 0.2 }}
					className="overflow-hidden"
				>
					{submenu.map((item, index) => (
						<motion.button
							key={index}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full text-left p-2 pl-10 hover:bg-blue-700 transition-colors duration-200 rounded-md"
						>
							{item}
						</motion.button>
					))}
				</motion.div>
			)}
		</div>
	)

	useEffect(() => {
		const token = Cookies.get("token")
		if (token) {
			const decodedToken = jwtDecode<CustomJwtPayload>(token)
			setUserName(decodedToken.name)
		}
	}, [])

	return (
		<>
			<div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
				<h1 className="text-2xl font-bold mb-4 text-center">EmailHub</h1>
				{userName && (
					<div className="mb-4 p-2 bg-gray-800 rounded-md">
						<User className="w-5 h-5 inline-block mr-2" />
						<span>{userName}</span>
					</div>
				)}
				<nav className="space-y-2 flex-grow pt-5">
					<MenuItem
						icon={Home}
						text="Dashboard"
						onClick={() => {
							navigate("/home")
						}}
					/>
					<MenuItem
						icon={User}
						text="Profile"
						onClick={() => {
							navigate("/profile")
						}}
					/>
					<MenuItem icon={Settings} text="Settings" />
					<MenuItem
						icon={Bell}
						text="Notifications"
						submenu={["Email", "Push", "SMS"]}
					/>
					<MenuItem
						icon={BarChart2}
						text="Analytics"
						submenu={["Overview", "Reports", "Export"]}
					/>
					<MenuItem icon={Plus} text="Añadir email" onClick={toggleModal} />
				</nav>
				<MenuItem icon={LogOut} text="Cerrar sesión" onClick={handleLogout} />
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
						<div className="absolute inset-0 backdrop-blur-lg bg-black/60 "></div>
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
									whileHover={{ scale: 1.05, rotate: 5 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-red-500 text-white rounded-lg text-lg shadow-lg cursor-pointer"
									onClick={() => {
										window.location.href =
											"https://accounts.google.com/o/oauth2/v2/auth?client_id=612229873675-lpd9s4c044ure0q08erjs517tokdl33c.apps.googleusercontent.com&redirect_uri=http://localhost:5173/auth/callback&response_type=code&scope=https://mail.google.com%20openid%20email&access_type=offline&prompt=consent"
									}}
								>
									<FaGoogle className="text-5xl mb-4" />
									<span>Añadir Gmail</span>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05, rotate: -5 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-blue-500 text-white rounded-lg text-lg shadow-lg cursor-pointer"
									onClick={() => {
										window.location.href =
											"https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4df9c37f-487d-4e6a-a307-0b84530bdf1a&response_type=code&redirect_uri=http://localhost:5173/auth/outlook&response_mode=query&scope=openid%20profile%20offline_access%20Mail.Read%20Mail.ReadWrite%20Mail.Send"
									}}
								>
									<FaMicrosoft className="text-5xl mb-4" />
									<span>Añadir Outlook</span>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05, rotate: 5 }}
									whileTap={{ scale: 0.95 }}
									className="flex flex-col items-center justify-center w-40 h-40 bg-gray-500 text-white rounded-lg text-lg shadow-lg col-span-2 cursor-pointer"
								>
									<Mail className="text-5xl mb-4" />
									<span>Añadir otro email</span>
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Sidebar
