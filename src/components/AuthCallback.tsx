import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getCookie } from "../utils/cookies"

const AuthCallback = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [hasFetched, setHasFetched] = useState(false) // Estado para evitar la doble llamada

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		const code = params.get("code")

		const token = getCookie("token")
		if (code && !hasFetched) {
			if (!token) {
				console.error("No se encontró el token JWT")
				navigate("/login")
				return
			}

			setHasFetched(true) // Marca que ya se hizo la solicitud para evitar duplicados

			fetch("http://localhost:3000/auth/callback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ code }),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error en la solicitud")
					}
					return response.json()
				})
				.then((data) => {
					navigate("/home")
				})
				.catch((error) => {
					console.error("Error:", error)
					navigate("/login")
				})
		} else if (!code) {
			console.error("No se encontró el código en la URL")
			navigate("/login")
		}
	}, [location, navigate, hasFetched]) // Incluye hasFetched como dependencia

	return <div>Procesando autorización...</div>
}

export default AuthCallback
