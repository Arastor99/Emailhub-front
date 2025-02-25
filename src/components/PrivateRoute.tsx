// PrivateRoute.tsx
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	useEffect(() => {
		const token = Cookies.get("token")

		if (!token) {
			setIsAuthenticated(false)
			return
		}

		fetch("/api/auth/profile", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					setIsAuthenticated(true)
				} else {
					setIsAuthenticated(false)
				}
			})
			.catch((error) => {
				console.error("Error al verificar token", error)
				setIsAuthenticated(false)
			})
	}, [])

	if (isAuthenticated === null) {
		return <div>Cargando...</div>
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />
}

export default PrivateRoute
