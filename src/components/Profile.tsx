import ProfileData from "./ProfileData"
import Sidebar from "./SideBar"
import { motion } from "framer-motion"
const Profile = () => {
	return (
		<>
			<div className="flex min-h-screen bg-gray-100">
				<motion.div
					initial={{ x: -250 }}
					animate={{ x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Sidebar />
				</motion.div>
				<main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white">
					<ProfileData />
				</main>
			</div>
		</>
	)
}

export default Profile
