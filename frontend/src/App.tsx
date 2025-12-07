import './App.css'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Dashboard pages
import HomePage from './_pages/(Dashboard)/home/page'

// Authentication pages
import LoginPage from './_pages/(Auth)/login/page'

// Layouts
import AuthLayout from './components/layouts/auth'
import DashboardLayout from './components/layouts/dashboard'
import RegisterPage from './_pages/(Auth)/register/page'

function App() {
	return (
		<>
			<ThemeProvider defaultTheme='dark'>
				<BrowserRouter>
					<Routes>

						{/* Dashboard Routes */}
						<Route path='/' element={<DashboardLayout />}>
							<Route index element={<HomePage />} />
						</Route>

						{/* Authentication Routes */}
						<Route path='/auth' element={<AuthLayout />}>
							<Route index element={<Navigate to="/auth/login" />} />
							<Route path='/auth/login' element={<LoginPage />} />
							<Route path='/auth/register' element={<RegisterPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	)
}

export default App
