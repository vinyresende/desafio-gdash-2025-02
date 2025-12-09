import './App.css'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Dashboard pages
import HomePage from './_pages/(Dashboard)/home/page'
import PokedexPage from './_pages/(Dashboard)/pokedex/page'
import SinglePokemonPage from './_pages/(Dashboard)/pokedex/[id]/page'

// Authentication pages
import LoginPage from './_pages/(Auth)/login/page'
import RegisterPage from './_pages/(Auth)/register/page'

// Layouts
import AuthLayout from './components/layouts/auth'
import DashboardLayout from './components/layouts/dashboard'

// Providers
import AuthProvider from './components/providers/auth/auth-provider'
import ProtectedRoutes from './components/providers/auth/protected-routes'
import PageTitleProvider from './components/providers/page-title/page-title'

function App() {
	return (
		<>
			<PageTitleProvider>
				<AuthProvider>
					<ThemeProvider defaultTheme='dark'>
						<BrowserRouter>
							<Routes>

								{/* Dashboard Routes */}
								<Route path='/' element={
									<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>
								}>
									<Route index element={<HomePage />} />
									<Route path='/pokedex' element={<PokedexPage />} />
									<Route path='/pokedex/:id' element={<SinglePokemonPage />} />
								</Route>

								{/* Authentication Routes */}
								<Route path='/auth' element={
									<ProtectedRoutes allowAuthenticated={false}><AuthLayout /></ProtectedRoutes>
								}>
									<Route index element={<Navigate to="/auth/login" />} />
									<Route path='/auth/login' element={<LoginPage />} />
									<Route path='/auth/register' element={<RegisterPage />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</ThemeProvider>
				</AuthProvider>
			</PageTitleProvider>
		</>
	)
}

export default App
