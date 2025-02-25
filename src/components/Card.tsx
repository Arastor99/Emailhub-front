import { motion } from "framer-motion"
import type React from "react"
import type { ReactNode } from "react"

interface CardProps {
	children: ReactNode
	isVisible: boolean
}

const Card: React.FC<CardProps> = ({ children, isVisible }) => {
	return (
		<motion.div
			className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
			transition={{ duration: 0.3 }}
		>
			{children}
		</motion.div>
	)
}

export default Card
