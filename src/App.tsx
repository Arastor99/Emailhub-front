// src/App.tsx
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "./components/AuthPage"
import PrivateRoute from "./components/PrivateRoute"
import HomePage from "./components/HomePage"

import AuthCallback from "./components/AuthCallback"
import Index from "./components/Index"
import Profile from "./components/Profile"
import Outlook from "./components/Outlook"

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/auth" element={<AuthPage />} />
			<Route
				path="/home"
				element={
					<PrivateRoute>
						<HomePage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/auth/callback"
				element={
					<PrivateRoute>
						<AuthCallback />
					</PrivateRoute>
				}
			/>
			<Route
				path="/auth/outlook"
				element={
					<PrivateRoute>
						<Outlook />
					</PrivateRoute>
				}
			/>
			{/* Ruta para redireccionar cualquier URL no definida */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}

export default App
