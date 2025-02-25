import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfirmationModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	message: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
}) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="bg-white rounded-lg p-6 max-w-sm mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="text-xl font-bold mb-4">{title}</h2>
						<p className="mb-6">{message}</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={onClose}
								className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={onConfirm}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
							>
								Confirm
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ConfirmationModal
